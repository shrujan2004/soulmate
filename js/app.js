let userName = "";
let userAge = "";

// QUESTIONS
const questions = [
  {
    q: "Your ideal vibe?",
    o: ["Soft & caring 🫶", "Bold & confident 😎", "Funny & chill 😂"]
  },
  {
    q: "What attracts you first?",
    o: ["Eyes 👀", "Personality 🧠", "Body 💪"]
  },
  {
    q: "Weekend plan?",
    o: ["Netflix & cuddle 🍿", "Party all night 🕺", "Sleep 😴"]
  },
  {
    q: "Biggest turn-on?",
    o: ["Respect 🙏", "Humor 😄", "Ambition 🔥"]
  }
];

let qIndex = 0;

// DIALOGUES
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

/* 🔥 THIS IS THE MOST IMPORTANT LINE 🔥
   THIS MUST RUN ON PAGE LOAD */
render(introScreen());

/* =============================
   INTRO → SAVE USER
============================= */
function saveUserInfo() {
  userName = document.getElementById("nameInput").value;
  userAge = document.getElementById("ageInput").value;

  if (!userName || !userAge) {
    alert("Fill all details 😌");
    return;
  }

  vibrate();
  render(revealScreen(userName));
}

/* =============================
   QUESTIONS FLOW
============================= */
function showQuestion(i) {
  qIndex = i;
  vibrate();
  render(questionScreen(questions[i].q, questions[i].o));
}

function nextQuestion() {
  vibrate();
  qIndex++;

  if (qIndex < questions.length) {
    showQuestion(qIndex);
  } else {
    searchSoulmate();
  }
}

/* =============================
   VIDEO + MATCHMAKING
============================= */
function searchSoulmate() {
  vibrate();
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  const skeleton = document.getElementById("videoSkeleton");
  const status = document.getElementById("videoStatus");

  let videoStarted = false;

  // FAIL-SAFE (never freeze)
  safetyTimer = setTimeout(() => {
    if (!videoStarted) {
      startMatchmaking();
    }
  }, 5000);

  video.addEventListener("canplay", () => {
    videoStarted = true;
    clearTimeout(safetyTimer);

    skeleton.classList.add("hidden");
    video.classList.remove("hidden");

    status.innerText = "Consulting Prabhu… 😇";
    video.volume = 0.9;
    video.play().catch(startMatchmaking);
  });

  video.addEventListener("ended", startMatchmaking);
}

/* =============================
   FINAL FLOW
============================= */
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
    vibrate(120);
  }, 4500);
}
