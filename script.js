const weddingDate = new Date("2026-09-25T19:00:00+02:00");
const params = new URLSearchParams(window.location.search);
let guestName = params.get("guest") || params.get("name") || "";
let guestParty = params.get("party") || "";
const inviteToken = params.get("invite") || "";
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
    gateKicker: "John & Georgina",
    gateTitle: "Vi gifter oss",
    openInvitation: "Öppna inbjudan",
    guestLine: "Särskilt inbjuden: {guest}",
    guestLineParty: "Särskilt inbjudna: {guest}",
    partyLine: "Denna inbjudan gäller {party} personer",
    navDetails: "Detaljer",
    navTravel: "Resa",
    navSchedule: "Schema",
    navGallery: "Galleri",
    navRsvp: "OSA",
    stickyRsvp: "OSA",
    heroKicker: "Bröllopsinbjudan",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "Fredag 25 september 2026 | Tensta Maria kyrka",
    heroCta: "Svara på inbjudan",
    essentialDateLabel: "Datum",
    essentialDateValue: "Fredag 25 september 2026",
    essentialTimeLabel: "Tid",
    essentialTimeValue: "18:30 | 19:00",
    essentialPlaceLabel: "Plats",
    essentialPlaceValue: "Tensta Maria kyrka",
    essentialReplyLabel: "Svar",
    essentialReplyValue: "Yaeel / Nuha",
    welcomeEyebrow: "Med kärlek och glädje",
    welcomeTitle: "Välkommen till vår bröllopsdag",
    welcomeBody:
      "Vi vill fira början på vårt liv tillsammans med våra familjer och vänner. Det betyder mycket för oss att ha dig där när vi säger ja och delar kvällen i tro, värme och glädje.",
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
    travelEyebrow: "Resa och ankomst",
    travelTitle: "Hitta till kyrkan",
    travelBody:
      "Tensta Maria kyrka ligger på Krällingegränd 1, 163 62 Spånga. Planera gärna resan så att du är på plats i god tid före vigseln.",
    parkingLabel: "Parkering",
    parkingTitle: "Kom i god tid",
    parkingBody:
      "Parkering finns i området runt kyrkan. Räkna med extra tid för att hitta plats och gå in lugnt.",
    transitLabel: "Kollektivtrafik",
    transitTitle: "Buss och tunnelbana",
    transitBody:
      "Närmaste busshållplats är Krällingegränd. Tensta centrum och Tensta T-bana ligger inom promenadavstånd.",
    arrivalLabel: "Ankomst",
    arrivalTitle: "18:30 ankomst",
    arrivalBody: "Gäster är välkomna från 18:30. Vigseln börjar 19:00.",
    openMap: "Öppna karta",
    addCalendar: "Lägg till i kalender",
    scheduleEyebrow: "Fredag 25 september",
    scheduleTitle: "Kvällens schema",
    scheduleArrival: "Gäster anländer",
    scheduleCeremony: "Vigsel i Tensta Maria kyrka",
    scheduleReception: "Fest i kyrkans lokal",
    scheduleDinner: "Middag, tal och firande",
    storyEyebrow: "Vår berättelse",
    storyTitle: "Från ett ja i hjärtat till ett ja inför Gud",
    storyBody:
      "Vår berättelse är fylld av små ögonblick som blev stora: skratt, samtal, bön, familj och en kärlek som växte till ett löfte. Nu går vi in i ett nytt kapitel, tacksamma för allt som varit och för allt Gud lägger framför oss.",
    galleryEyebrow: "Bilder och video",
    galleryTitle: "Några ögonblick från vägen hit",
    playVideo: "Spela video",
    uploadPhotosBody: "Efter bröllopet kan du dela dina bilder med oss här.",
    uploadPhotos: "Ladda upp bilder",
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
    blessingBody: "Gäster kan skriva en kort hälsning. I denna version sparas den på enheten.",
    blessingNameLabel: "Namn",
    blessingMessageLabel: "Hälsning",
    blessingSend: "Lägg till hälsning",
    blessingDefaultOne: "Må Gud välsigna ert äktenskap med kärlek, frid och glädje.",
    blessingDefaultTwo: "Vi längtar efter att fira denna dag tillsammans med er.",
    footerText: "25 september 2026 | Tensta Maria kyrka",
    smsIntro: "Hej, detta är mitt OSA till John och Georginas bröllop.",
  },
  en: {
    gateKicker: "John & Georgina",
    gateTitle: "We are getting married",
    openInvitation: "Open invitation",
    guestLine: "Especially invited: {guest}",
    guestLineParty: "Especially invited: {guest}",
    partyLine: "This invitation is for {party} people",
    navDetails: "Details",
    navTravel: "Travel",
    navSchedule: "Schedule",
    navGallery: "Gallery",
    navRsvp: "RSVP",
    stickyRsvp: "RSVP",
    heroKicker: "Wedding invitation",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "Friday, September 25, 2026 | Tensta Maria Church",
    heroCta: "Reply to the invitation",
    essentialDateLabel: "Date",
    essentialDateValue: "Friday, September 25, 2026",
    essentialTimeLabel: "Time",
    essentialTimeValue: "18:30 | 19:00",
    essentialPlaceLabel: "Place",
    essentialPlaceValue: "Tensta Maria Church",
    essentialReplyLabel: "Reply",
    essentialReplyValue: "Yaeel / Nuha",
    welcomeEyebrow: "With love and joy",
    welcomeTitle: "Welcome to our wedding day",
    welcomeBody:
      "We want to celebrate the beginning of our life together with our families and friends. It means so much to have you with us as we say yes and share the evening in faith, warmth and joy.",
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
    travelEyebrow: "Travel and arrival",
    travelTitle: "Find the church",
    travelBody:
      "Tensta Maria Church is at Krällingegränd 1, 163 62 Spånga. Please plan your journey so you arrive calmly before the ceremony.",
    parkingLabel: "Parking",
    parkingTitle: "Arrive early",
    parkingBody:
      "Parking is available in the area around the church. Allow extra time to find a place and enter calmly.",
    transitLabel: "Public transport",
    transitTitle: "Bus and metro",
    transitBody:
      "The closest bus stop is Krällingegränd. Tensta centrum and Tensta metro station are within walking distance.",
    arrivalLabel: "Arrival",
    arrivalTitle: "18:30 arrival",
    arrivalBody: "Guests are welcome from 18:30. The ceremony begins at 19:00.",
    openMap: "Open map",
    addCalendar: "Add to calendar",
    scheduleEyebrow: "Friday, September 25",
    scheduleTitle: "Evening schedule",
    scheduleArrival: "Guests arrive",
    scheduleCeremony: "Ceremony at Tensta Maria Church",
    scheduleReception: "Reception in the church hall",
    scheduleDinner: "Dinner, speeches and celebration",
    storyEyebrow: "Our story",
    storyTitle: "From yes in the heart to yes before God",
    storyBody:
      "Our story is filled with small moments that became great ones: laughter, conversations, prayer, family and a love that grew into a promise. Now we enter a new chapter, grateful for everything behind us and everything God places before us.",
    galleryEyebrow: "Photos and video",
    galleryTitle: "A few moments from the road here",
    playVideo: "Play video",
    uploadPhotosBody: "After the wedding, you can share your photos with us here.",
    uploadPhotos: "Upload photos",
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
    blessingBody: "Guests can write a short message. In this version it is saved on the device.",
    blessingNameLabel: "Name",
    blessingMessageLabel: "Message",
    blessingSend: "Add message",
    blessingDefaultOne: "May God bless your marriage with love, peace and joy.",
    blessingDefaultTwo: "We cannot wait to celebrate this day with you.",
    footerText: "September 25, 2026 | Tensta Maria Church",
    smsIntro: "Hello, this is my RSVP for John and Georgina's wedding.",
  },
  ar: {
    gateKicker: "John & Georgina",
    gateTitle: "سنتزوج",
    openInvitation: "افتح الدعوة",
    guestLine: "دعوة خاصة إلى: {guest}",
    guestLineParty: "دعوة خاصة إلى: {guest}",
    partyLine: "هذه الدعوة مخصصة لعدد {party} أشخاص",
    navDetails: "التفاصيل",
    navTravel: "الوصول",
    navSchedule: "البرنامج",
    navGallery: "الصور",
    navRsvp: "تأكيد الحضور",
    stickyRsvp: "تأكيد الحضور",
    heroKicker: "دعوة زفاف",
    verse: "Therefore what God has joined together, let no one separate",
    heroDate: "الجمعة 25 سبتمبر 2026 | كنيسة تنستا ماريا",
    heroCta: "أرسل الرد",
    essentialDateLabel: "التاريخ",
    essentialDateValue: "الجمعة 25 سبتمبر 2026",
    essentialTimeLabel: "الوقت",
    essentialTimeValue: "18:30 | 19:00",
    essentialPlaceLabel: "المكان",
    essentialPlaceValue: "كنيسة تنستا ماريا",
    essentialReplyLabel: "الرد",
    essentialReplyValue: "يائيل / نهى",
    welcomeEyebrow: "بمحبة وفرح",
    welcomeTitle: "أهلا بكم في يوم زفافنا",
    welcomeBody:
      "نرغب أن نحتفل ببداية حياتنا معا مع عائلاتنا وأصدقائنا. وجودكم معنا يعني لنا الكثير ونحن نقول نعم ونشارك هذه الأمسية بالإيمان والدفء والفرح.",
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
    travelEyebrow: "الطريق والوصول",
    travelTitle: "الوصول إلى الكنيسة",
    travelBody:
      "تقع كنيسة تنستا ماريا في Krällingegränd 1, 163 62 Spånga. نرجو التخطيط للوصول بهدوء قبل بدء المراسم.",
    parkingLabel: "مواقف السيارات",
    parkingTitle: "احضروا مبكرا",
    parkingBody:
      "توجد مواقف في المنطقة المحيطة بالكنيسة. خصصوا وقتا إضافيا للعثور على موقف والدخول بهدوء.",
    transitLabel: "المواصلات العامة",
    transitTitle: "الحافلة والمترو",
    transitBody:
      "أقرب موقف حافلات هو Krällingegränd. يقع Tensta centrum ومحطة مترو Tensta ضمن مسافة مشي.",
    arrivalLabel: "الوصول",
    arrivalTitle: "الوصول 18:30",
    arrivalBody: "نرحب بالضيوف من الساعة 18:30. تبدأ المراسم الساعة 19:00.",
    openMap: "فتح الخريطة",
    addCalendar: "إضافة إلى التقويم",
    scheduleEyebrow: "الجمعة 25 سبتمبر",
    scheduleTitle: "برنامج الأمسية",
    scheduleArrival: "وصول الضيوف",
    scheduleCeremony: "المراسم في كنيسة تنستا ماريا",
    scheduleReception: "الاحتفال في قاعة الكنيسة",
    scheduleDinner: "عشاء وكلمات واحتفال",
    storyEyebrow: "قصتنا",
    storyTitle: "من نعم في القلب إلى نعم أمام الله",
    storyBody:
      "قصتنا مليئة بلحظات صغيرة أصبحت كبيرة: ضحك، أحاديث، صلاة، عائلة ومحبة كبرت حتى أصبحت وعدا. والآن نبدأ فصلا جديدا بامتنان لكل ما مضى ولكل ما يضعه الله أمامنا.",
    galleryEyebrow: "صور وفيديو",
    galleryTitle: "بعض اللحظات من الطريق إلى هنا",
    playVideo: "تشغيل الفيديو",
    uploadPhotosBody: "بعد الزفاف يمكنكم مشاركة صوركم معنا هنا.",
    uploadPhotos: "رفع الصور",
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
    blessingBody: "يمكن للضيوف كتابة رسالة قصيرة. في هذه النسخة تحفظ على الجهاز.",
    blessingNameLabel: "الاسم",
    blessingMessageLabel: "الرسالة",
    blessingSend: "إضافة الرسالة",
    blessingDefaultOne: "ليبارك الله زواجكما بالمحبة والسلام والفرح.",
    blessingDefaultTwo: "ننتظر أن نحتفل بهذا اليوم الجميل معكما.",
    footerText: "25 سبتمبر 2026 | كنيسة تنستا ماريا",
    smsIntro: "مرحبا، هذا تأكيد حضوري لزفاف John و Georgina.",
  },
};

const galleryItems = [
  {
    type: "image",
    src: "assets/images/q.jfif",
    alt: "John och Georgina på bryggan vid vattnet",
    caption: {
      sv: "Vid vattnet i kvällsljuset",
      en: "By the water in the evening light",
      ar: "بجانب الماء في ضوء المساء",
    },
  },
  {
    type: "image",
    src: "assets/images/t.jfif",
    alt: "John och Georgina i kyrkan",
    caption: {
      sv: "En stund i kyrkan",
      en: "A moment in the church",
      ar: "لحظة في الكنيسة",
    },
  },
  {
    type: "image",
    src: "assets/images/e.jfif",
    alt: "John och Georgina vid solnedgången",
    caption: {
      sv: "Solnedgång vid vattnet",
      en: "Sunset by the water",
      ar: "غروب الشمس بجانب الماء",
    },
  },
  {
    type: "video",
    src: "assets/images/wedding-video.mp4",
    poster: "assets/images/w.jfif",
    caption: {
      sv: "En kort film från vägen hit",
      en: "A short film from the road here",
      ar: "فيلم قصير من الطريق إلى هنا",
    },
  },
  {
    type: "image",
    src: "assets/images/r.jfif",
    alt: "John och Georgina framför altaret",
    caption: {
      sv: "Framför altaret",
      en: "Before the altar",
      ar: "أمام المذبح",
    },
  },
  {
    type: "image",
    src: "assets/images/w.jfif",
    alt: "John och Georgina skrattar vid vattnet",
    caption: {
      sv: "Glädje vid vattnet",
      en: "Joy by the water",
      ar: "فرح بجانب الماء",
    },
  },
];

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
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

function updateCountdown() {
  const now = new Date();
  const distance = Math.max(0, weddingDate - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.querySelector('[data-time="days"]').textContent = String(days);
  document.querySelector('[data-time="hours"]').textContent = String(hours);
  document.querySelector('[data-time="minutes"]').textContent = String(minutes);
  document.querySelector('[data-time="seconds"]').textContent = String(seconds);
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

  if (guestName && nameInput && !nameInput.value) {
    nameInput.value = guestName;
  }

  if (guestParty && countInput && !Number.isNaN(Number(guestParty))) {
    countInput.value = guestParty;
  }
}

async function fetchInviteMap() {
  const paths = ["data/invite-map.json", "data/invite-map.sample.json"];

  for (const path of paths) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Opening the file directly can block fetch; query-string guests still work.
    }
  }

  return {};
}

async function loadInvitePersonalization() {
  if (!inviteToken) {
    return;
  }

  const inviteMap = await fetchInviteMap();
  const invite = inviteMap[inviteToken] || inviteMap[inviteToken.toLowerCase()];

  if (!invite) {
    return;
  }

  guestName = invite.guest || guestName;
  guestParty = String(invite.party || guestParty || "");
  applyGuestPersonalization();
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
  if (mediaModal.classList.contains("is-open")) {
    renderMedia(activeMediaIndex);
  }
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
    button.setAttribute("aria-label", activeLang === "sv" ? "Stoppa musik" : "Stop music");
  } else {
    stopSoftMusic();
    isPlaying = false;
    button.classList.remove("is-playing");
    button.setAttribute("aria-label", activeLang === "sv" ? "Spela musik" : "Play music");
  }
}

document.querySelector("#musicToggle").addEventListener("click", () => toggleMusic());

document.querySelector("#openInvitation").addEventListener("click", async () => {
  const gate = document.querySelector("#invitationGate");
  const button = document.querySelector("#openInvitation");

  if (gate.classList.contains("is-opening")) {
    return;
  }

  button.disabled = true;
  gate.classList.add("is-opening");
  launchCelebrationRain();
  await toggleMusic(true);
  window.setTimeout(() => {
    gate.classList.add("is-open");
  }, 3250);
});

if (skipIntro) {
  document.querySelector("#invitationGate").classList.add("is-open");
}

function launchCelebrationRain() {
  const container = document.querySelector("#celebrationRain");
  const colors = ["#fffdf8", "#f7e8e2", "#f2d7d7", "#c3a25f", "#b36b72", "#d8b66f"];
  const shapes = ["petal", "petal", "petal", "sparkle", "ribbon"];
  const envelope = document.querySelector(".gate-envelope");
  const envelopeRect = envelope.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const originX = envelopeRect.left + envelopeRect.width / 2 - containerRect.left;
  const originY = envelopeRect.top + envelopeRect.height * 0.48 - containerRect.top;
  const randomBetween = (min, max) => min + Math.random() * (max - min);

  container.innerHTML = "";

  for (let i = 0; i < 30; i += 1) {
    const piece = document.createElement("span");
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const isSparkle = shape === "sparkle";
    const isRibbon = shape === "ribbon";
    const size = isSparkle ? randomBetween(5, 10) : isRibbon ? randomBetween(6, 11) : randomBetween(7, 15);
    const angle = randomBetween(-168, -12) * (Math.PI / 180);
    const distance = randomBetween(130, Math.min(window.innerWidth * 0.44, 300));
    const burstX = Math.cos(angle) * distance;
    const burstY = Math.abs(Math.sin(angle) * distance);

    piece.className = `${shape} burst`;
    piece.style.setProperty("--burst-left", `${originX}px`);
    piece.style.setProperty("--burst-top", `${originY}px`);
    piece.style.setProperty("--burst-x", `${burstX}px`);
    piece.style.setProperty("--burst-y", `${burstY}px`);
    piece.style.setProperty("--fall-drift", `${randomBetween(-95, 95)}px`);
    piece.style.setProperty("--fall-start-rotate", `${randomBetween(-80, 80)}deg`);
    piece.style.setProperty("--fall-rotate", `${randomBetween(-760, 760)}deg`);
    piece.style.setProperty("--fall-duration", `${randomBetween(3.7, 5.6)}s`);
    piece.style.setProperty("--fall-delay", `${randomBetween(0.22, 0.62)}s`);
    piece.style.setProperty("--fall-size", `${size}px`);
    piece.style.setProperty("--fall-color", colors[i % colors.length]);
    container.appendChild(piece);
  }

  for (let i = 0; i < 96; i += 1) {
    const piece = document.createElement("span");
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const isSparkle = shape === "sparkle";
    const isRibbon = shape === "ribbon";
    const size = isSparkle ? randomBetween(5, 10) : isRibbon ? randomBetween(6, 13) : randomBetween(7, 16);

    piece.className = `${shape} fall`;
    piece.style.setProperty("--fall-left", `${randomBetween(-5, 105)}%`);
    piece.style.setProperty("--fall-drift", `${randomBetween(-190, 190)}px`);
    piece.style.setProperty("--fall-start-rotate", `${randomBetween(-90, 90)}deg`);
    piece.style.setProperty("--fall-rotate", `${randomBetween(-820, 820)}deg`);
    piece.style.setProperty("--fall-duration", `${randomBetween(4.0, 7.0)}s`);
    piece.style.setProperty("--fall-delay", `${randomBetween(0.28, 1.55)}s`);
    piece.style.setProperty("--fall-size", `${size}px`);
    piece.style.setProperty("--fall-color", colors[(i + 2) % colors.length]);
    container.appendChild(piece);
  }

  window.setTimeout(() => {
    container.innerHTML = "";
  }, 8200);
}

function formatIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcsText(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function downloadCalendarInvite() {
  const description = [
    "John & Georgina wedding",
    "Guests arrive 18:30. Ceremony begins 19:00.",
    "Map: https://maps.google.com/?q=Kr%C3%A4llingegr%C3%A4nd%201%2C%20163%2062%20Sp%C3%A5nga",
  ].join("\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//John Georgina Wedding//Invitation//SV",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:john-georgina-wedding-20260925T183000@john-georgina",
    `DTSTAMP:${formatIcsDate(new Date())}`,
    "DTSTART:20260925T163000Z",
    "DTEND:20260925T220000Z",
    `SUMMARY:${escapeIcsText("John & Georgina wedding")}`,
    `LOCATION:${escapeIcsText("Tensta Maria kyrka, Krällingegränd 1, 163 62 Spånga")}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([`${lines.join("\r\n")}\r\n`], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "john-georgina-wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

document.querySelector("#addToCalendar")?.addEventListener("click", downloadCalendarInvite);

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
    { name: activeLang === "ar" ? "العائلة" : activeLang === "sv" ? "Familjen" : "Family", message: copy.blessingDefaultOne },
    { name: activeLang === "ar" ? "الأصدقاء" : activeLang === "sv" ? "Vänner" : "Friends", message: copy.blessingDefaultTwo },
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

let activeMediaIndex = 0;
let touchStartX = 0;
let touchStartY = 0;

const mediaModal = document.createElement("div");
mediaModal.className = "media-modal";
mediaModal.innerHTML = `
  <div class="media-dialog" role="dialog" aria-modal="true" aria-label="Media">
    <button class="media-close" type="button" aria-label="Stäng">×</button>
    <button class="media-nav media-prev" type="button" aria-label="Föregående">‹</button>
    <div class="media-stage"></div>
    <button class="media-nav media-next" type="button" aria-label="Nästa">›</button>
    <div class="media-meta">
      <p class="media-caption"></p>
      <span class="media-count"></span>
    </div>
  </div>
`;
document.body.appendChild(mediaModal);

function getMediaCaption(item) {
  if (!item.caption) {
    return "";
  }

  return item.caption[activeLang] || item.caption.en || item.caption.sv || "";
}

function renderMedia(index) {
  const stage = mediaModal.querySelector(".media-stage");
  const caption = mediaModal.querySelector(".media-caption");
  const count = mediaModal.querySelector(".media-count");

  activeMediaIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeMediaIndex];

  if (item.type === "video") {
    stage.innerHTML = `
      <video controls autoplay playsinline poster="${item.poster || ""}">
        <source src="${item.src}" type="video/mp4" />
      </video>
    `;
  } else {
    stage.innerHTML = `<img src="${item.src}" alt="${escapeHtml(item.alt || "")}" />`;
  }

  caption.textContent = getMediaCaption(item);
  count.textContent = `${activeMediaIndex + 1} / ${galleryItems.length}`;
}

function openMedia(index) {
  renderMedia(index);
  mediaModal.classList.add("is-open");
  mediaModal.querySelector(".media-close").focus();
}

function closeMedia() {
  mediaModal.classList.remove("is-open");
  mediaModal.querySelector(".media-stage").innerHTML = "";
}

function showMedia(direction) {
  renderMedia(activeMediaIndex + direction);
}

document.querySelectorAll("[data-media]").forEach((button) => {
  button.addEventListener("click", () => openMedia(Number(button.dataset.media)));
});

document.querySelectorAll(".media-video video").forEach((video) => {
  video.play().catch(() => {});
});

mediaModal.querySelector(".media-close").addEventListener("click", closeMedia);
mediaModal.querySelector(".media-prev").addEventListener("click", () => showMedia(-1));
mediaModal.querySelector(".media-next").addEventListener("click", () => showMedia(1));
mediaModal.addEventListener("click", (event) => {
  if (event.target === mediaModal) {
    closeMedia();
  }
});
mediaModal.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  },
  { passive: true }
);
mediaModal.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      showMedia(deltaX > 0 ? -1 : 1);
    }
  },
  { passive: true }
);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMedia();
  } else if (mediaModal.classList.contains("is-open") && event.key === "ArrowLeft") {
    showMedia(-1);
  } else if (mediaModal.classList.contains("is-open") && event.key === "ArrowRight") {
    showMedia(1);
  }
});

updateCountdown();
setInterval(updateCountdown, 1000);
applyLanguage("sv");
loadInvitePersonalization();
