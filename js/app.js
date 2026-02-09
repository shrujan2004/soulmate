let userName = "You";

const dialogues = [
  "Prabhu… aapne toh kaha tha ye single maregi…",
  "Par abhi yahan aa gayi kaam badhane.",
  "Register update karna padega.",
  "Universe thoda confused hai.",
  "Mil gaya… shayad."
];

let dialogueIndex = 0;
let dialogueInterval;

// ENTRY POINT – call this after questions
function searchSoulmate() {
  vibrate();
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  const status = document.getElementById("videoStatus");

  // When enough video is loaded
  video.addEventListener("loadeddata", () => {
    status.innerText = "Accessing heaven database…";
    video.volume = 0.9;
    video.play().catch(() => {});
  });

  // WHEN VIDEO COMPLETES
  video.addEventListener("ended", () => {
    startMatchmaking();
  });
}

// MATCHMAKING STARTS ONLY AFTER VIDEO END
function startMatchmaking() {
  render(matchmakingScreen());

  dialogueInterval = setInterval(() => {
    const el = document.getElementById("dialogueText");
    if (el) {
      el.textContent = dialogues[dialogueIndex % dialogues.length];
      dialogueIndex++;
    }
  }, 900);

  // After matchmaking → final reveal
  setTimeout(() => {
    clearInterval(dialogueInterval);
    render(resultScreen(userName));
    vibrate(120);
  }, 4500);
}
