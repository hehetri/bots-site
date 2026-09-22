document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector(".design-stage");
  const language = document.querySelector(".header-hotspot .language");

  document.querySelectorAll(".hotspot-link").forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target || target === stage) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  language?.addEventListener("click", () => {
    const languages = ["EN", "PT", "ES", "ZH", "JA", "KO", "ID"];
    const current = language.dataset.lang || "EN";
    const next = languages[(languages.indexOf(current) + 1) % languages.length];
    language.dataset.lang = next;
    language.setAttribute("aria-label", `Language: ${next}. Language selector will be connected in the next phase.`);
  });
});