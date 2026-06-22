const weddingDate = new Date("2026-09-25T19:00:00+02:00");
const params = new URLSearchParams(window.location.search);
const guestName = params.get("guest") || params.get("name") || "";
const guestParty = params.get("party") || "";
const skipIntro = params.get("open") === "1";

document.body.classList.add("motion-ready");

const contacts = {
  yaeel: {
    name: "Yaeel Jadaon",
    phone: "07xxxxxxxx",
  },
  nuha: {
    name: "Nuha Kawas",
    phone: "07xxxxxxxxxx",
  },
};

const translations = {
  sv: {
    openInvitation: "Öppna inbjudan",
    guestLine: "Särskilt inbjuden: {guest}",
    guestLineParty: "Särskilt inbjudna: {guest}",
    partyLine: "Denna inbjudan gäller {party} personer",
    navDetails: "Detaljer",
    navSchedule: "Schema",
    navStory: "Vår berättelse",
    navRsvp: "OSA",
    heroKicker: "Vi gifter oss",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "Fredag 25 september 2026 | Tensta Maria kyrka",
    welcomeEyebrow: "Med kärlek och glädje",
    welcomeTitle: "Välkommen till vår bröllopsdag",
    welcomeBody:
      "Vi vill fira början på vårt liv tillsammans med våra familjer och vänner. Det skulle betyda mycket för oss att ha dig där när vi säger ja, delar middagen, musiken och kvällen.",
    month: "September",
    countdownEyebrow: "Nedräkning",
    days: "Dagar",
    hours: "Timmar",
    minutes: "Minuter",
    seconds: "Sekunder",
    detailsEyebrow: "Dagens detaljer",
    detailsTitle: "Ceremoni och fest",
    ceremonyTitle: "Ceremoni",
    ceremonyBody:
      "Vigseln hålls i Tensta Maria kyrka. Kom gärna i god tid så vi kan börja kvällen lugnt och vackert tillsammans.",
    mapLink: "Öppna karta",
    receptionTitle: "Fest",
    receptionBody:
      "Efter ceremonin fortsätter firandet i kyrkans lokal med mat, musik och minnen vi kommer bära med oss livet ut.",
    scheduleLink: "Se schema",
    photoQuote: "En kväll för tro, familj, kärlek och allt som väntar.",
    scheduleEyebrow: "Fredag 25 september",
    scheduleTitle: "Schema",
    scheduleArrival: "Gäster anländer",
    scheduleCeremony: "Vigsel i Tensta Maria kyrka",
    scheduleReception: "Fest i kyrkans lokal",
    scheduleDinner: "Middag, tal och firande",
    storyEyebrow: "Vår berättelse",
    storyTitle: "En kärlek byggd för livet",
    storyBody:
      "Vår berättelse är fylld av små ögonblick som blev stora: skratt, samtal, böner, familj och en kärlek som växte till ett löfte. Nu går vi in i ett nytt kapitel, tacksamma för allt som varit och för allt Gud lägger framför oss.",
    storyNote: "Här kan vi senare lägga in er personliga text och era egna bilder.",
    journeyEyebrow: "2015 till bröllopsdagen",
    journeyTitle: "Vägen hit",
    journey2015Title: "Första kapitlet",
    journey2015Body:
      "En demo-text för början på er historia. Här byter vi senare till riktig bild och riktig berättelse.",
    journey2020Title: "Ett minne som stannade",
    journey2020Body:
      "En plats, en resa eller en stund som blev viktig. Det här är förberett för er riktiga berättelse.",
    journey2023Title: "När allt blev tydligare",
    journey2023Body:
      "En kort personlig berättelse kan ligga här, med en bild som öppnas större när gästen klickar.",
    journey2026Title: "Bröllopsdagen",
    journey2026Body: "Den 25 september blir berättelsen ett nytt kapitel i Tensta Maria kyrka.",
    rsvpEyebrow: "OSA",
    rsvpTitle: "Svara på inbjudan",
    rsvpBody:
      "Berätta om du kommer eller inte, och hur många personer svaret gäller. Skicka ditt svar direkt till Yaeel eller Nuha.",
    nameLabel: "Namn",
    attendanceLabel: "Kan du komma?",
    attendingYes: "Ja, jag/vi kommer",
    attendingNo: "Nej, jag/vi kan inte komma",
    guestCountLabel: "Antal personer",
    messageLabel: "Meddelande",
    sendYaeel: "Skicka till Yaeel",
    sendNuha: "Skicka till Nuha",
    phoneNote: "OSA-kontakter: Yaeel Jadaon 07xxxxxxxx, Nuha Kawas 07xxxxxxxxxx.",
    blessingEyebrow: "Välsignelser",
    blessingTitle: "Lämna en hälsning",
    blessingBody:
      "Gäster kan skriva en kort hälsning. I denna första version sparas den på enheten; senare kan vi koppla den till en riktig databas.",
    blessingNameLabel: "Namn",
    blessingMessageLabel: "Hälsning",
    blessingSend: "Lägg till hälsning",
    blessingDefaultOne: "Må Gud välsigna ert äktenskap med kärlek, frid och glädje.",
    blessingDefaultTwo: "Vi längtar efter att fira denna dag tillsammans med er.",
    footerText: "25 september 2026 | Tensta Maria kyrka",
    smsIntro: "Hej, detta är mitt OSA till John och Georginas bröllop.",
  },
  en: {
    openInvitation: "Open invitation",
    guestLine: "Especially invited: {guest}",
    guestLineParty: "Especially invited: {guest}",
    partyLine: "This invitation is for {party} people",
    navDetails: "Details",
    navSchedule: "Schedule",
    navStory: "Our story",
    navRsvp: "RSVP",
    heroKicker: "We are getting married",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "Friday, September 25, 2026 | Tensta Maria Church",
    welcomeEyebrow: "With love and joy",
    welcomeTitle: "Welcome to our wedding day",
    welcomeBody:
      "We want to celebrate the beginning of our life together with our families and friends. It would mean so much to have you with us as we say yes, share dinner, music and the evening.",
    month: "September",
    countdownEyebrow: "Countdown",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    detailsEyebrow: "The details",
    detailsTitle: "Ceremony and celebration",
    ceremonyTitle: "Ceremony",
    ceremonyBody:
      "The ceremony will take place at Tensta Maria Church. Please arrive a little early so we can begin the evening calmly and beautifully together.",
    mapLink: "Open map",
    receptionTitle: "Reception",
    receptionBody:
      "After the ceremony, the celebration continues in the church hall with food, music and memories we will carry for life.",
    scheduleLink: "View schedule",
    photoQuote: "An evening for faith, family, love and everything ahead.",
    scheduleEyebrow: "Friday, September 25",
    scheduleTitle: "Schedule",
    scheduleArrival: "Guests arrive",
    scheduleCeremony: "Ceremony at Tensta Maria Church",
    scheduleReception: "Reception in the church hall",
    scheduleDinner: "Dinner, speeches and celebration",
    storyEyebrow: "Our story",
    storyTitle: "A love built for life",
    storyBody:
      "Our story is filled with small moments that became great ones: laughter, conversations, prayers, family and a love that grew into a promise. Now we enter a new chapter, grateful for everything behind us and everything God places before us.",
    storyNote: "We can later add your personal text and your own photos here.",
    journeyEyebrow: "2015 to the wedding day",
    journeyTitle: "The road here",
    journey2015Title: "The first chapter",
    journey2015Body:
      "Demo text for the beginning of your story. Later we replace this with a real photo and real memory.",
    journey2020Title: "A memory that stayed",
    journey2020Body: "A place, a trip or a moment that mattered. This is ready for your real story.",
    journey2023Title: "When everything became clearer",
    journey2023Body: "A short personal story can live here, with a photo guests can open larger.",
    journey2026Title: "The wedding day",
    journey2026Body: "On September 25, the story becomes a new chapter at Tensta Maria Church.",
    rsvpEyebrow: "RSVP",
    rsvpTitle: "Reply to the invitation",
    rsvpBody:
      "Let us know whether you can attend, and how many people your reply includes. Send your answer directly to Yaeel or Nuha.",
    nameLabel: "Name",
    attendanceLabel: "Can you attend?",
    attendingYes: "Yes, I/we will attend",
    attendingNo: "No, I/we cannot attend",
    guestCountLabel: "Number of people",
    messageLabel: "Message",
    sendYaeel: "Send to Yaeel",
    sendNuha: "Send to Nuha",
    phoneNote: "RSVP contacts: Yaeel Jadaon 07xxxxxxxx, Nuha Kawas 07xxxxxxxxxx.",
    blessingEyebrow: "Blessings",
    blessingTitle: "Leave a message",
    blessingBody:
      "Guests can write a short message. In this first version it is saved on the device; later we can connect it to a real database.",
    blessingNameLabel: "Name",
    blessingMessageLabel: "Message",
    blessingSend: "Add message",
    blessingDefaultOne: "May God bless your marriage with love, peace and joy.",
    blessingDefaultTwo: "We cannot wait to celebrate this day with you.",
    footerText: "September 25, 2026 | Tensta Maria Church",
    smsIntro: "Hello, this is my RSVP for John and Georgina's wedding.",
  },
  ar: {
    openInvitation: "افتح الدعوة",
    guestLine: "دعوة خاصة إلى: {guest}",
    guestLineParty: "دعوة خاصة إلى: {guest}",
    partyLine: "هذه الدعوة مخصصة لعدد {party} أشخاص",
    navDetails: "التفاصيل",
    navSchedule: "البرنامج",
    navStory: "قصتنا",
    navRsvp: "تأكيد الحضور",
    heroKicker: "سنتزوج",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "الجمعة 25 سبتمبر 2026 | كنيسة تنستا ماريا",
    welcomeEyebrow: "بمحبة وفرح",
    welcomeTitle: "أهلا بكم في يوم زفافنا",
    welcomeBody:
      "نرغب أن نحتفل ببداية حياتنا معا مع عائلاتنا وأصدقائنا. وجودكم معنا يعني لنا الكثير ونحن نبدأ هذا الفصل الجميل.",
    month: "سبتمبر",
    countdownEyebrow: "العد التنازلي",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوان",
    detailsEyebrow: "تفاصيل اليوم",
    detailsTitle: "المراسم والاحتفال",
    ceremonyTitle: "المراسم",
    ceremonyBody:
      "ستقام المراسم في كنيسة تنستا ماريا. نرجو الحضور مبكرا قليلا لنبدأ الأمسية بهدوء وجمال معا.",
    mapLink: "فتح الخريطة",
    receptionTitle: "الاحتفال",
    receptionBody:
      "بعد المراسم نكمل الاحتفال في قاعة الكنيسة مع الطعام والموسيقى والذكريات الجميلة.",
    scheduleLink: "عرض البرنامج",
    photoQuote: "أمسية للإيمان والعائلة والمحبة وكل ما ينتظرنا.",
    scheduleEyebrow: "الجمعة 25 سبتمبر",
    scheduleTitle: "البرنامج",
    scheduleArrival: "وصول الضيوف",
    scheduleCeremony: "المراسم في كنيسة تنستا ماريا",
    scheduleReception: "الاحتفال في قاعة الكنيسة",
    scheduleDinner: "عشاء وكلمات واحتفال",
    storyEyebrow: "قصتنا",
    storyTitle: "محبة مبنية للحياة",
    storyBody:
      "قصتنا مليئة بلحظات صغيرة أصبحت كبيرة: ضحك، أحاديث، صلوات، عائلة ومحبة كبرت حتى أصبحت وعدا. والآن نبدأ فصلا جديدا بامتنان لكل ما مضى ولكل ما يضعه الله أمامنا.",
    storyNote: "يمكننا لاحقا إضافة نصكم الشخصي وصوركم الخاصة هنا.",
    journeyEyebrow: "من 2015 إلى يوم الزفاف",
    journeyTitle: "الطريق إلى هنا",
    journey2015Title: "الفصل الأول",
    journey2015Body: "نص تجريبي لبداية قصتكم. لاحقا نضع الصورة والقصة الحقيقية.",
    journey2020Title: "ذكرى بقيت معنا",
    journey2020Body: "مكان أو رحلة أو لحظة مهمة. هذا القسم جاهز لقصتكم الحقيقية.",
    journey2023Title: "حين أصبحت الأمور أوضح",
    journey2023Body: "يمكن وضع قصة شخصية قصيرة هنا مع صورة يمكن للضيوف فتحها بحجم أكبر.",
    journey2026Title: "يوم الزفاف",
    journey2026Body: "في 25 سبتمبر تصبح القصة فصلا جديدا في كنيسة تنستا ماريا.",
    rsvpEyebrow: "تأكيد الحضور",
    rsvpTitle: "الرد على الدعوة",
    rsvpBody:
      "أخبرونا إن كنتم ستتمكنون من الحضور، وكم شخصا يشمل الرد. أرسلوا الرد مباشرة إلى يائيل أو نهى.",
    nameLabel: "الاسم",
    attendanceLabel: "هل تستطيع الحضور؟",
    attendingYes: "نعم، سأحضر / سنحضر",
    attendingNo: "لا، لا أستطيع / لا نستطيع الحضور",
    guestCountLabel: "عدد الأشخاص",
    messageLabel: "رسالة",
    sendYaeel: "إرسال إلى يائيل",
    sendNuha: "إرسال إلى نهى",
    phoneNote: "جهات تأكيد الحضور: Yaeel Jadaon 07xxxxxxxx, Nuha Kawas 07xxxxxxxxxx.",
    blessingEyebrow: "بركات",
    blessingTitle: "اتركوا رسالة",
    blessingBody:
      "يمكن للضيوف كتابة رسالة قصيرة. في هذه النسخة الأولى تحفظ على الجهاز، ولاحقا يمكن ربطها بقاعدة بيانات حقيقية.",
    blessingNameLabel: "الاسم",
    blessingMessageLabel: "الرسالة",
    blessingSend: "إضافة الرسالة",
    blessingDefaultOne: "ليبارك الله زواجكما بالمحبة والسلام والفرح.",
    blessingDefaultTwo: "ننتظر أن نحتفل بهذا اليوم الجميل معكما.",
    footerText: "25 سبتمبر 2026 | كنيسة تنستا ماريا",
    smsIntro: "مرحبا، هذا تأكيد حضوري لزفاف John و Georgina.",
  },
};

let activeLang = "sv";

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function updateCountdown() {
  const now = new Date();
  const distance = Math.max(0, weddingDate - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.querySelector('[data-time="days"]').textContent = String(days).padStart(3, "0");
  document.querySelector('[data-time="hours"]').textContent = String(hours).padStart(2, "0");
  document.querySelector('[data-time="minutes"]').textContent = String(minutes).padStart(2, "0");
  document.querySelector('[data-time="seconds"]').textContent = String(seconds).padStart(2, "0");
}

function getGuestLine() {
  if (!guestName) {
    return "";
  }

  const copy = translations[activeLang];
  const template = guestParty ? copy.guestLineParty : copy.guestLine;
  return template.replace("{guest}", guestName).replace("{party}", guestParty);
}

function getPartyLine() {
  if (!guestParty) {
    return "";
  }

  return translations[activeLang].partyLine.replace("{party}", guestParty);
}

function applyGuestPersonalization() {
  const line = getGuestLine();
  const partyLine = getPartyLine();
  document.querySelectorAll("[data-guest-line]").forEach((element) => {
    element.textContent = line;
  });
  document.querySelectorAll("[data-party-line]").forEach((element) => {
    element.textContent = partyLine;
  });

  const nameInput = document.querySelector('#rsvpForm input[name="name"]');
  const countInput = document.querySelector('#rsvpForm input[name="guests"]');

  if (guestName && !nameInput.value) {
    nameInput.value = guestName;
  }

  if (guestParty && !Number.isNaN(Number(guestParty))) {
    countInput.value = guestParty;
  }
}

function applyLanguage(lang) {
  activeLang = lang;
  const copy = translations[lang];
  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) {
      element.textContent = copy[key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === lang);
  });

  applyGuestPersonalization();
  renderBlessings();
}

document.querySelectorAll(".lang-btn").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

function createRsvpMessage(contactKey) {
  const form = document.querySelector("#rsvpForm");
  const formData = new FormData(form);
  const copy = translations[activeLang];
  const name = formData.get("name") || "";
  const attendance = formData.get("attendance") || "";
  const guests = formData.get("guests") || "";
  const message = formData.get("message") || "";
  const contact = contacts[contactKey];

  return {
    phone: contact.phone,
    body: [
      copy.smsIntro,
      `Namn/Name: ${name}`,
      `Svar/Reply: ${attendance}`,
      `Antal/Guests: ${guests}`,
      message ? `Meddelande/Message: ${message}` : "",
      guestName ? `Invite link guest: ${guestName}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

document.querySelectorAll("[data-recipient]").forEach((button) => {
  button.addEventListener("click", () => {
    const form = document.querySelector("#rsvpForm");
    if (!form.reportValidity()) {
      return;
    }

    const { phone, body } = createRsvpMessage(button.dataset.recipient);
    window.location.href = `sms:${phone}?&body=${encodeURIComponent(body)}`;
  });
});

let audioContext;
let musicTimer;
let isPlaying = false;
let musicStep = 0;

function playTone(frequency, start, duration, volume) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.04);
}

function playCanonInspiredPhrase() {
  const bass = [196, 147, 165, 124, 131, 98, 131, 147];
  const melody = [392, 370, 330, 294, 330, 370, 392, 294, 330, 247, 262, 294, 330, 370, 330, 294];
  const now = audioContext.currentTime;
  const bassNote = bass[musicStep % bass.length];

  playTone(bassNote, now, 1.8, 0.035);
  for (let i = 0; i < 4; i += 1) {
    const note = melody[(musicStep * 4 + i) % melody.length];
    playTone(note, now + i * 0.42, 0.72, 0.026);
    playTone(note * 1.5, now + i * 0.42 + 0.05, 0.54, 0.012);
  }

  musicStep += 1;
}

function playSoftMusic() {
  audioContext = audioContext || new AudioContext();
  playCanonInspiredPhrase();
  musicTimer = setInterval(playCanonInspiredPhrase, 1680);
}

function stopSoftMusic() {
  clearInterval(musicTimer);
  musicTimer = null;
}

async function toggleMusic(forcePlay = false) {
  const button = document.querySelector("#musicToggle");

  if (!isPlaying || forcePlay) {
    if (!isPlaying) {
      playSoftMusic();
    }
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
    isPlaying = true;
    button.classList.add("is-playing");
    button.setAttribute("aria-label", "Stoppa musik");
  } else {
    stopSoftMusic();
    isPlaying = false;
    button.classList.remove("is-playing");
    button.setAttribute("aria-label", "Spela musik");
  }
}

document.querySelector("#musicToggle").addEventListener("click", () => toggleMusic());

document.querySelector("#openInvitation").addEventListener("click", async () => {
  const gate = document.querySelector("#invitationGate");
  gate.classList.add("is-opening");
  launchCelebrationRain();
  await toggleMusic(true);
  window.setTimeout(() => {
    gate.classList.add("is-open");
  }, 720);
});

if (skipIntro) {
  document.querySelector("#invitationGate").classList.add("is-open");
}

function launchCelebrationRain() {
  const container = document.querySelector("#celebrationRain");
  const pieces = ["♡", "♥", "✦", "✧", "❊"];
  const colors = ["#fffdf8", "#f6dfe1", "#c8a45d", "#b56d76"];

  container.innerHTML = "";

  for (let i = 0; i < 46; i += 1) {
    const piece = document.createElement("span");
    piece.textContent = pieces[i % pieces.length];
    piece.style.setProperty("--fall-left", `${Math.random() * 100}%`);
    piece.style.setProperty("--fall-drift", `${Math.random() * 160 - 80}px`);
    piece.style.setProperty("--fall-rotate", `${Math.random() * 520 - 260}deg`);
    piece.style.setProperty("--fall-duration", `${2.6 + Math.random() * 1.8}s`);
    piece.style.setProperty("--fall-delay", `${Math.random() * 0.5}s`);
    piece.style.setProperty("--fall-size", `${12 + Math.random() * 16}px`);
    piece.style.setProperty("--fall-color", colors[i % colors.length]);
    container.appendChild(piece);
  }

  window.setTimeout(() => {
    container.innerHTML = "";
  }, 5200);
}

function setScrollProgress(element, property, axis = "vertical") {
  if (!element) {
    return;
  }

  const rect = element.getBoundingClientRect();
  const viewport = window.innerHeight;
  const total = rect.height + viewport * 0.65;
  const progressed = viewport * 0.72 - rect.top;
  const percent = Math.min(100, Math.max(0, (progressed / total) * 100));

  element.style.setProperty(property, `${percent}%`);

  if (axis === "horizontal") {
    element.style.setProperty(property, `${Math.min(88, percent)}%`);
  }
}

function updateScrollAnimations() {
  setScrollProgress(document.querySelector("#dayTimeline"), "--timeline-progress");
  setScrollProgress(document.querySelector("#journeyTrack"), "--journey-progress", window.innerWidth > 1100 ? "horizontal" : "vertical");
}

window.addEventListener("scroll", updateScrollAnimations, { passive: true });
window.addEventListener("resize", updateScrollAnimations);

const blessingStorageKey = "john-georgina-blessings";

function getSavedBlessings() {
  try {
    return JSON.parse(localStorage.getItem(blessingStorageKey)) || [];
  } catch {
    return [];
  }
}

function getDefaultBlessings() {
  const copy = translations[activeLang];
  return [
    { name: "Familjen", message: copy.blessingDefaultOne },
    { name: "Vänner", message: copy.blessingDefaultTwo },
  ];
}

function renderBlessings() {
  const wall = document.querySelector("#blessingWall");
  if (!wall) {
    return;
  }

  const blessings = [...getDefaultBlessings(), ...getSavedBlessings()].slice(-6).reverse();
  wall.innerHTML = blessings
    .map(
      (blessing) => `
        <article class="blessing-card">
          <p>${escapeHtml(blessing.message)}</p>
          <span>${escapeHtml(blessing.name)}</span>
        </article>
      `
    )
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.querySelector("#blessingForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const blessings = getSavedBlessings();

  blessings.push({
    name: formData.get("name"),
    message: formData.get("message"),
  });

  localStorage.setItem(blessingStorageKey, JSON.stringify(blessings.slice(-20)));
  form.reset();
  renderBlessings();
});

const momentModal = document.createElement("div");
momentModal.className = "moment-modal";
momentModal.innerHTML = `
  <div class="moment-dialog" role="dialog" aria-modal="true" aria-labelledby="momentTitle">
    <button class="moment-close" type="button" aria-label="Stäng">×</button>
    <div class="moment-modal-photo" aria-hidden="true"></div>
    <div class="moment-modal-copy">
      <time id="momentYear"></time>
      <h3 id="momentTitle"></h3>
      <p id="momentBody"></p>
    </div>
  </div>
`;
document.body.appendChild(momentModal);

function openMoment(moment) {
  momentModal.querySelector("#momentYear").textContent = moment.querySelector("time").textContent;
  momentModal.querySelector("#momentTitle").textContent = moment.querySelector("h3").textContent;
  momentModal.querySelector("#momentBody").textContent = moment.querySelector("p").textContent;
  momentModal.classList.add("is-open");
  momentModal.querySelector(".moment-close").focus();
}

function closeMoment() {
  momentModal.classList.remove("is-open");
}

document.querySelectorAll(".journey-moment").forEach((moment) => {
  moment.setAttribute("tabindex", "0");
  moment.setAttribute("role", "button");
  moment.addEventListener("click", () => openMoment(moment));
  moment.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openMoment(moment);
    }
  });
});

momentModal.querySelector(".moment-close").addEventListener("click", closeMoment);
momentModal.addEventListener("click", (event) => {
  if (event.target === momentModal) {
    closeMoment();
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMoment();
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
applyLanguage("sv");
updateScrollAnimations();
