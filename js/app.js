import { render } from "./interactions.js";
import {
  introScreen,
  questionScreen,
  searchingScreen,
  feedbackScreen,
  resultScreen
} from "./screens.js";
import { saveUser, saveFeedback } from "./firebase.js";

let userName = "";
let userAge = "";
let qIndex = 0;

const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶", "Bold 😎", "Funny 😂"] },
  { q: "Attracted to?", o: ["Eyes 👀", "Mind 🧠", "Body 💪"] },
  { q: "Weekend?", o: ["Netflix 🍿", "Party 🕺", "Sleep 😴"] },
  { q: "Turn-on?", o: ["Respect 🙏", "Humor 😄", "Ambition 🔥"] }
];

window.addEventListener("DOMContentLoaded", () => {
  showIntro();
});

function showIntro() {
  render(introScreen());
  document.getElementById("continueBtn").onclick = handleContinue;
}

async function handleContinue() {
  userName = document.getElementById("nameInput").value;
  userAge = document.getElementById("ageInput").value;

  if (!userName || !userAge) {
    alert("Fill all details 😌");
    return;
  }

  await saveUser(userName, userAge);
  qIndex = 0;
  showQuestion();
}

function showQuestion() {
  render(questionScreen(questions[qIndex].q, questions[qIndex].o));
  document.querySelectorAll(".optionBtn").forEach(btn => {
    btn.onclick = nextQuestion;
  });
}

function nextQuestion() {
  qIndex++;
  if (qIndex < questions.length) {
    showQuestion();
  } else {
    showVideo();
  }
}

function showVideo() {
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  const btn = document.getElementById("videoTapBtn");

  btn.onclick = () => {
    btn.style.display = "none";
    video.muted = false;
    video.volume = 0.9;
    video.play();
  };

  video.onended = showFeedback;
}

function showFeedback() {
  render(feedbackScreen());
  document.getElementById("submitFeedbackBtn").onclick = submitFeedback;
}

async function submitFeedback() {
  const feedback = document.getElementById("feedbackInput").value;
  const rating = document.getElementById("ratingInput").value;

  if (!feedback || !rating) {
    alert("Please give feedback 😇");
    return;
  }

  await saveFeedback(userName, userAge, feedback, rating);
  render(resultScreen(userName));
}
