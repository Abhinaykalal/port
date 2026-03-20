const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = [...document.querySelectorAll(".nav-links a")];
const revealItems = document.querySelectorAll("[data-reveal]");
const sections = [...document.querySelectorAll("main section[id]")];
const form = document.querySelector(".contact-form");
const statusText = document.querySelector(".form-status");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const setActiveLink = () => {
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 180 && rect.bottom >= 180;
  });

  links.forEach((link) => {
    const matches = current && link.getAttribute("href") === `#${current.id}`;
    link.classList.toggle("is-active", Boolean(matches));
  });
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
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

if (form && statusText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.querySelector("#name")?.value.trim() || "there";
    statusText.textContent = `Thanks ${name}, your message is ready to send.`;
    form.reset();
  });
}
