document.addEventListener("DOMContentLoaded", () => {
  const time = document.querySelector("#server-time");
  const language = document.querySelector(".language");
  const menu = document.querySelector("#language-menu");

  function updateTime() {
    if (!time) return;
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: false,
      timeZoneName: "short"
    }).format(now).replace("GMT", "UTC");
    time.textContent = formatted;
  }

  updateTime();
  setInterval(updateTime, 30000);

  document.querySelectorAll(".nav-item").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  language?.addEventListener("click", () => {
    const open = language.getAttribute("aria-expanded") === "true";
    language.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });

  menu?.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
      language.querySelector("span:nth-child(2)").textContent =
        button.textContent.trim().slice(0, 2).toUpperCase();
      language.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    });
  });

  document.addEventListener("click", event => {
    if (!menu || menu.hidden || menu.contains(event.target) || language.contains(event.target)) return;
    menu.hidden = true;
    language.setAttribute("aria-expanded", "false");
  });
});