console.log("APP LOADED");

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");
  render(introScreen());
});

let userName = "";

function saveUserInfo() {
  const nameEl = document.getElementById("nameInput");
  const ageEl = document.getElementById("ageInput");

  if (!nameEl.value || !ageEl.value) {
    alert("Please fill all details 😌");
    return;
  }

  userName = nameEl.value;
  startVideo();
}

function startVideo() {
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  const status = document.getElementById("videoStatus");

  video.volume = 0.9;

  video.addEventListener("canplay", () => {
    status.innerText = "Consulting Prabhu… 😇";
    video.play();
  });

  video.addEventListener("ended", () => {
    render(resultScreen(userName));
  });
}
