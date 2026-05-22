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
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1200;
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
  $$("[data-count]").forEach((c) => countIO.observe(c));

  /* ---------- Hero art parallax ---------- */
  const heroArt = $("#heroArt");
  if (heroArt && !reduceMotion) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      heroArt.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- Games data + render ---------- */
  const GAMES = [
    { cat: "fps", icon: "target", name: "Valorant", online: "12.480", desc: "Taktischer 5v5-Shooter. Finde deinen Stamm-Squad fürs Ranked-Grind.", tags: ["FPS", "Ranked"], hot: true },
    { cat: "fps", icon: "target", name: "CS2", online: "10.120", desc: "Premier & Faceit. Suche Mitspieler mit ähnlichem Elo und Mic.", tags: ["FPS", "Ranked"] },
    { cat: "fps", icon: "target", name: "Overwatch 2", online: "5.940", desc: "6v6-Action mit klaren Rollen. Tank, DPS oder Support gesucht?", tags: ["FPS", "Hero"] },
    { cat: "fps", icon: "target", name: "Call of Duty", online: "7.350", desc: "Warzone & Multiplayer. Stell dir dein Verbrechertrio zusammen.", tags: ["FPS"] },
    { cat: "moba", icon: "sword", name: "League of Legends", online: "9.860", desc: "Solo/Duo oder Flex. Finde eine feste 5er-Truppe für Clash.", tags: ["MOBA", "Ranked"], hot: true },
    { cat: "moba", icon: "sword", name: "Dota 2", online: "4.510", desc: "Vom Carry bis Hard-Support – baut eine eingespielte Lineup auf.", tags: ["MOBA"] },
    { cat: "moba", icon: "sword", name: "Smite", online: "1.280", desc: "Third-Person-MOBA. Sucht Mitspieler für Conquest & Joust.", tags: ["MOBA"] },
    { cat: "br", icon: "rocket", name: "Fortnite", online: "11.700", desc: "Build oder Zero Build. Squad-Fills nerven – finde echte Teammates.", tags: ["Battle Royale"], hot: true },
    { cat: "br", icon: "rocket", name: "Apex Legends", online: "6.210", desc: "Legends-Synergie zählt. Finde Mitspieler mit Comms und Plan.", tags: ["Battle Royale", "Ranked"] },
    { cat: "br", icon: "rocket", name: "PUBG", online: "2.640", desc: "Realistische Gunfights, 4er-Squads. Sucht Teamplayer mit Mic.", tags: ["Battle Royale"] },
    { cat: "sport", icon: "controller", name: "Rocket League", online: "5.020", desc: "2v2 & 3v3. Finde feste Mitspieler für die Ranked-Leiter.", tags: ["Sport", "Ranked"] },
    { cat: "sport", icon: "controller", name: "EA SPORTS FC", online: "3.180", desc: "Pro Clubs & Co-op-Saisons. Bau dein virtuelles Vereinsteam.", tags: ["Sport"], new: true },
    { cat: "sport", icon: "users", name: "Helldivers 2", online: "2.910", desc: "Koop-PvE für die Demokratie. Finde eine zuverlässige 4er-Crew.", tags: ["Co-op"], new: true },
    { cat: "sport", icon: "users", name: "Deep Rock Galactic", online: "1.450", desc: "Rock & Stone! Sucht Dwarfs für tiefe Mining-Missionen.", tags: ["Co-op"] },
  ];

  const grid = $("#gamesGrid");
  const renderGames = (filter = "all") => {
    grid.innerHTML = "";
    GAMES.filter((g) => filter === "all" || g.cat === filter).forEach((g) => {
      const card = document.createElement("article");
      card.className = "game-card";
      const tags = (g.tags || [])
        .map((t, i) => {
          const cls = i === 0 && g.hot ? "tag tag--hot" : i === 0 && g.new ? "tag tag--new" : "tag";
          return `<span class="${cls}">${t}</span>`;
        })
        .join("");
      card.innerHTML = `
        <div class="game-card__top">
          <svg class="game-card__svg" aria-hidden="true"><use href="#ic-${g.icon}"/></svg>
          <span class="game-card__online">${g.online} online</span>
        </div>
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
        <div class="game-card__tags">${tags}</div>`;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
      grid.appendChild(card);
    });
  };
  renderGames();

  $$(".games__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".games__tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderGames(tab.dataset.filter);
    });
  });

  /* ---------- Squad Finder ---------- */
  const FINDER = {
    game: ["Valorant", "League of Legends", "Apex Legends", "Rocket League"],
    role: ["Damage", "Support", "Tank", "Flex"],
    rank: ["Casual", "Gold", "Platin", "Diamond+"],
    region: ["EU West", "EU Nord", "EU Ost"],
  };
  const TAGS = ["Nova", "Pixel", "Shadow", "Frost", "Volt", "Echo", "Riot", "Lynx", "Zen", "Blaze", "Krypt", "Vex", "Onyx", "Wisp", "Drift", "Nyx"];
  const SUFFIX = ["", "_", "x", "TTV", "GG", "99", "YT", "_HD", "z", "01"];
  const selection = { game: "Valorant", role: "Flex", rank: "Platin", region: "EU West" };

  const buildChips = (wrapId, key, list) => {
    const wrap = $("#" + wrapId);
    list.forEach((val, i) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (i === 0 ? " active" : "");
      chip.textContent = val;
      if (i === 0) selection[key] = val;
      chip.addEventListener("click", () => {
        $$(".chip", wrap).forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        selection[key] = val;
      });
      wrap.appendChild(chip);
    });
  };
  buildChips("finderGame", "game", FINDER.game);
  buildChips("finderRole", "role", FINDER.role);
  buildChips("finderRank", "rank", FINDER.rank);
  buildChips("finderRegion", "region", FINDER.region);

  const palette = [
    "linear-gradient(135deg,#a855f7,#22d3ee)",
    "linear-gradient(135deg,#22d3ee,#4ade80)",
    "linear-gradient(135deg,#f472b6,#a855f7)",
    "linear-gradient(135deg,#fbbf24,#f472b6)",
  ];
  const rand = (a) => a[Math.floor(Math.random() * a.length)];
  const roster = $("#finderRoster");
  const scoreEl = $("#finderScore");

  const generateSquad = () => {
    const otherRoles = FINDER.role.filter((r) => r !== selection.role);
    const count = 3;
    roster.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const tag = rand(TAGS) + rand(SUFFIX);
      const role = i < otherRoles.length ? otherRoles[i] : rand(FINDER.role);
      const ping = 8 + Math.floor(Math.random() * 38);
      const mate = document.createElement("div");
      mate.className = "mate";
      mate.style.animationDelay = i * 90 + "ms";
      mate.innerHTML = `
        <div class="mate__avatar" style="background:${palette[i % palette.length]}">${tag[0].toUpperCase()}</div>
        <div class="mate__main">
          <div class="mate__tag">${tag}</div>
          <div class="mate__meta">${selection.rank} · ${role} · ${selection.region}</div>
        </div>
        <div class="mate__ping">${ping} ms</div>`;
      roster.appendChild(mate);
    }
    // synergy score animation
    const target = 78 + Math.floor(Math.random() * 21); // 78–98
    const start = performance.now();
    const dur = 900;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      scoreEl.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + "%";
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    showToast(`Squad für ${selection.game} gefunden – ${selection.role}, ${selection.rank}, ${selection.region}.`);
  };
  $("#finderBtn").addEventListener("click", generateSquad);

  /* ---------- Live online counter (demo) ---------- */
  const onlineCount = $("#onlineCount");
  const onlineRows = $$("#onlineList td[data-base]");
  const fmtNum = (n) => n.toLocaleString("de-DE");
  const tickLive = () => {
    let total = 0;
    onlineRows.forEach((td) => {
      const base = +td.dataset.base;
      const val = base + Math.floor((Math.random() - 0.5) * base * 0.04);
      total += val;
      td.textContent = fmtNum(val);
    });
    total += 4280 + Math.floor((Math.random() - 0.5) * 800); // other games
    onlineCount.textContent = fmtNum(total);
  };
  if (onlineCount) {
    tickLive();
    if (!reduceMotion) setInterval(tickLive, 3500);
  }

  /* ---------- Join / profile form ---------- */
  const form = $("#joinForm");
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
    const tag = $("#jTag").value.trim();
    note.textContent = `Willkommen an Bord, ${tag}! Dein Profil ist angelegt – wir matchen dich gleich mit deinem Squad.`;
    note.classList.add("ok");
    form.reset();
    showToast("Profil erstellt ✓ (Demo – keine echte Übertragung)");
  });

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
