export const appDiv = document.getElementById("app");

export function render(html) {
  appDiv.innerHTML = html;
}
