const weddingDate = new Date("2026-09-25T19:00:00+02:00");

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
    footerText: "25 september 2026 | Tensta Maria kyrka",
    smsIntro: "Hej, detta är mitt OSA till John och Georginas bröllop.",
  },
  en: {
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
    footerText: "September 25, 2026 | Tensta Maria Church",
    smsIntro: "Hello, this is my RSVP for John and Georgina's wedding.",
  },
  ar: {
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
    footerText: "25 سبتمبر 2026 | كنيسة تنستا ماريا",
    smsIntro: "مرحبا، هذا تأكيد حضوري لزفاف John و Georgina.",
  },
};

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

updateCountdown();
setInterval(updateCountdown, 1000);

let activeLang = "sv";

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
    const encodedBody = encodeURIComponent(body);
    window.location.href = `sms:${phone}?&body=${encodedBody}`;
  });
});

let audioContext;
let musicTimer;
let isPlaying = false;

function playSoftMusic() {
  audioContext = audioContext || new AudioContext();
  const notes = [261.63, 329.63, 392.0, 523.25];
  let index = 0;

  function playNote() {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = notes[index % notes.length];
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 2.6);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 2.8);
    index += 1;
  }

  playNote();
  musicTimer = setInterval(playNote, 1450);
}

function stopSoftMusic() {
  clearInterval(musicTimer);
  musicTimer = null;
}

document.querySelector("#musicToggle").addEventListener("click", async () => {
  const button = document.querySelector("#musicToggle");

  if (!isPlaying) {
    playSoftMusic();
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
});

applyLanguage("sv");
