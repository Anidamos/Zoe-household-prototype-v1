const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const toastBox = document.querySelector("[data-toast-box]");
const heroVideo = document.querySelector("[data-hero-video]");
const soundToggle = document.querySelector("[data-sound-toggle]");
const heroSection = document.querySelector(".hero");
const sermonVideo = document.querySelector("[data-sermon-video]");
const sermonPlay = document.querySelector("[data-sermon-play]");
const motionTargets = document.querySelectorAll("[data-depth]");
const sceneTargets = document.querySelectorAll("[data-scene]");
const atmosphereLayers = document.querySelectorAll(".atmosphere-layer");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const pageTransition = document.createElement("div");
pageTransition.className = "page-transition is-entering";
document.body.appendChild(pageTransition);
window.setTimeout(() => pageTransition.classList.remove("is-entering"), 760);

const campusScenes = {
  atlanta: {
    shortName: "Atlanta",
    image: 'linear-gradient(180deg, rgba(201, 157, 72, .16), rgba(17, 16, 13, .34)), url("assets/zoe-atlanta.jpg")',
    title: "ZOE Atlanta welcomes you home.",
    description: "Everything a first-time visitor needs: service time, arrival flow, children and family notes, parking, and ways to connect after service.",
    eyebrow: "Atlanta Campus",
    virtualPrayerTime: "7:30 AM & 7:30 PM",
    virtualPrayerNote: "Weekdays on Zoom.",
    virtualPrayerLink: "https://us06web.zoom.us/j/84078852039?pwd=zKbTcCm8NZJUb1EVyvk1CYWSC2oedE.1",
    tiktokTitle: "Atlanta TikTok",
    tiktokNote: "Atlanta has a TikTok pathway ready to connect later."
  },
  uk: {
    image: 'linear-gradient(180deg, rgba(245, 235, 216, .14), rgba(17, 16, 13, .38)), url("assets/zoe-uk.jpg")',
    title: "ZOE UK welcomes you home.",
    description: "Step into the UK campus experience: worship, teaching, prayer, and people building life around Jesus together.",
    eyebrow: "UK Campus",
    virtualPrayerTime: "Coming soon",
    virtualPrayerNote: "Zoom prayer times will be added here."
  },
  houston: {
    image: 'linear-gradient(180deg, rgba(31, 57, 102, .18), rgba(17, 16, 13, .38)), url("assets/zoe-houston.jpg")',
    title: "ZOE Houston welcomes you home.",
    description: "Enter the Houston campus experience: a warm doorway into worship, teaching, prayer, and community.",
    eyebrow: "Houston Campus",
    virtualPrayerTime: "Coming soon",
    virtualPrayerNote: "Zoom prayer times will be added here."
  },
  ikeja: {
    image: 'linear-gradient(180deg, rgba(201, 157, 72, .14), rgba(17, 16, 13, .34)), url("assets/zoe-ikeja.jpg")',
    title: "ZOE Ikeja welcomes you home.",
    description: "Enter the Ikeja campus experience: worship, the Word, prayer, and household life in Nigeria.",
    eyebrow: "Ikeja Campus",
    virtualPrayerTime: "Coming soon",
    virtualPrayerNote: "Zoom prayer times will be added here.",
    tiktokTitle: "Lagos Area TikTok",
    tiktokNote: "The overarching Lagos TikTok can support Ikeja updates."
  },
  ipaja: {
    image: 'linear-gradient(180deg, rgba(31, 57, 102, .2), rgba(17, 16, 13, .36)), url("assets/zoe-ipaja.jpg")',
    title: "ZOE Ipaja welcomes you home.",
    description: "Enter the Ipaja campus experience: a local expression of one Christ-centered household.",
    eyebrow: "Ipaja Campus",
    virtualPrayerTime: "Coming soon",
    virtualPrayerNote: "Zoom prayer times will be added here.",
    tiktokTitle: "Lagos Area TikTok",
    tiktokNote: "The overarching Lagos TikTok can support Ipaja updates."
  },
  abeokuta: {
    image: 'linear-gradient(180deg, rgba(33, 139, 167, .2), rgba(17, 16, 13, .34)), url("assets/zoe-abeokuta.jpg")',
    title: "ZOE Abeokuta welcomes you home.",
    description: "Enter the Abeokuta campus experience: teaching, prayer, worship, and life shared around Jesus.",
    eyebrow: "Abeokuta Campus",
    virtualPrayerTime: "Coming soon",
    virtualPrayerNote: "Zoom prayer times will be added here."
  },
  yaba: {
    image: 'linear-gradient(180deg, rgba(121, 139, 53, .2), rgba(17, 16, 13, .34)), url("assets/zoe-yaba.jpg")',
    title: "ZOE Yaba welcomes you home.",
    description: "Enter the Yaba campus experience: a doorway into worship, teaching, community, and prayer.",
    eyebrow: "Yaba Campus",
    virtualPrayerTime: "Coming soon",
    virtualPrayerNote: "Zoom prayer times will be added here.",
    tiktokTitle: "Lagos Area TikTok",
    tiktokNote: "The overarching Lagos TikTok can support Yaba updates."
  }
};

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const campusFinderLocations = [
  { key: "atlanta", name: "Atlanta Campus", shortName: "Atlanta", country: "USA", lat: 33.749, lng: -84.388, timezone: "America/New_York", page: "campus-atl.html?campus=atlanta", address: "6865 Factory Shoals, Atlanta area", meetingTime: "Sunday at 4:00 PM", match: ["atlanta", "factory shoals", "douglasville", "marietta", "alpharetta", "decatur"] },
  { key: "houston", name: "Houston Campus", shortName: "Houston", country: "USA", lat: 29.760, lng: -95.370, timezone: "America/Chicago", page: "campus-atl.html?campus=houston", address: "Houston campus address coming soon", meetingTime: "Campus gathering time coming soon", match: ["houston", "katy", "sugar land", "pearland", "the woodlands"] },
  { key: "uk", name: "UK Campus", shortName: "UK", country: "UK", lat: 51.507, lng: -0.128, timezone: "Europe/London", page: "campus-atl.html?campus=uk", address: "UK campus address coming soon", meetingTime: "Campus gathering time coming soon", match: ["uk", "united kingdom", "england", "london", "manchester", "birmingham", "leeds", "bristol"] },
  { key: "ikeja", name: "Ikeja Campus", shortName: "Ikeja", country: "Nigeria", lat: 6.601, lng: 3.351, timezone: "Africa/Lagos", page: "campus-atl.html?campus=ikeja", address: "Ikeja campus address coming soon", meetingTime: "Campus gathering time coming soon", match: ["ikeja", "allen avenue", "ogba", "maryland nigeria"] },
  { key: "ipaja", name: "Ipaja Campus", shortName: "Ipaja", country: "Nigeria", lat: 6.604, lng: 3.250, timezone: "Africa/Lagos", page: "campus-atl.html?campus=ipaja", address: "Ipaja campus address coming soon", meetingTime: "Campus gathering time coming soon", match: ["ipaja", "ayobo", "alimosho", "iyana ipaja"] },
  { key: "yaba", name: "Yaba Campus", shortName: "Yaba", country: "Nigeria", lat: 6.515, lng: 3.386, timezone: "Africa/Lagos", page: "campus-atl.html?campus=yaba", address: "Yaba campus address coming soon", meetingTime: "Campus gathering time coming soon", match: ["yaba", "surulere", "unilag", "akoka", "lagos mainland"] },
  { key: "abeokuta", name: "Abeokuta Campus", shortName: "Abeokuta", country: "Nigeria", lat: 7.147, lng: 3.361, timezone: "Africa/Lagos", page: "campus-atl.html?campus=abeokuta", address: "Abeokuta campus address coming soon", meetingTime: "Campus gathering time coming soon", match: ["abeokuta", "ogun", "sango ota", "ota nigeria"] }
];

const fallbackLocationGuesses = [
  { match: ["new york", "nyc", "brooklyn", "queens"], lat: 40.7128, lng: -74.006, timezone: "America/New_York" },
  { match: ["los angeles", "california", "ca"], lat: 34.0522, lng: -118.2437, timezone: "America/Los_Angeles" },
  { match: ["dallas", "fort worth", "texas", "tx"], lat: 32.7767, lng: -96.797, timezone: "America/Chicago" },
  { match: ["chicago", "illinois"], lat: 41.8781, lng: -87.6298, timezone: "America/Chicago" },
  { match: ["miami", "florida"], lat: 25.7617, lng: -80.1918, timezone: "America/New_York" },
  { match: ["toronto", "ontario"], lat: 43.6532, lng: -79.3832, timezone: "America/Toronto" },
  { match: ["lagos"], lat: 6.5244, lng: 3.3792, timezone: "Africa/Lagos" },
  { match: ["abuja"], lat: 9.0765, lng: 7.3986, timezone: "Africa/Lagos" },
  { match: ["ghana", "accra"], lat: 5.6037, lng: -0.187, timezone: "Africa/Accra" },
  { match: ["paris", "france"], lat: 48.8566, lng: 2.3522, timezone: "Europe/Paris" },
  { match: ["dubai", "uae"], lat: 25.2048, lng: 55.2708, timezone: "Asia/Dubai" }
];

function normalizeCampusName(name) {
  return (name || "Atlanta").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getCampusScene(name) {
  return campusScenes[normalizeCampusName(name)] || campusScenes.atlanta;
}

function applyCampusArrival() {
  let savedCampus = "";
  try {
    savedCampus = window.sessionStorage.getItem("zoeSelectedCampus");
  } catch {
    savedCampus = "";
  }
  const urlCampus = new URLSearchParams(window.location.search).get("campus");
  const selectedCampus = savedCampus || urlCampus || "Atlanta";
  if (!document.querySelector(".campus-hero")) return;

  const campus = getCampusScene(selectedCampus);
  const campusName = campus.eyebrow.replace(" Campus", "");
  document.body.dataset.campus = normalizeCampusName(campusName);

  document.querySelectorAll("[data-campus-name]").forEach((node) => {
    node.textContent = campusName;
  });

  const brandCampus = document.querySelector("[data-brand-campus]");
  if (brandCampus) brandCampus.textContent = `${campusName} Campus`;

  const heroEyebrow = document.querySelector("[data-campus-eyebrow]");
  if (heroEyebrow) heroEyebrow.textContent = campus.eyebrow;

  const heroTitle = document.querySelector("[data-campus-title]");
  if (heroTitle) heroTitle.textContent = campus.title;

  const heroDescription = document.querySelector("[data-campus-description]");
  if (heroDescription) heroDescription.textContent = campus.description;

  const prayerTime = document.querySelector("[data-campus-prayer-time]");
  if (prayerTime) prayerTime.textContent = campus.virtualPrayerTime || "Coming soon";

  const prayerNote = document.querySelector("[data-campus-prayer-note]");
  if (prayerNote) prayerNote.textContent = campus.virtualPrayerNote || "Zoom prayer times will be added here.";

  const prayerLink = document.querySelector("[data-campus-prayer-link]");
  if (prayerLink) {
    if (campus.virtualPrayerLink) {
      prayerLink.href = campus.virtualPrayerLink;
      prayerLink.hidden = false;
    } else {
      prayerLink.removeAttribute("href");
      prayerLink.hidden = true;
    }
  }

  const tiktokCard = document.querySelector("[data-campus-tiktok-card]");
  const tiktokTitle = document.querySelector("[data-campus-tiktok-title]");
  const tiktokNote = document.querySelector("[data-campus-tiktok-note]");
  if (tiktokCard) {
    if (campus.tiktokTitle) {
      tiktokCard.hidden = false;
      if (tiktokTitle) tiktokTitle.textContent = campus.tiktokTitle;
      if (tiktokNote) tiktokNote.textContent = campus.tiktokNote;
    } else {
      tiktokCard.hidden = true;
    }
  }

  const campusHero = document.querySelector(".campus-hero");
  if (campusHero) campusHero.style.setProperty("--campus-hero-image", campus.image);

  if (savedCampus && !prefersReducedMotion.matches) {
    const arrival = document.createElement("div");
    arrival.className = "campus-arrival";
    arrival.innerHTML = `<div><span>Entering</span><strong>${campusName}</strong></div>`;
    document.body.appendChild(arrival);
    window.setTimeout(() => arrival.remove(), 1050);
  }

  try {
    window.sessionStorage.removeItem("zoeSelectedCampus");
  } catch {
    // Ignore storage cleanup failures.
  }
}

applyCampusArrival();

function updateCinematicMotion() {
  document.querySelector("[data-header]")?.classList.toggle("is-scrolled", window.scrollY > 24);

  let activeScene = document.body.dataset.currentScene || "meaning";
  let closestDistance = Number.POSITIVE_INFINITY;
  sceneTargets.forEach((scene) => {
    const rect = scene.getBoundingClientRect();
    const sceneAnchor = rect.top + rect.height * 0.35;
    const distance = Math.abs(sceneAnchor - window.innerHeight * 0.42);
    if (distance < closestDistance && rect.bottom > 0 && rect.top < window.innerHeight) {
      closestDistance = distance;
      activeScene = scene.dataset.scene;
    }
  });

  document.body.dataset.currentScene = activeScene;
  document.querySelectorAll("[data-scene-dot]").forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.sceneDot === activeScene);
  });

  if (prefersReducedMotion.matches) return;

  const scrollRatio = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  atmosphereLayers.forEach((layer, index) => {
    const speed = (index + 1) * 18;
    const x = Math.sin(scrollRatio * Math.PI * 2 + index) * speed;
    const y = Math.cos(scrollRatio * Math.PI * 1.4 + index) * speed * .55;
    layer.style.setProperty("--atmosphere-drift-x", `${x.toFixed(2)}px`);
    layer.style.setProperty("--atmosphere-drift-y", `${y.toFixed(2)}px`);
  });

  motionTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const depth = Number(target.dataset.depth || 0);
    const viewportMidpoint = window.innerHeight / 2;
    const targetMidpoint = rect.top + rect.height / 2;
    const offset = (viewportMidpoint - targetMidpoint) * depth;
    target.style.setProperty("--depth-y", `${Math.max(-24, Math.min(24, offset)).toFixed(2)}px`);
  });
}

let motionFrame = null;
function requestMotionUpdate() {
  if (motionFrame) return;
  motionFrame = window.requestAnimationFrame(() => {
    motionFrame = null;
    updateCinematicMotion();
  });
}

window.addEventListener("scroll", requestMotionUpdate, { passive: true });
window.addEventListener("resize", requestMotionUpdate);
updateCinematicMotion();

if (heroVideo && soundToggle) {
  const soundToggleLabel = soundToggle.querySelector("[data-sound-label]");
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.volume = 1;

  const setSoundLabel = () => {
    const label = heroVideo.muted ? "Sound off" : "Sound on";
    if (soundToggleLabel) {
      soundToggleLabel.textContent = label;
    } else {
      soundToggle.textContent = label;
    }
    soundToggle.setAttribute("aria-pressed", String(!heroVideo.muted));
    soundToggle.classList.toggle("is-sound-on", !heroVideo.muted);
  };

  const playWithSound = () => {
    heroVideo.muted = false;
    heroVideo.volume = 1;
    const playAttempt = heroVideo.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt
        .then(setSoundLabel)
        .catch(() => {
          heroVideo.muted = true;
          setSoundLabel();
        });
    }
    setSoundLabel();
  };

  const toggleHeroSound = () => {
    if (!heroVideo.paused && !heroVideo.muted) {
      heroVideo.muted = true;
      setSoundLabel();
      return;
    }

    if (!heroVideo.paused && heroVideo.muted) {
      heroVideo.muted = false;
      heroVideo.volume = 1;
      setSoundLabel();
      return;
    }

    playWithSound();
  };

  soundToggle.addEventListener("click", toggleHeroSound);
  heroVideo.addEventListener("play", setSoundLabel);
  heroVideo.addEventListener("pause", setSoundLabel);
  window.setTimeout(() => {
    const playAttempt = heroVideo.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => setSoundLabel());
    }
    setSoundLabel();
  }, 250);

  if (heroSection && "IntersectionObserver" in window) {
    const heroVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          heroVideo.muted = true;
          heroVideo.pause();
          setSoundLabel();
        }
      });
    }, { threshold: 0.08 });

    heroVideoObserver.observe(heroSection);
  }
}

if (sermonVideo && sermonPlay) {
  const setSermonLabel = () => {
    sermonPlay.setAttribute(
      "aria-label",
      sermonVideo.paused ? "Play ZOE Household TV preview with sound" : "Pause ZOE Household TV preview"
    );
  };

  sermonPlay.addEventListener("click", () => {
    if (!sermonVideo.paused && !sermonVideo.muted) {
      sermonVideo.pause();
      setSermonLabel();
      return;
    }

    sermonVideo.muted = false;
    sermonVideo.volume = 1;
    const playAttempt = sermonVideo.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(() => showToast("Tap again to play the preview with sound."));
    }
    setSermonLabel();
  });

  sermonVideo.addEventListener("play", setSermonLabel);
  sermonVideo.addEventListener("pause", setSermonLabel);
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-campus-menu-toggle], [data-nav-menu-toggle]").forEach((toggle) => {
  const menu = toggle.closest(".nav-menu");
  toggle.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("is-open") || false;
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll(".reveal").forEach((node) => {
  const siblings = [...(node.parentElement?.children || [])].filter((child) => child.classList?.contains("reveal"));
  const index = Math.max(0, siblings.indexOf(node));
  node.style.setProperty("--reveal-delay", `${Math.min(index * 90, 360)}ms`);
  if (revealObserver) {
    revealObserver.observe(node);
  } else {
    node.classList.add("is-visible");
  }
});

function showToast(message) {
  if (!toastBox || !message) return;
  toastBox.textContent = message;
  toastBox.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toastBox.classList.remove("show"), 3200);
}

document.querySelectorAll("[data-toast]").forEach((node) => {
  node.addEventListener("click", () => showToast(node.dataset.toast));
});

function rememberCampus(campusName) {
  try {
    window.sessionStorage.setItem("zoeSelectedCampus", campusName);
  } catch {
    // Session storage can be unavailable in some private browsing contexts.
  }
}

document.querySelectorAll("[data-campus-link]").forEach((link) => {
  link.addEventListener("click", () => {
    rememberCampus(link.dataset.campusLink || "Atlanta");
  });
});

function buildPortalStage(link, rect) {
  const campusName = link.dataset.campus || "Atlanta";
  const campus = getCampusScene(campusName);
  const stage = document.createElement("div");
  stage.className = "portal-stage";
  stage.dataset.campus = normalizeCampusName(campusName);
  stage.style.setProperty("--portal-left", `${rect.left + rect.width / 2}px`);
  stage.style.setProperty("--portal-top", `${rect.top + rect.height / 2}px`);
  stage.style.setProperty("--portal-width", `${Math.max(112, rect.width)}px`);
  stage.style.setProperty("--portal-height", `${Math.max(260, rect.height)}px`);
  stage.style.setProperty("--portal-image", campus.image);
  stage.innerHTML = `
    <div class="portal-background" aria-hidden="true"></div>
    <div class="portal-destination" aria-hidden="true"></div>
    <div class="portal-atmosphere" aria-hidden="true"></div>
    <div class="portal-depth" aria-hidden="true"></div>
    <div class="portal-light" aria-hidden="true"></div>
    <div class="portal-midground" aria-hidden="true"></div>
    <div class="portal-door" aria-hidden="true"></div>
    <div class="portal-foreground" aria-hidden="true"></div>
    <div class="portal-threshold" aria-hidden="true"></div>
    <div class="portal-label"><span>Entering</span><strong>${campusName}</strong></div>
  `;
  return stage;
}

function getPortalImageUrl(scene) {
  const match = scene.image.match(/url\(["']?([^"')]+)["']?\)/);
  return match ? match[1] : "";
}

function preloadImage(src) {
  if (!src) return Promise.resolve();
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = src;
    if (image.decode) image.decode().then(resolve).catch(resolve);
  });
}

function lockScroll() {
  const scrollY = window.scrollY;
  document.body.dataset.scrollLockY = String(scrollY);
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function unlockScroll() {
  const scrollY = Number(document.body.dataset.scrollLockY || 0);
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  delete document.body.dataset.scrollLockY;
  window.scrollTo(0, scrollY);
}

async function startPortalTransition(event, link) {
  const nextUrl = new URL(link.getAttribute("href"), window.location.href);
  const campusName = link.dataset.campus || "Atlanta";
  const campus = getCampusScene(campusName);

  event.preventDefault();
  event.stopImmediatePropagation();
  rememberCampus(campusName);

  if (prefersReducedMotion.matches || !window.gsap) {
    window.location.href = nextUrl.href;
    return;
  }

  await preloadImage(getPortalImageUrl(campus));

  const rect = link.getBoundingClientRect();
  const stage = buildPortalStage(link, rect);
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const travelX = window.innerWidth / 2 - centerX;
  const travelY = window.innerHeight / 2 - centerY;
  const doorScale = Math.max(window.innerWidth / rect.width, window.innerHeight / rect.height) * 1.55;
  const gsap = window.gsap;

  document.body.appendChild(stage);
  document.body.classList.add("portal-active");
  link.setAttribute("aria-busy", "true");
  lockScroll();

  const homeLayers = [
    document.querySelector("[data-header]"),
    document.querySelector(".announcement"),
    document.querySelector(".scene-rail"),
    link.closest(".household-hall")?.querySelector(".hall-copy")
  ].filter(Boolean);
  const otherDoorways = [...document.querySelectorAll("[data-portal-door]")].filter((doorway) => doorway !== link);

  const q = gsap.utils.selector(stage);
  const timeline = gsap.timeline({
    defaults: { ease: "power3.inOut" },
    onComplete: () => {
      unlockScroll();
      document.body.classList.remove("portal-active");
      window.location.href = nextUrl.href;
    }
  });

  gsap.set(stage, { autoAlpha: 0 });
  gsap.set(q(".portal-background"), { autoAlpha: 0, scale: .98 });
  gsap.set(q(".portal-destination"), { autoAlpha: 0, scale: .58, z: -820, filter: "blur(18px) saturate(0.8) brightness(0.62)" });
  gsap.set(q(".portal-atmosphere"), { autoAlpha: 0, rotationX: 70, y: "28vh", z: -360, scale: .72 });
  gsap.set(q(".portal-depth"), { autoAlpha: .28, z: -260, scale: .92 });
  gsap.set(q(".portal-midground"), { autoAlpha: .16, z: -120, scale: .96 });
  gsap.set(q(".portal-foreground"), { autoAlpha: 0, z: 80, scale: .9 });
  gsap.set(q(".portal-light"), { autoAlpha: 0, scale: .5, rotation: 0 });
  gsap.set(q(".portal-door"), { xPercent: -50, yPercent: -50, x: 0, y: 0, z: 0, scale: 1, autoAlpha: 1, filter: "saturate(1) brightness(1)" });
  gsap.set(q(".portal-threshold"), { autoAlpha: 0, scale: .68 });
  gsap.set(q(".portal-label"), { xPercent: -50, y: 26, scale: .98, autoAlpha: 0 });
  gsap.set([stage, q(".portal-door"), q(".portal-destination"), q(".portal-atmosphere"), q(".portal-depth"), q(".portal-midground"), q(".portal-foreground"), q(".portal-light")], { force3D: true });

  timeline
    .to(stage, { autoAlpha: 1, duration: .18, ease: "sine.inOut" }, 0)
    .to(homeLayers, { autoAlpha: .42, filter: "blur(5px)", scale: .985, duration: .55, ease: "sine.inOut" }, 0)
    .to(otherDoorways, {
      autoAlpha: .16,
      filter: "blur(6px) saturate(0.75)",
      x: (index) => index % 2 ? 62 : -62,
      y: 24,
      scale: .72,
      duration: .62,
      ease: "power3.inOut"
    }, 0)
    .to(link, { y: -22, scale: 1.08, z: 80, duration: .42, ease: "power3.inOut", force3D: true }, 0)
    .to(q(".portal-background"), { autoAlpha: .88, scale: 1.08, duration: 1.15, ease: "sine.inOut" }, .06)
    .to(q(".portal-label"), { autoAlpha: .92, y: 0, scale: 1, duration: .42, ease: "sine.inOut" }, .12)
    .to(q(".portal-door"), { x: travelX, y: travelY, z: 220, scale: 1.85, filter: "saturate(1.12) brightness(1.08)", duration: .72, ease: "power3.inOut" }, .18)
    .to(q(".portal-light"), { autoAlpha: .34, scale: .86, rotation: 8, duration: .62, ease: "sine.inOut" }, .28)
    .to(q(".portal-atmosphere"), { autoAlpha: .42, y: "8vh", z: 120, scale: 1.08, duration: .78, ease: "power3.inOut" }, .48)
    .to(q(".portal-depth"), { autoAlpha: .44, z: 80, scale: 1.08, duration: .75, ease: "power3.inOut" }, .48)
    .to(q(".portal-midground"), { autoAlpha: .34, z: 220, scale: 1.12, duration: .7, ease: "power3.inOut" }, .58)
    .to(q(".portal-door"), { x: travelX, y: travelY, z: 740, scale: doorScale * .62, filter: "saturate(1.16) brightness(1.14) blur(0.4px)", duration: .68, ease: "expo.inOut" }, .86)
    .to(q(".portal-threshold"), { autoAlpha: .62, scale: 1.18, duration: .5, ease: "sine.inOut" }, 1.02)
    .to(q(".portal-foreground"), { autoAlpha: .58, z: 620, scale: 1.2, duration: .54, ease: "power3.inOut" }, 1.04)
    .to(q(".portal-label"), { autoAlpha: .24, y: -12, scale: 1.03, duration: .38, ease: "sine.inOut" }, 1.12)
    .to(q(".portal-destination"), { autoAlpha: .78, scale: 1.02, z: -180, filter: "blur(5px) saturate(1) brightness(0.88)", duration: .62, ease: "sine.inOut" }, 1.24)
    .to(q(".portal-door"), { z: 1260, scale: doorScale * 1.45, autoAlpha: 0, filter: "saturate(1) brightness(1.2) blur(3px)", duration: .58, ease: "expo.inOut" }, 1.42)
    .to(q(".portal-atmosphere"), { autoAlpha: 0, y: "-22vh", z: 840, scale: 1.72, duration: .58, ease: "expo.inOut" }, 1.42)
    .to(q(".portal-depth"), { autoAlpha: 0, z: 980, scale: 1.7, duration: .58, ease: "expo.inOut" }, 1.42)
    .to(q(".portal-midground"), { autoAlpha: 0, z: 1180, scale: 1.86, duration: .5, ease: "expo.inOut" }, 1.48)
    .to(q(".portal-foreground"), { autoAlpha: 0, z: 1540, scale: 1.96, duration: .44, ease: "expo.inOut" }, 1.5)
    .to(q(".portal-light"), { autoAlpha: 0, scale: 2.3, rotation: 30, duration: .5, ease: "sine.inOut" }, 1.5)
    .to(q(".portal-threshold"), { autoAlpha: 0, scale: 1.75, duration: .42, ease: "sine.inOut" }, 1.58)
    .to(q(".portal-destination"), { autoAlpha: 1, scale: 1.16, z: 0, filter: "blur(0px) saturate(1.04) brightness(0.96)", duration: .56, ease: "sine.inOut" }, 1.58)
    .to(q(".portal-label"), { autoAlpha: 0, y: -28, scale: 1.08, duration: .34, ease: "sine.inOut" }, 1.62);
}

document.querySelectorAll("[data-portal-door]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute("download")) return;
    startPortalTransition(event, link);
  });
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target || link.hasAttribute("download")) return;

  const nextUrl = new URL(link.getAttribute("href"), window.location.href);
  const currentUrl = new URL(window.location.href);
  const sameDocumentHash = nextUrl.pathname === currentUrl.pathname && nextUrl.hash;
  const isInternalPage = nextUrl.protocol === currentUrl.protocol && nextUrl.host === currentUrl.host && /\.html$/.test(nextUrl.pathname);

  if (sameDocumentHash || !isInternalPage || prefersReducedMotion.matches) return;

  event.preventDefault();
  pageTransition.classList.add("is-leaving");
  window.setTimeout(() => {
    window.location.href = nextUrl.href;
  }, 430);
});

function findLocationGuess(address) {
  const normalized = address.toLowerCase();
  const directCampus = campusFinderLocations.find((campus) => campus.match.some((term) => normalized.includes(term)));
  if (directCampus) return { lat: directCampus.lat, lng: directCampus.lng, timezone: directCampus.timezone, source: directCampus.shortName };

  const fallback = fallbackLocationGuesses.find((guess) => guess.match.some((term) => normalized.includes(term)));
  if (fallback) return { ...fallback, source: "regional match" };

  return { lat: 39.5, lng: -98.35, timezone: "America/Chicago", source: "broad estimate" };
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function distanceMiles(pointA, pointB) {
  const earthMiles = 3958.8;
  const dLat = toRadians(pointB.lat - pointA.lat);
  const dLng = toRadians(pointB.lng - pointA.lng);
  const lat1 = toRadians(pointA.lat);
  const lat2 = toRadians(pointB.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthMiles * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimatedDriveHours(distance, campus) {
  const speed = campus.country === "Nigeria" ? 32 : 50;
  return distance / speed;
}

function formatDriveTime(hours) {
  const totalMinutes = Math.max(12, Math.round(hours * 60));
  const driveHours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (!driveHours) return `${minutes} min`;
  return `${driveHours} hr${driveHours === 1 ? "" : "s"}${minutes ? ` ${minutes} min` : ""}`;
}

function getNextAtlantaServiceDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).formatToParts(now).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDay = weekdays.indexOf(parts.weekday);
  let daysUntilSunday = (7 - currentDay) % 7;
  const currentMinutes = Number(parts.hour) * 60 + Number(parts.minute);
  if (daysUntilSunday === 0 && currentMinutes >= 16 * 60) daysUntilSunday = 7;
  const easternMidday = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + daysUntilSunday, 20, 0, 0));
  return easternMidday;
}

function formatInTimeZone(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(date);
}

function updateCountdown(targetDate) {
  const diff = Math.max(0, targetDate.getTime() - Date.now());
  const minutesTotal = Math.floor(diff / 60000);
  const days = Math.floor(minutesTotal / 1440);
  const hours = Math.floor((minutesTotal % 1440) / 60);
  const minutes = minutesTotal % 60;
  document.querySelector("[data-countdown-days]")?.replaceChildren(String(days));
  document.querySelector("[data-countdown-hours]")?.replaceChildren(String(hours).padStart(2, "0"));
  document.querySelector("[data-countdown-minutes]")?.replaceChildren(String(minutes).padStart(2, "0"));
}

function globePointFromLatLng(lat, lng) {
  const x = 50 + (lng / 180) * 31;
  const y = 50 - (lat / 90) * 32;
  return {
    x: Math.max(12, Math.min(88, x)),
    y: Math.max(14, Math.min(86, y))
  };
}

function setGlobeMarkerPosition(marker, point) {
  if (!marker || !point) return;
  marker.style.left = `${point.x}%`;
  marker.style.top = `${point.y}%`;
}

function updateGeoRoute(visitor, campus) {
  const route = document.querySelector("[data-geo-route]");
  if (!route || !visitor || !campus) return;
  const from = globePointFromLatLng(visitor.lat, visitor.lng);
  const to = globePointFromLatLng(campus.lat, campus.lng);
  const userMarker = document.querySelector("[data-user-marker]");
  setGlobeMarkerPosition(userMarker, from);
  if (userMarker) userMarker.hidden = false;
  const midX = (from.x + to.x) / 2;
  const midY = Math.min(from.y, to.y) - 13;
  route.setAttribute("d", `M ${from.x} ${from.y} C ${midX} ${midY}, ${midX} ${midY}, ${to.x} ${to.y}`);
}

function setGeoMarkers() {
  campusFinderLocations.forEach((campus) => {
    setGlobeMarkerPosition(document.querySelector(`[data-campus-marker="${campus.key}"]`), globePointFromLatLng(campus.lat, campus.lng));
  });
}

function animateGeoLoad() {
  const page = document.querySelector("[data-geo-page]");
  if (!page || prefersReducedMotion.matches || !window.gsap) return;
  const gsap = window.gsap;
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  timeline
    .from(".geo-globe-wrap", { autoAlpha: 0, scale: .9, y: 26, duration: 1.1 })
    .from(".geo-marker", { autoAlpha: 0, scale: .45, stagger: .08, duration: .72, ease: "back.out(1.4)" }, .35)
    .from("[data-geo-intro] > *", { autoAlpha: 0, y: 24, stagger: .08, duration: .78 }, .48)
    .from("[data-geo-result-panel]", { autoAlpha: 0, y: 18, duration: .72 }, .9);
}

function animateGeoSearch(nearest, visitor, isOnline) {
  const page = document.querySelector("[data-geo-page]");
  if (!page) return;
  const selectedKey = nearest?.key || "atlanta";
  document.querySelectorAll(".geo-marker").forEach((marker) => marker.classList.toggle("is-selected", marker.dataset.campusMarker === selectedKey));
  updateGeoRoute(visitor, nearest || campusFinderLocations[0]);

  if (prefersReducedMotion.matches || !window.gsap) {
    page.classList.add("has-route", isOnline ? "is-online-result" : "is-campus-result");
    return;
  }

  const gsap = window.gsap;
  const selectedMarker = document.querySelector(`[data-campus-marker="${selectedKey}"]`);
  const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });
  timeline
    .to("[data-geo-intro]", { y: -8, autoAlpha: .86, duration: .42, ease: "sine.inOut" }, 0)
    .to("[data-geo-globe-wrap]", { scale: 1.08, rotateY: isOnline ? -12 : 12, rotateX: 4, duration: .86, ease: "power3.inOut" }, 0)
    .to("[data-geo-globe]", { rotation: isOnline ? -18 : 18, duration: .86, ease: "power3.inOut" }, 0)
    .to(".geo-marker", { autoAlpha: .34, scale: .82, duration: .36, ease: "sine.inOut" }, .16)
    .to(selectedMarker, { autoAlpha: 1, scale: 1.35, duration: .55, ease: "back.out(1.5)" }, .42)
    .set(page, { className: `geo-page has-route ${isOnline ? "is-online-result" : "is-campus-result"}` }, .58)
    .fromTo("[data-user-marker]", { autoAlpha: 0, scale: .55 }, { autoAlpha: 1, scale: 1, duration: .42, ease: "back.out(1.4)" }, .58)
    .fromTo("[data-geo-route]", { strokeDashoffset: 240, autoAlpha: 0 }, { strokeDashoffset: 0, autoAlpha: .9, duration: .8, ease: "sine.inOut" }, .7)
    .fromTo("[data-geo-result-panel]", { autoAlpha: .72, y: 22 }, { autoAlpha: 1, y: 0, duration: .56, ease: "power3.out" }, .84)
    .fromTo("[data-result-details] > div, [data-map-actions] > *", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, stagger: .05, duration: .34, ease: "power3.out" }, 1.02);
}

function initCampusFinder() {
  const form = document.querySelector("[data-campus-finder-form]");
  if (!form) return;

  const result = document.querySelector("[data-campus-result]");
  const status = document.querySelector("[data-map-status]");
  const title = document.querySelector("[data-map-title]");
  const copy = document.querySelector("[data-map-copy]");
  const actions = document.querySelector("[data-map-actions]");
  const onlineInvite = document.querySelector("[data-online-invite]");
  const livestreamCopy = document.querySelector("[data-livestream-copy]");
  const details = document.querySelector("[data-result-details]");
  const resultAddress = document.querySelector("[data-result-address]");
  const resultDrive = document.querySelector("[data-result-drive]");
  const resultMeeting = document.querySelector("[data-result-meeting]");
  let countdownTimer = null;

  setGeoMarkers();
  animateGeoLoad();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const address = String(formData.get("address") || "").trim();
    if (!address) {
      form.reportValidity();
      return;
    }

    const visitor = findLocationGuess(address);
    const ranked = campusFinderLocations
      .map((campus) => {
        const miles = distanceMiles(visitor, campus);
        const driveHours = estimatedDriveHours(miles, campus);
        return { ...campus, miles, driveHours };
      })
      .sort((a, b) => a.driveHours - b.driveHours);
    const nearest = ranked[0];
    const serviceDate = getNextAtlantaServiceDate();
    const visitorTime = formatInTimeZone(serviceDate, visitor.timezone);

    result?.classList.add("has-result");
    if (actions) {
      actions.hidden = false;
      actions.innerHTML = "";
    }
    if (details) details.hidden = false;

    if (nearest && nearest.driveHours <= 3) {
      onlineInvite.hidden = true;
      if (status) status.textContent = "Closest campus found";
      if (title) title.textContent = nearest.name;
      if (copy) copy.textContent = "This is the closest doorway into ZOE Household based on the location you entered.";
      if (resultAddress) resultAddress.textContent = nearest.address;
      if (resultDrive) resultDrive.textContent = `${formatDriveTime(nearest.driveHours)} estimated`;
      if (resultMeeting) resultMeeting.textContent = nearest.meetingTime;
      actions?.insertAdjacentHTML("beforeend", `<a class="button button-primary" href="${nearest.page}">Plan Your Visit</a><button class="button button-quiet" type="button" data-toast="Production can open directions with Google or Apple Maps.">Get Directions</button>`);
      animateGeoSearch(nearest, visitor, false);
      if (countdownTimer) window.clearInterval(countdownTimer);
      return;
    }

    if (status) status.textContent = "Online invitation";
    if (title) title.textContent = "Join us online.";
    if (copy) copy.textContent = "No campus is within 3 hours yet, but you can join us online.";
    if (resultAddress) resultAddress.textContent = "ZOE Atlanta livestream";
    if (resultDrive) resultDrive.textContent = "Online from your location";
    if (resultMeeting) resultMeeting.textContent = `Next livestream: ${visitorTime}`;
    actions?.insertAdjacentHTML("beforeend", `<a class="button button-primary" href="https://youtube.com/@thezoehouseholdtv5?si=_t1UFKYPPsSxbpCP" target="_blank" rel="noopener">Watch Live</a><button class="button button-quiet" type="button" data-toast="Use the updates form below to join the prototype reminder list.">Get Updates</button>`);

    onlineInvite.hidden = false;
    if (livestreamCopy) livestreamCopy.textContent = `The next Atlanta livestream is ${visitorTime} based on the location you entered.`;
    animateGeoSearch(campusFinderLocations[0], visitor, true);
    updateCountdown(serviceDate);
    if (countdownTimer) window.clearInterval(countdownTimer);
    countdownTimer = window.setInterval(() => updateCountdown(serviceDate), 30000);
  });

  document.querySelector("[data-reminder-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const reminderForm = event.currentTarget;
    const statusNode = reminderForm.querySelector("[data-reminder-status]");
    if (!reminderForm.checkValidity()) {
      reminderForm.reportValidity();
      return;
    }
    if (statusNode) {
      statusNode.textContent = "Reminder saved in prototype. Production would send reminders 1 day and 3 hours before livestream.";
      statusNode.className = "form-status success";
    }
    reminderForm.reset();
  });
}

initCampusFinder();

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("[data-form-status]");
    const submit = form.querySelector("button[type='submit']");

    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) {
        status.textContent = "Please complete the required fields.";
        status.className = "form-status error";
      }
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending...";
    }

    window.setTimeout(() => {
      if (status) {
        status.textContent = "Received. This prototype shows the success state; backend routing comes next.";
        status.className = "form-status success";
      }
      if (submit) {
        submit.disabled = false;
        submit.textContent = submit.dataset.originalText || "Send";
      }
      form.reset();
    }, 650);
  });

  const submit = form.querySelector("button[type='submit']");
  if (submit) submit.dataset.originalText = submit.textContent;
});
