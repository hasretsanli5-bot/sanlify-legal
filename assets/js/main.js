/* ============ Penalty Burger – Interaktivität ============ */
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
  const counters = $$("[data-count]");
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
  counters.forEach((c) => countIO.observe(c));

  /* ---------- Hero burger parallax ---------- */
  const heroBurger = $("#heroBurger");
  if (heroBurger && !reduceMotion) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      heroBurger.style.transform = `translate(${x}px, ${y}px)`;
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

  /* ---------- Menu data + render ---------- */
  const MENU = [
    { cat: "burger", emoji: "🍔", name: "Klassiker Penalty", price: "8,90", desc: "Smash-Patty, Cheddar, Salat, Tomate, hausgemachte Penalty-Sauce.", tags: ["Bestseller"] },
    { cat: "burger", emoji: "🧀", name: "Double Cheese Strike", price: "11,50", desc: "Zwei Patties, doppelt Cheddar, karamellisierte Zwiebeln.", tags: [] },
    { cat: "burger", emoji: "🥓", name: "Bacon Bomb", price: "12,90", desc: "Crispy Bacon, BBQ-Sauce, Röstzwiebeln, Cheddar.", tags: [] },
    { cat: "burger", emoji: "🌶️", name: "El Diablo", price: "11,90", desc: "Jalapeños, Chili-Mayo, Pepper-Jack – nur für Mutige.", tags: ["scharf"], hot: true },
    { cat: "burger", emoji: "🍗", name: "Crispy Chicken", price: "10,90", desc: "Knuspriges Hähnchen, Coleslaw, Honig-Senf.", tags: [] },
    { cat: "vegan", emoji: "🌱", name: "Green Goal (vegan)", price: "10,50", desc: "Pflanzenpatty, vegane Mayo, Avocado, Rucola.", tags: ["vegan"], veg: true },
    { cat: "vegan", emoji: "🍄", name: "Veggie Portobello", price: "9,90", desc: "Gegrillter Portobello, gegrillte Paprika, Pesto.", tags: ["vegetarisch"], veg: true },
    { cat: "sides", emoji: "🍟", name: "Penalty Fries", price: "3,90", desc: "Knusprige Pommes mit Meersalz & Dip nach Wahl.", tags: [] },
    { cat: "sides", emoji: "🧀", name: "Loaded Cheese Fries", price: "5,90", desc: "Pommes, Cheddar-Sauce, Bacon-Bits, Frühlingszwiebeln.", tags: [] },
    { cat: "sides", emoji: "🧅", name: "Onion Rings", price: "4,50", desc: "Goldene Zwiebelringe im Bierteig.", tags: [] },
    { cat: "sides", emoji: "🥗", name: "House Salad", price: "5,50", desc: "Frischer Blattsalat, Cherrytomaten, Dressing.", tags: ["vegetarisch"], veg: true },
    { cat: "drinks", emoji: "🥤", name: "Hausgemachte Limo", price: "3,50", desc: "Zitrone-Minze oder Maracuja, frisch gemacht.", tags: [] },
    { cat: "drinks", emoji: "🥛", name: "Milkshake", price: "4,90", desc: "Vanille, Schoko oder Erdbeere – cremig & kalt.", tags: [] },
    { cat: "drinks", emoji: "🍺", name: "Craft Beer", price: "4,20", desc: "Wechselndes regionales Bier vom Fass.", tags: [] },
  ];

  const grid = $("#menuGrid");
  const renderMenu = (filter = "all") => {
    grid.innerHTML = "";
    MENU.filter((m) => filter === "all" || m.cat === filter || (filter === "vegan" && m.veg)).forEach((m) => {
      const card = document.createElement("article");
      card.className = "menu-card";
      const tags = (m.tags || [])
        .map((t) => {
          const cls = m.hot ? "tag tag--hot" : m.veg ? "tag tag--veg" : "tag";
          return `<span class="${cls}">${t}</span>`;
        })
        .join("");
      card.innerHTML = `
        <div class="menu-card__top">
          <span class="menu-card__emoji">${m.emoji}</span>
          <span class="menu-card__price">€&nbsp;${m.price}</span>
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
  renderMenu();

  $$(".menu__tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".menu__tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderMenu(tab.dataset.filter);
    });
  });

  /* ---------- Burger builder ---------- */
  const BASE = 5.9;
  const INGREDIENTS = [
    { id: "patty", label: "Patty", emoji: "🥩", price: 2.5 },
    { id: "kaese", label: "Käse", emoji: "🧀", price: 1.0 },
    { id: "bacon", label: "Bacon", emoji: "🥓", price: 1.5 },
    { id: "tomate", label: "Tomate", emoji: "🍅", price: 0.5 },
    { id: "zwiebel", label: "Zwiebeln", emoji: "🧅", price: 0.5 },
    { id: "ei", label: "Spiegelei", emoji: "🍳", price: 1.2 },
  ];
  const chosen = [];
  const chipsWrap = $("#builderChips");
  const stack = $("#builderStack");
  const priceEl = $("#builderPrice");

  const fmt = (n) => "€ " + n.toFixed(2).replace(".", ",");
  const renderStack = () => {
    stack.innerHTML = '<div class="bld-layer bun-top"></div><div class="bld-layer bun-bottom"></div>';
    const bunTop = $(".bun-top", stack);
    // insert chosen layers between top and bottom (column-reverse, so order matters)
    chosen.forEach((id) => {
      const layer = document.createElement("div");
      layer.className = "bld-layer " + id;
      stack.insertBefore(layer, bunTop);
    });
  };
  const updatePrice = () => {
    const total = BASE + chosen.reduce((s, id) => s + (INGREDIENTS.find((i) => i.id === id)?.price || 0), 0);
    priceEl.textContent = fmt(total);
  };

  INGREDIENTS.forEach((ing) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.innerHTML = `${ing.emoji} ${ing.label} <small>+${fmt(ing.price)}</small>`;
    chip.addEventListener("click", () => {
      const idx = chosen.indexOf(ing.id);
      if (idx >= 0) chosen.splice(idx, 1);
      else chosen.push(ing.id);
      chip.classList.toggle("active");
      renderStack();
      updatePrice();
    });
    chipsWrap.appendChild(chip);
  });
  renderStack();
  updatePrice();

  $("#builderAdd").addEventListener("click", () => {
    const extras = chosen.length ? chosen.length + " Extra(s)" : "ohne Extras";
    showToast(`Dein Burger (${extras}) liegt im Warenkorb – Bestellung folgt im Checkout.`);
  });

  /* ---------- Opening-hours status (demo) ---------- */
  // Platzhalter-Zeiten: [openHour, closeHour] je Wochentag (0=So)
  const HOURS = { 0: [12, 22], 1: [16, 22], 2: [16, 22], 3: [16, 22], 4: [16, 22], 5: [12, 23], 6: [12, 23] };
  const statusEl = $("#openStatus");
  if (statusEl) {
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const [o, c] = HOURS[now.getDay()];
    const open = h >= o && h < c;
    statusEl.textContent = open ? "● Jetzt geöffnet" : "● Aktuell geschlossen";
    statusEl.classList.add(open ? "open" : "closed");
  }

  /* ---------- Reservation form ---------- */
  const form = $("#reserveForm");
  const note = $("#formNote");
  // min date = today
  const dateInput = $("#rDate");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

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
    note.textContent = `Danke, ${name}! Deine Reservierungsanfrage ist eingegangen – wir melden uns per E-Mail.`;
    note.classList.add("ok");
    form.reset();
    showToast("Reservierung gesendet ✓ (Demo – keine echte Übertragung)");
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
