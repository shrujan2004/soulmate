console.log("APP LOADED");

window.addEventListener("DOMContentLoaded", () => {
  render(introScreen());
});

let userName = "";
let qIndex = 0;

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
    q: "Perfect weekend?",
    o: ["Netflix & chill 🍿", "Party all night 🕺", "Sleep 😴"]
  },
  {
    q: "Biggest turn-on?",
    o: ["Respect 🙏", "Humor 😄", "Ambition 🔥"]
  }
];

function saveUserInfo() {
  const nameEl = document.getElementById("nameInput");
  const ageEl = document.getElementById("ageInput");

  if (!nameEl.value || !ageEl.value) {
    alert("Please fill all details 😌");
    return;
  }

  userName = nameEl.value;
  qIndex = 0;
  showQuestion();
}

function showQuestion() {
  render(questionScreen(questions[qIndex].q, questions[qIndex].o));
}

function nextQuestion() {
  qIndex++;
  if (qIndex < questions.length) {
    showQuestion();
  } else {
    startVideo();
  }
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
