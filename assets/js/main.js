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
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

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
    el.style.transitionDelay = (i % 5) * 70 + "ms";
    io.observe(el);
  });

  /* ---------- Hero embers ---------- */
  const embers = $("#embers");
  if (embers && !reduceMotion) {
    const N = 16;
    for (let i = 0; i < N; i++) {
      const e = document.createElement("span");
      e.className = "ember";
      const size = 2 + Math.random() * 4;
      e.style.left = Math.random() * 100 + "%";
      e.style.width = e.style.height = size + "px";
      e.style.setProperty("--drift", (Math.random() * 60 - 30) + "px");
      e.style.animationDuration = 6 + Math.random() * 7 + "s";
      e.style.animationDelay = -Math.random() * 10 + "s";
      embers.appendChild(e);
    }
  }

  /* ---------- Hero emblem parallax ---------- */
  const heroEmblem = $("#heroEmblem");
  if (heroEmblem && !reduceMotion) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      heroEmblem.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------- Toast (for data-toast links) ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toastEl.innerHTML = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3600);
  }
  $$("[data-toast]").forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      showToast(el.dataset.toast);
    })
  );
})();
