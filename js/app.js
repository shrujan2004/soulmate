window.addEventListener("DOMContentLoaded", () => {
  render(introScreen());
});

let userName = "";
let qIndex = 0;

const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶", "Bold 😎", "Funny 😂"] },
  { q: "What attracts you first?", o: ["Eyes 👀", "Mind 🧠", "Body 💪"] },
  { q: "Perfect weekend?", o: ["Netflix 🍿", "Party 🕺", "Sleep 😴"] },
  { q: "Biggest turn-on?", o: ["Respect 🙏", "Humor 😄", "Ambition 🔥"] }
];

function saveUserInfo() {
  const name = document.getElementById("nameInput").value;
  const age = document.getElementById("ageInput").value;

  if (!name || !age) {
    alert("Fill all details 😌");
    return;
  }

  userName = name;
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
    render(searchingScreen());
  }
}

/* 🔊 USER TAP = VIDEO + SOUND (MOBILE SAFE) */
function startVideoFromTap() {
  const video = document.getElementById("matchVideo");
  const btn = document.getElementById("videoTapBtn");
  const status = document.getElementById("videoStatus");

  btn.style.display = "none";
  status.innerText = "Consulting Prabhu… 😇";

  video.muted = false;
  video.volume = 0.9;
  video.play();

  video.addEventListener("ended", () => {
    render(resultScreen(userName));
  });
}
