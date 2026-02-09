export const appDiv = document.getElementById("app");

export function render(html) {
  appDiv.innerHTML = html;
  appDiv.classList.remove("fade");
  void appDiv.offsetWidth;
  appDiv.classList.add("fade");
}
