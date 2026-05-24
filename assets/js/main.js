/* ============ TeamUp Gamer – Interaktivität ============ */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => $("#preloader")?.classList.add("hide"), 500);
  });

  /* ---------- Year ---------- */
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Particles in hero ---------- */
  const particles = $("#particles");
  if (particles && !reduceMotion) {
    const N = 24;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("span");
      const size = 2 + Math.random() * 5;
      p.style.width = p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 10 + Math.random() * 18 + "s";
      p.style.animationDelay = -Math.random() * 20 + "s";
      p.style.opacity = (0.3 + Math.random() * 0.6).toFixed(2);
      const hue = Math.random() > 0.5 ? "var(--brand-2)" : "var(--accent)";
      p.style.background = hue;
      p.style.boxShadow = `0 0 ${4 + Math.random() * 8}px ${hue}`;
      particles.appendChild(p);
    }
  }

  /* ---------- Cursor glow ---------- */
  const glow = $("#cursorGlow");
  if (glow && !reduceMotion && matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------- Nav: scroll state + progress + to-top ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 30);
    toTop.classList.toggle("show", y > 600);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  /* ---------- Mobile menu ---------- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const closeMenu = () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $$("[data-reveal]").forEach((el, i) => {
    el.style.transitionDelay = (i % 6) * 60 + "ms";
    io.observe(el);
  });

  /* ---------- Count-up stats ---------- */
  const counters = $$("[data-count]");
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  });
  counters.forEach((c) => countIO.observe(c));

  /* ---------- Hero scene parallax ---------- */
  const heroScene = $("#heroScene");
  if (heroScene && !reduceMotion) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      heroScene.style.setProperty("transform", `translate(${x}px, ${y}px)`);
    });
  }

  /* ---------- Gallery parallax on scroll ---------- */
  const parallaxItems = $$(".parallax-img");
  if (!reduceMotion && parallaxItems.length) {
    window.addEventListener(
      "scroll",
      () => {
        const vh = innerHeight;
        parallaxItems.forEach((el) => {
          const speed = +el.dataset.speed || 0.05;
          const rect = el.getBoundingClientRect();
          const offset = (rect.top - vh / 2) * speed;
          const span = el.querySelector("span");
          if (span) span.style.transform = `translateY(${offset}px)`;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Games (menu) data + render ---------- */
  const GAMES = [
    { cat: "fps",  icon: "crosshair", name: "Valorant",          players: "32,4K", desc: "Taktischer 5v5-Shooter. Agents, Abilities, präzises Gunplay.",      tags: ["Bestseller","Ranked"] },
    { cat: "fps",  icon: "swords",    name: "Counter-Strike 2",  players: "18,7K", desc: "Der Klassiker. Premier-Mode, Wingman & klassisches Comp.",             tags: ["Tryhard"], hot: true },
    { cat: "fps",  icon: "shield",    name: "Overwatch 2",       players: "12,1K", desc: "Hero-Shooter mit Tank, DPS und Support – Teamspiel pur.",              tags: ["Hero","Comp"] },
    { cat: "fps",  icon: "rocket",    name: "Call of Duty: WZ",  players: "21,5K", desc: "Schnelles BR-Gunplay, Custom-Loadouts, große Squads.",                 tags: ["BR"] },
    { cat: "moba", icon: "trophy",    name: "League of Legends", players: "44,9K", desc: "5v5-MOBA – 168+ Champions, Flex- & Solo/Duo-Queue.",                   tags: ["Bestseller"] },
    { cat: "moba", icon: "bolt",      name: "Dota 2",            players: "9,3K",  desc: "Der Tiefenschnitt. Hochkomplexes Drafting, ewige Meta.",               tags: ["Pro"] },
    { cat: "br",   icon: "ghost",     name: "Apex Legends",      players: "16,8K", desc: "Squad-basierter Battle Royale mit Movement und Legends.",              tags: ["Squad-Sync"] },
    { cat: "br",   icon: "crown",     name: "Fortnite",          players: "28,2K", desc: "Build, Zone, Win. Solos, Duos, Squads & Zero-Build.",                  tags: ["Casual","Comp"] },
    { cat: "br",   icon: "rocket",    name: "PUBG",              players: "7,9K",  desc: "Der OG-Realismus-BR. Großkarten, Vehicles, Loot.",                     tags: ["Tactical"] },
    { cat: "coop", icon: "controller",name: "Rocket League",     players: "11,4K", desc: "Auto-Soccer. 2v2 oder 3v3 mit Boost-Action.",                          tags: ["Coop","Comp"] },
    { cat: "coop", icon: "dice",      name: "Minecraft",         players: "19,1K", desc: "Survival, Creative, Modpacks – baut Welten zusammen.",                 tags: ["Sandbox","Chill"] },
    { cat: "mmo",  icon: "heart",     name: "World of Warcraft", players: "14,6K", desc: "Raids, Mythic+, Arena – findet eure Gilde oder Stammgruppe.",          tags: ["Raid","M+"] },
  ];

  const grid = $("#menuGrid");
  const renderGames = (filter = "all") => {
    grid.innerHTML = "";
    GAMES.filter((m) => filter === "all" || m.cat === filter).forEach((m) => {
      const card = document.createElement("article");
      card.className = "menu-card";
      const tags = (m.tags || [])
        .map((t) => {
          const cls = /scharf|hot|tryhard/i.test(t) || m.hot
            ? "tag tag--hot"
            : /chill|casual/i.test(t)
            ? "tag tag--veg"
            : "tag";
          return `<span class="${cls}">${t}</span>`;
        })
        .join("");
      card.innerHTML = `
        <div class="menu-card__top">
          <svg class="menu-card__svg" aria-hidden="true"><use href="#ic-${m.icon}"/></svg>
          <span class="menu-card__price" title="Aktuell online">${m.players}</span>
        </div>
        <h3>${m.name}</h3>
        <p>${m.desc}</p>
        <div class="menu-card__tags">${tags}</div>`;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
      grid.appendChild(card);
    });
  };
  renderGames();

  $$(".menu__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".menu__tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderGames(tab.dataset.filter);
    });
  });

  /* ---------- Match-Finder (builder) ---------- */
  const CHIPS = {
    game: ["Valorant","CS2","League","Apex","Fortnite","Overwatch 2","Dota 2","Rocket League"],
    role: ["Duelist","Tank","Support","Sniper","Jungler","Mid","ADC","Flex"],
    rank: ["Iron","Bronze","Silver","Gold","Plat","Diamond","Master","Pro"],
  };
  const POOL = [
    { name: "nox.runner",   icon: "ghost",     meta: "DE · 22 J · Mic" },
    { name: "Mira_K",       icon: "headset",   meta: "AT · 24 J · Mic" },
    { name: "Kaan_07",      icon: "bolt",      meta: "DE · 19 J · Mic" },
    { name: "SilberStern",  icon: "shield",    meta: "DE · 27 J · Mic" },
    { name: "VoidJay",      icon: "swords",    meta: "CH · 21 J · Mic" },
    { name: "Pixelpilot",   icon: "rocket",    meta: "DE · 25 J · Mic" },
    { name: "EmberWolf",    icon: "crown",     meta: "DE · 20 J · Mic" },
    { name: "SerenaQ",      icon: "trophy",    meta: "AT · 23 J · Mic" },
    { name: "rxnke",        icon: "controller",meta: "DE · 26 J · Mic" },
  ];

  const state = { game: "Valorant", role: "Flex", rank: "Gold" };

  const buildChips = (groupName) => {
    const wrap = $(`#chips${groupName[0].toUpperCase()}${groupName.slice(1)}`);
    if (!wrap) return;
    wrap.innerHTML = "";
    CHIPS[groupName].forEach((v) => {
      const c = document.createElement("button");
      c.type = "button";
      c.className = "chip" + (state[groupName] === v ? " active" : "");
      c.textContent = v;
      c.addEventListener("click", () => {
        state[groupName] = v;
        wrap.querySelectorAll(".chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        renderMatches();
      });
      wrap.appendChild(c);
    });
  };
  ["game", "role", "rank"].forEach(buildChips);

  const matchesEl = $("#builderMatches");
  const priceEl = $("#builderPrice");

  const hash = (s) => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  };

  const renderMatches = () => {
    const seed = hash(state.game + state.role + state.rank);
    // pick 3 deterministic players from POOL based on seed
    const picks = [];
    for (let i = 0; i < 3; i++) {
      picks.push(POOL[(seed + i * 7) % POOL.length]);
    }
    matchesEl.innerHTML = picks
      .map(
        (p) => `
        <div class="match-row">
          <span class="match-row__av"><svg><use href="#ic-${p.icon}"/></svg></span>
          <div>
            <span class="match-row__name">${p.name}</span>
            <span class="match-row__meta">${state.role} · ${p.meta}</span>
          </div>
          <span class="match-row__rank">${state.rank}</span>
        </div>`
      )
      .join("");
    // "online count" – fake but consistent
    const count = 12 + (seed % 84);
    let n = 0;
    const target = count;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 700, 1);
      n = Math.round(target * (1 - Math.pow(1 - p, 3)));
      priceEl.textContent = n;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  renderMatches();

  $("#builderAdd").addEventListener("click", () => {
    showToast(`🚀 Quick-Match gestartet: <b>${state.game}</b> · ${state.role} · ${state.rank}. Wir suchen deine Crew …`);
  });

  /* ---------- Opening-hours status (support hours) ---------- */
  // [openHour, closeHour] je Wochentag (0=So)
  const HOURS = { 0: [12, 24], 1: [10, 22], 2: [10, 22], 3: [10, 22], 4: [10, 22], 5: [10, 22], 6: [12, 24] };
  const DAY_LABEL = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
  const statusEl = $("#openStatus");
  const todayRow = $("#todayRow");
  if (statusEl && todayRow) {
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const [o, c] = HOURS[now.getDay()];
    const open = h >= o && h < c;
    statusEl.textContent = open ? "Support jetzt online" : "Support aktuell offline";
    statusEl.classList.add(open ? "open" : "closed");
    todayRow.querySelector("td:first-child").textContent = DAY_LABEL[now.getDay()];
    todayRow.querySelector("td:last-child").textContent = `${String(o).padStart(2,"0")}:00 – ${String(c).padStart(2,"0")}:00`;
  }

  /* ---------- Beta form ---------- */
  const form = $("#reserveForm");
  const note = $("#formNote");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.className = "form__note";
    if (!form.checkValidity()) {
      note.textContent = "Bitte fülle alle Pflichtfelder korrekt aus.";
      note.classList.add("err");
      form.reportValidity();
      return;
    }
    const name = $("#rName").value.trim();
    note.textContent = `GG, ${name}! Dein Beta-Slot ist reserviert – Invite kommt per E-Mail.`;
    note.classList.add("ok");
    form.reset();
    showToast("✓ Beta-Anfrage gesendet (Demo – noch keine echte Übertragung).");
  });

  /* ---------- Magnetic buttons ---------- */
  if (!reduceMotion) {
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px) translateY(-3px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- Toast (also for data-toast links) ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toastEl.innerHTML = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3800);
  }
  $$("[data-toast]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(el.dataset.toast);
    })
  );
})();
