/* ADNS Lab — site interactions (no dependencies) */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme toggle ---------- */
  function currentTheme() {
    var t = doc.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var tbtn = document.getElementById("theme-toggle");
  if (tbtn) {
    tbtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      doc.setAttribute("data-theme", next);
      try { localStorage.setItem("adns-theme", next); } catch (e) {}
    });
  }

  /* ---------- header + mobile nav ---------- */
  var header = document.getElementById("site-header");
  var toTop = document.getElementById("to-top");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  var burger = document.getElementById("nav-burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      a.addEventListener("click", function () { document.body.classList.remove("nav-open"); burger.setAttribute("aria-expanded", "false"); });
    });
  }
  document.querySelectorAll(".sub-toggle").forEach(function (b) {
    b.addEventListener("click", function () {
      var menu = b.nextElementSibling;
      var open = menu.classList.toggle("open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) { document.body.classList.remove("nav-open"); if (burger) burger.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- animated counters ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target) || reduceMotion) { return; }
    var start = null, dur = 1400;
    el.textContent = "0";
    function step(ts) {
      if (!start) start = ts;
      var k = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (k < 1) requestAnimationFrame(step);
    }
    var started = false;
    function go() { if (!started) { started = true; requestAnimationFrame(step); } }
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { go(); cio.disconnect(); } });
      cio.observe(el);
    } else { go(); }
  });

  /* ---------- network canvas (hero backgrounds) ---------- */
  function NetCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var nodes = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -9999, y: -9999 };
    var running = true, raf = null;
    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, Math.max(24, (W * H) / 16000)));
      nodes = [];
      for (var i = 0; i < n; i++) {
        nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
                     r: Math.random() * 1.8 + 1.1, hub: Math.random() < .08 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var maxD = 130, i, j, a, b, dx, dy, d;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
        if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;
        var mdx = a.x - mouse.x, mdy = a.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 120) { a.x += mdx / md * .6; a.y += mdy / md * .6; }
      }
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < maxD * maxD) {
            d = Math.sqrt(d);
            ctx.strokeStyle = "rgba(165,180,252," + (0.32 * (1 - d / maxD)).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        ctx.fillStyle = a.hub ? "rgba(94,234,212,.95)" : "rgba(199,210,254,.85)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.hub ? a.r + 1.6 : a.r, 0, Math.PI * 2); ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    resize();
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
    var host = canvas.parentElement;
    host.addEventListener("pointermove", function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    host.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        var vis = en[0].isIntersecting;
        if (vis && !running) { running = true; raf = requestAnimationFrame(draw); }
        if (!vis) { running = false; if (raf) cancelAnimationFrame(raf); }
      }).observe(canvas);
    }
    draw();
  }
  if (!reduceMotion) document.querySelectorAll(".net-canvas").forEach(function (c) { try { NetCanvas(c); } catch (e) {} });

  /* ---------- post: TOC + scroll spy + copy buttons ---------- */
  var toc = document.getElementById("toc"), content = document.getElementById("post-content");
  if (toc && content) {
    var heads = content.querySelectorAll("h2[id], h3[id]");
    var links = [];
    heads.forEach(function (h) {
      if (h.closest(".paper-card")) return;
      var a = document.createElement("a");
      a.href = "#" + h.id; a.textContent = h.textContent; a.className = "lvl-" + h.tagName.substring(1);
      toc.appendChild(a); links.push({ a: a, h: h });
    });
    if (!links.length) toc.parentElement.style.display = "none";
    if ("IntersectionObserver" in window && links.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.a.classList.toggle("active", l.h === en.target); });
          }
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      links.forEach(function (l) { spy.observe(l.h); });
    }
    content.querySelectorAll("pre").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "copy-btn"; btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code"); var txt = (code || pre).innerText.replace(/\nCopy$/, "");
        copyText(txt).then(function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1500); });
      });
      pre.appendChild(btn);
    });
  }

  /* ---------- BibTeX dialog (shared) ---------- */
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t);
    return new Promise(function (res) {
      var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); res();
    });
  }
  window.ADNS = window.ADNS || {};
  window.ADNS.copyText = copyText;
  function bibEscape(s) { return String(s || "").replace(/([&%$#_])/g, "\\$1"); }
  function toBib(d) {
    var type = { journal: "article", conference: "inproceedings", chapter: "incollection", thesis: "phdthesis", preprint: "article", dataset: "misc", abstract: "inproceedings" }[d.type] || "misc";
    var authors = String(d.authors || "").replace(/,?\s*et al\.?$/, " and others").split(/,\s*/).join(" and ").replace(/ and and /g, " and ");
    var venueField = type === "article" ? "journal" : (type === "inproceedings" || type === "incollection") ? "booktitle" : type === "phdthesis" ? "school" : "howpublished";
    var lines = ["@" + type + "{" + d.key + ","];
    lines.push("  title     = {{" + bibEscape(d.title) + "}},");
    lines.push("  author    = {" + bibEscape(authors) + "},");
    if (d.venue) lines.push("  " + (venueField + "          ").slice(0, 9) + " = {" + bibEscape(d.venue) + "},");
    lines.push("  year      = {" + d.year + "},");
    if (d.doi) lines.push("  doi       = {" + d.doi + "},");
    if (d.doi) lines.push("  url       = {https://doi.org/" + d.doi + "},");
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
    lines.push("}");
    return lines.join("\n");
  }
  window.ADNS.toBib = toBib;
  var modal = document.getElementById("bib-modal");
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".js-bib");
    if (!b) return;
    var li = b.closest("[data-bib]");
    if (!li) return;
    var d; try { d = JSON.parse(li.getAttribute("data-bib")); } catch (err) { return; }
    var txt = toBib(d);
    if (modal && typeof modal.showModal === "function") {
      document.getElementById("bib-modal-code").textContent = txt;
      modal.showModal();
    } else {
      copyText(txt).then(function () { b.innerHTML = '<i class="fa-solid fa-check"></i> Copied'; });
    }
  });
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal || (e.target.closest && e.target.closest("[data-close]"))) modal.close(); });
    var cb = document.getElementById("bib-copy");
    if (cb) cb.addEventListener("click", function () {
      copyText(document.getElementById("bib-modal-code").textContent).then(function () {
        cb.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        setTimeout(function () { cb.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }, 1600);
      });
    });
  }

  /* ---------- generic chip filter (blog, software) ---------- */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var target = document.querySelector(group.getAttribute("data-filter-group"));
    if (!target) return;
    group.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip"); if (!chip) return;
      group.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      var v = chip.getAttribute("data-value");
      target.querySelectorAll("[data-tags]").forEach(function (item) {
        var show = v === "all" || (" " + item.getAttribute("data-tags") + " ").indexOf(" " + v + " ") > -1;
        item.classList.toggle("is-hidden", !show);
      });
    });
  });
})();
