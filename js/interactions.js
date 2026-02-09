const app = document.getElementById("app");

function render(html) {
  app.innerHTML = html;
  app.classList.remove("fade");
  void app.offsetWidth;
  app.classList.add("fade");
}

function vibrate(ms = 30) {
  navigator.vibrate?.(ms);
}
