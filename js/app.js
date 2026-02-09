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
let safetyTimer;

function searchSoulmate() {
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  const skeleton = document.getElementById("videoSkeleton");
  const status = document.getElementById("videoStatus");

  let videoStarted = false;

  // 🔒 FAIL-SAFE: never freeze UI
  safetyTimer = setTimeout(() => {
    if (!videoStarted) {
      console.warn("Video slow → skipping to matchmaking");
      startMatchmaking();
    }
  }, 5000); // 5s max wait

  // When video can actually play
  video.addEventListener("canplay", () => {
    videoStarted = true;
    clearTimeout(safetyTimer);

    skeleton.classList.add("hidden");
    video.classList.remove("hidden");

    status.innerText = "Consulting Prabhu… 😇";
    video.volume = 0.9;
    video.play().catch(() => startMatchmaking());
  });

  // When video finishes fully
  video.addEventListener("ended", () => {
    startMatchmaking();
  });
}

function startMatchmaking() {
  clearTimeout(safetyTimer);
  render(matchmakingScreen());

  dialogueInterval = setInterval(() => {
    const el = document.getElementById("dialogueText");
    if (el) {
      el.textContent = dialogues[dialogueIndex % dialogues.length];
      dialogueIndex++;
    }
  }, 900);

  setTimeout(() => {
    clearInterval(dialogueInterval);
    render(resultScreen(userName));
  }, 4500);
}
