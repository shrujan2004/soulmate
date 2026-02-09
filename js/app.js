let userName = "";
let userAge = "";

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

const dialogues = [
  "Prabhu… aapne toh kaha tha ye single maregi…",
  "Par abhi yahan aa gayi kaam badhane.",
  "Register update karna padega.",
  "Universe thoda confused hai.",
  "Mil gaya… shayad."
];

let dialogueIndex = 0;
let dialogueInterval;

render(introScreen());

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

function searchSoulmate() {
  vibrate();
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  if (video) {
    video.volume = 0.9;
    video.play().catch(() => {});
  }

  dialogueInterval = setInterval(() => {
    const el = document.getElementById("dialogueText");
    if (el) {
      el.textContent = dialogues[dialogueIndex % dialogues.length];
      dialogueIndex++;
    }
  }, 900);

  setTimeout(() => {
    clearInterval(dialogueInterval);
    stopVideo();
    render(resultScreen(userName));
    vibrate(120);
  }, 6500);
}
