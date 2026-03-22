const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const themeToggle = document.querySelector(".theme-toggle");
const heroVisual = document.querySelector(".hero-visual");
const floatingCards = [...document.querySelectorAll(".floating-card")];
const form = document.querySelector(".contact-form");
const statusText = document.querySelector(".form-status");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const setActiveLink = () => {
  const currentSection = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 180 && rect.bottom >= 180;
  });

  navItems.forEach((link) => {
    const isMatch = currentSection && link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("is-active", Boolean(isMatch));
  });
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  revealObserver.observe(item);
});

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-alt");
  });
}

if (heroVisual) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;

    floatingCards.forEach((card, index) => {
      const factor = (index + 1) * 0.45;
      card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  heroVisual.addEventListener("pointerleave", () => {
    floatingCards.forEach((card) => {
      card.style.transform = "";
    });
  });
}

if (form && statusText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("#name")?.value.trim() || "there";
    statusText.textContent = `Thanks ${name}, your message is ready to send.`;
    form.reset();
  });
}
