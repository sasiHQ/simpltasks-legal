/* ============================================================
   SimplTasks Legal Center — Interactive Features
   - Back-to-top button
   - Hamburger menu toggle
   - TOC dropdown toggle + scroll-spy + pulse animation
   - Scroll-reveal animations (IntersectionObserver)
   - Accordion FAQ toggle
   - Floating updated badge visibility
   ============================================================ */

(function () {
  "use strict";

  // ── Hamburger Menu Toggle ──────────────────────────────
  var menuToggle = document.querySelector(".mobile-nav-toggle");
  var headerNav = document.querySelector(".header-nav");

  if (menuToggle && headerNav) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("open");
      headerNav.classList.toggle("open");
    });
    headerNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("open");
        headerNav.classList.remove("open");
      });
    });
    document.addEventListener("click", function (e) {
      if (!menuToggle.contains(e.target) && !headerNav.contains(e.target) && headerNav.classList.contains("open")) {
        menuToggle.classList.remove("open");
        headerNav.classList.remove("open");
      }
    });
  }

  // ── TOC Dropdown Toggle ─────────────────────────────────
  var tocDropdown = document.querySelector(".toc-dropdown-toggle");
  var tocList = document.querySelector(".toc-list");

  if (tocDropdown && tocList) {
    tocDropdown.addEventListener("click", function () {
      tocList.classList.toggle("open");
      tocDropdown.setAttribute("aria-expanded", tocList.classList.contains("open") ? "true" : "false");
    });
    tocList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        tocList.classList.remove("open");
        tocDropdown.setAttribute("aria-expanded", "false");
        tocDropdown.textContent = this.textContent.trim();
      });
    });
    document.addEventListener("click", function (e) {
      if (!tocDropdown.contains(e.target) && !tocList.contains(e.target) && tocList.classList.contains("open")) {
        tocList.classList.remove("open");
        tocDropdown.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── TOC Scroll-Spy with Pulse ──────────────────────────
  var tocLinks = document.querySelectorAll(".toc-list a");
  var contentHeadings = document.querySelectorAll(".content-card h2[id]");
  var prevActiveId = null;

  if (tocLinks.length > 0 && contentHeadings.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          tocLinks.forEach(function (link) {
            link.classList.remove("toc-active", "toc-pulse");
            if (link.getAttribute("href") === "#" + id) {
              link.classList.add("toc-active");
              if (prevActiveId !== id) {
                prevActiveId = id;
                setTimeout(function () { link.classList.add("toc-pulse"); }, 10);
                setTimeout(function () { link.classList.remove("toc-pulse"); }, 900);
              }
              if (tocDropdown) tocDropdown.textContent = link.textContent.trim();
            }
          });
        }
      });
    }, { rootMargin: "-70px 0px -55% 0px", threshold: 0 });
    contentHeadings.forEach(function (h) { observer.observe(h); });
  }

  // ── Scroll-Reveal Animation ────────────────────────────
  var revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -40px 0px", threshold: 0.05 });
    revealElements.forEach(function (el) { revealObserver.observe(el); });
  }

  // ── Accordion FAQ ──────────────────────────────────────
  var accordionTriggers = document.querySelectorAll(".accordion-trigger");
  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var item = this.parentElement;
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".accordion-item.open").forEach(function (other) {
        if (other !== item) other.classList.remove("open");
      });
      if (!isOpen) item.classList.add("open");
      else item.classList.remove("open");
    });
  });

  // ── Back-to-Top ───────────────────────────────────────
  var backToTopBtn = document.querySelector(".back-to-top");
  function updateBackToTop() {
    if (!backToTopBtn) return;
    if (window.scrollY > 600) backToTopBtn.classList.add("visible");
    else backToTopBtn.classList.remove("visible");
  }
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ── Floating Updated Badge ─────────────────────────────
  // (reserved for future use — no element currently uses this class)
  function updateFloatingBadge() {
    var floatingBadge = document.querySelector(".floating-updated");
    if (!floatingBadge) return;
    if (window.scrollY > 500) floatingBadge.classList.add("hidden");
    else floatingBadge.classList.remove("hidden");
  }

  // ── Active Nav Detection ───────────────────────────────
  (function () {
    var currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    document.querySelectorAll(".header-nav a").forEach(function (link) {
      var linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, "") || "/";
      if (linkPath === currentPath) link.classList.add("active");
    });
  })();

  // ── Smooth Scroll for TOC Links ───────────────────────
  tocLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        var target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // ── Combined Scroll Handler (rAF debounced) ────────────
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateBackToTop();
        updateFloatingBadge();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateBackToTop();
  updateFloatingBadge();
})();