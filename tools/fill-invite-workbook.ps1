param(
  [string]$InputPath = "wedding_invitation_guest_sheet_350.xlsx",
  [string]$OutputPath = "wedding_invitation_guest_sheet_350_filled.xlsx"
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.Security

$mainNs = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
$relsNs = "http://schemas.openxmlformats.org/package/2006/relationships"
$officeRelNs = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
$alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
$codePattern = "^[A-HJ-NP-Z2-9]{6}$"

function Resolve-ProjectPath([string]$Path) {
  if ([System.IO.Path]::IsPathRooted($Path)) {
    return $Path
  }
  return Join-Path (Get-Location) $Path
}

function Get-ColumnIndex([string]$CellRef) {
  $letters = ($CellRef -replace "\d", "").ToUpperInvariant()
  $index = 0
  foreach ($char in $letters.ToCharArray()) {
    $index = ($index * 26) + ([int][char]$char - [int][char]"A" + 1)
  }
  return $index
}

function Get-ChildByName($Node, [string]$LocalName) {
  foreach ($child in $Node.ChildNodes) {
    if ($child.LocalName -eq $LocalName -and $child.NamespaceURI -eq $mainNs) {
      return $child
    }
  }
  return $null
}

function Get-Cell($Row, [string]$Ref) {
  foreach ($cell in $Row.ChildNodes) {
    if ($cell.LocalName -eq "c" -and $cell.GetAttribute("r") -eq $Ref) {
      return $cell
    }
  }
  return $null
}

function New-Cell($Row, [string]$Ref, [string]$Style) {
  $doc = $Row.OwnerDocument
  $cell = $doc.CreateElement("x", "c", $mainNs)
  $cell.SetAttribute("r", $Ref)
  if ($Style) {
    $cell.SetAttribute("s", $Style)
  }

  $newIndex = Get-ColumnIndex $Ref
  foreach ($existing in $Row.ChildNodes) {
    if ($existing.LocalName -ne "c") {
      continue
    }
    if ((Get-ColumnIndex $existing.GetAttribute("r")) -gt $newIndex) {
      [void]$Row.InsertBefore($cell, $existing)
      return $cell
    }
  }

  [void]$Row.AppendChild($cell)
  return $cell
}

function Get-OrCreateCell($Row, [string]$Ref, [string]$StyleSourceRef) {
  $cell = Get-Cell $Row $Ref
  if ($cell) {
    return $cell
  }

  $styleSource = Get-Cell $Row $StyleSourceRef
  $style = if ($styleSource) { $styleSource.GetAttribute("s") } else { "" }
  return New-Cell $Row $Ref $style
}

function Get-CellText($Cell, $SharedStrings) {
  if (-not $Cell) {
    return ""
  }

  $valueNode = Get-ChildByName $Cell "v"
  $inlineNode = Get-ChildByName $Cell "is"
  $type = $Cell.GetAttribute("t")

  if ($type -eq "s" -and $valueNode) {
    $index = 0
    if ([int]::TryParse($valueNode.InnerText, [ref]$index) -and $index -lt $SharedStrings.Count) {
      return [string]$SharedStrings[$index]
    }
  }

  if ($type -eq "inlineStr" -and $inlineNode) {
    return [string]$inlineNode.InnerText
  }

  if ($valueNode) {
    return [string]$valueNode.InnerText
  }

  return ""
}

function Set-CellText($Cell, [string]$Text) {
  while ($Cell.HasChildNodes) {
    [void]$Cell.RemoveChild($Cell.FirstChild)
  }

  $Cell.SetAttribute("t", "str")
  $valueNode = $Cell.OwnerDocument.CreateElement("x", "v", $mainNs)
  $valueNode.InnerText = $Text
  [void]$Cell.AppendChild($valueNode)
}

function New-InviteCode($UsedCodes) {
  do {
    $chars = for ($i = 0; $i -lt 6; $i++) {
      $alphabet[[System.Security.Cryptography.RandomNumberGenerator]::GetInt32($alphabet.Length)]
    }
    $code = -join $chars
  } while ($UsedCodes.ContainsKey($code))

  return $code
}

function Get-SharedStrings([string]$WorkbookRoot) {
  $path = Join-Path $WorkbookRoot "xl\sharedStrings.xml"
  if (-not (Test-Path -LiteralPath $path)) {
    return @()
  }

  [xml]$sharedXml = Get-Content -LiteralPath $path -Raw
  $strings = New-Object System.Collections.Generic.List[string]
  foreach ($si in $sharedXml.GetElementsByTagName("si", $mainNs)) {
    $strings.Add([string]$si.InnerText)
  }
  return $strings
}

function Enable-FullRecalc($WorkbookXml) {
  $existing = $null
  foreach ($node in $WorkbookXml.DocumentElement.ChildNodes) {
    if ($node.LocalName -eq "calcPr" -and $node.NamespaceURI -eq $mainNs) {
      $existing = $node
      break
    }
  }

  if (-not $existing) {
    $existing = $WorkbookXml.CreateElement("x", "calcPr", $mainNs)
    [void]$WorkbookXml.DocumentElement.AppendChild($existing)
  }

  $existing.SetAttribute("calcId", "0")
  $existing.SetAttribute("fullCalcOnLoad", "1")
  $existing.SetAttribute("forceFullCalc", "1")
}

$InputPath = Resolve-ProjectPath $InputPath
$OutputPath = Resolve-ProjectPath $OutputPath

if (-not (Test-Path -LiteralPath $InputPath)) {
  throw "Input workbook not found: $InputPath"
}

$tempRoot = Join-Path $env:TEMP ("invite-fill-" + [guid]::NewGuid())
$extractRoot = Join-Path $tempRoot "xlsx"
$copyPath = Join-Path $tempRoot "source-copy.xlsx"

New-Item -ItemType Directory -Path $tempRoot | Out-Null

try {
  Copy-Item -LiteralPath $InputPath -Destination $copyPath -Force
  [System.IO.Compression.ZipFile]::ExtractToDirectory($copyPath, $extractRoot)

  [xml]$workbookXml = Get-Content -LiteralPath (Join-Path $extractRoot "xl\workbook.xml") -Raw
  [xml]$relsXml = Get-Content -LiteralPath (Join-Path $extractRoot "xl\_rels\workbook.xml.rels") -Raw

  $guestSheet = $null
  foreach ($sheet in $workbookXml.GetElementsByTagName("sheet", $mainNs)) {
    if ($sheet.GetAttribute("name") -eq "Guest List") {
      $guestSheet = $sheet
      break
    }
  }
  if (-not $guestSheet) {
    throw 'Sheet named "Guest List" was not found.'
  }

  $relationshipId = $guestSheet.GetAttribute("id", $officeRelNs)
  $relationship = $null
  foreach ($rel in $relsXml.GetElementsByTagName("Relationship", $relsNs)) {
    if ($rel.GetAttribute("Id") -eq $relationshipId) {
      $relationship = $rel
      break
    }
  }
  if (-not $relationship) {
    throw "Worksheet relationship not found for Guest List."
  }

  $target = $relationship.GetAttribute("Target").TrimStart("/")
  if (-not $target.StartsWith("xl/")) {
    $target = "xl/$target"
  }

  $sheetPath = Join-Path $extractRoot ($target -replace "/", "\")
  [xml]$sheetXml = Get-Content -LiteralPath $sheetPath -Raw
  $sharedStrings = Get-SharedStrings $extractRoot

  $rowsByNumber = @{}
  foreach ($row in $sheetXml.GetElementsByTagName("row", $mainNs)) {
    $rowsByNumber[[int]$row.GetAttribute("r")] = $row
  }

  $guestRows = New-Object System.Collections.Generic.List[int]
  $usedCodes = @{}
  $existingCodeRows = @{}
  $generatedRows = New-Object System.Collections.Generic.List[int]
  $missingPhoneRows = New-Object System.Collections.Generic.List[int]
  $missingGuestCountRows = New-Object System.Collections.Generic.List[int]
  $invalidExistingCodeRows = New-Object System.Collections.Generic.List[string]

  foreach ($rowNumber in 4..353) {
    if (-not $rowsByNumber.ContainsKey($rowNumber)) {
      continue
    }

    $row = $rowsByNumber[$rowNumber]
    $name = (Get-CellText (Get-Cell $row "B$rowNumber") $sharedStrings).Trim()
    if (-not $name) {
      continue
    }

    $guestRows.Add($rowNumber)

    $phone = (Get-CellText (Get-Cell $row "C$rowNumber") $sharedStrings).Trim()
    $guestCount = (Get-CellText (Get-Cell $row "E$rowNumber") $sharedStrings).Trim()
    if (-not $phone) {
      $missingPhoneRows.Add($rowNumber)
    }
    if (-not $guestCount) {
      $missingGuestCountRows.Add($rowNumber)
    }

    $languageCell = Get-OrCreateCell $row "F$rowNumber" "F$rowNumber"
    if (-not (Get-CellText $languageCell $sharedStrings).Trim()) {
      Set-CellText $languageCell "sv"
    }

    $channelCell = Get-OrCreateCell $row "K$rowNumber" "K$rowNumber"
    if (-not (Get-CellText $channelCell $sharedStrings).Trim()) {
      Set-CellText $channelCell "WhatsApp"
    }

    $statusCell = Get-OrCreateCell $row "L$rowNumber" "L$rowNumber"
    if (-not (Get-CellText $statusCell $sharedStrings).Trim()) {
      Set-CellText $statusCell "Not sent"
    }

    $code = (Get-CellText (Get-Cell $row "G$rowNumber") $sharedStrings).Trim().ToUpperInvariant()
    if (-not $code) {
      continue
    }

    if ($code -notmatch $codePattern) {
      $invalidExistingCodeRows.Add("row ${rowNumber}: $code")
    }

    if (-not $existingCodeRows.ContainsKey($code)) {
      $existingCodeRows[$code] = New-Object System.Collections.Generic.List[int]
    }
    $existingCodeRows[$code].Add($rowNumber)
    $usedCodes[$code] = $true
  }

  $duplicateExistingCodes = @()
  foreach ($entry in $existingCodeRows.GetEnumerator()) {
    if ($entry.Value.Count -gt 1) {
      $duplicateExistingCodes += "$($entry.Key): rows $($entry.Value -join ', ')"
    }
  }

  if ($invalidExistingCodeRows.Count -gt 0) {
    throw "Existing invite codes with invalid format were found. No file was saved. $($invalidExistingCodeRows -join '; ')"
  }

  if ($duplicateExistingCodes.Count -gt 0) {
    throw "Duplicate existing invite codes were found. No file was saved because existing codes are never overwritten. $($duplicateExistingCodes -join '; ')"
  }

  foreach ($rowNumber in $guestRows) {
    $row = $rowsByNumber[$rowNumber]
    $codeCell = Get-OrCreateCell $row "G$rowNumber" "G$rowNumber"
    $existingCode = (Get-CellText $codeCell $sharedStrings).Trim()
    if ($existingCode) {
      continue
    }

    $newCode = New-InviteCode $usedCodes
    Set-CellText $codeCell $newCode
    $usedCodes[$newCode] = $true
    $generatedRows.Add($rowNumber)
  }

  $finalCodes = @{}
  $finalDuplicates = @()
  foreach ($rowNumber in $guestRows) {
    $row = $rowsByNumber[$rowNumber]
    $code = (Get-CellText (Get-Cell $row "G$rowNumber") $sharedStrings).Trim().ToUpperInvariant()
    if (-not $code) {
      continue
    }
    if ($finalCodes.ContainsKey($code)) {
      $finalDuplicates += "${code}: rows $($finalCodes[$code]), $rowNumber"
    } else {
      $finalCodes[$code] = $rowNumber
    }
  }

  if ($finalDuplicates.Count -gt 0) {
    throw "Duplicate invite codes remain after generation. No file was saved. $($finalDuplicates -join '; ')"
  }

  Enable-FullRecalc $workbookXml
  $sheetXml.Save($sheetPath)
  $workbookXml.Save((Join-Path $extractRoot "xl\workbook.xml"))

  if (Test-Path -LiteralPath $OutputPath) {
    Remove-Item -LiteralPath $OutputPath -Force
  }
  [System.IO.Compression.ZipFile]::CreateFromDirectory($extractRoot, $OutputPath)

  [pscustomobject]@{
    GuestFamilyRowsFound = $guestRows.Count
    NewCodesGenerated = $generatedRows.Count
    ExistingCodesPreserved = $guestRows.Count - $generatedRows.Count
    RowsMissingPhoneNumber = $missingPhoneRows.Count
    RowsMissingGuestCount = $missingGuestCountRows.Count
    DuplicateInviteCodes = 0
    OutputPath = $OutputPath
  } | ConvertTo-Json
}
finally {
  if (Test-Path -LiteralPath $tempRoot) {
    Remove-Item -LiteralPath $tempRoot -Recurse -Force
  }
}
