import { render } from "./interactions.js";
import {
  introScreen,
  questionScreen,
  searchingScreen,
  resultWithFeedback
} from "./screens.js";
import { saveUser, saveFeedback } from "./firebase.js";

let userName = "";
let userAge = "";
let qIndex = 0;

const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶", "Bold 😎", "Funny 😂"] },
   { q: "Your place?", o: ["Delhi", "Uttar Pradesh", "Chandigarh","Mumbai"] },
  { q: "Attracted to?", o: ["Eyes 👀", "Mind 🧠", "Body 💪"] },
  { q: "Weekend?", o: ["Netflix 🍿", "Party 🕺", "Sleep 😴"] }
];

window.addEventListener("DOMContentLoaded", showIntro);

function showIntro() {
  render(introScreen());
  document.getElementById("continueBtn").onclick = handleContinue;
}

function handleContinue() {
  userName = document.getElementById("nameInput").value;
  userAge = document.getElementById("ageInput").value;

  if (!userName || !userAge) {
    alert("Fill all details 😌");
    return;
  }

  // fire-and-forget
  saveUser(userName, userAge).catch(() => {});

  qIndex = 0;
  showQuestion();
}

function showQuestion() {
  render(questionScreen(questions[qIndex].q, questions[qIndex].o));
  document.querySelectorAll(".optionBtn").forEach(btn =>
    btn.onclick = nextQuestion
  );
}

function nextQuestion() {
  qIndex++;
  qIndex < questions.length ? showQuestion() : showVideo();
}

function showVideo() {
  render(searchingScreen());

  const video = document.getElementById("matchVideo");
  const btn = document.getElementById("videoTapBtn");

  btn.onclick = () => {
    btn.style.display = "none";
    video.muted = false;
    video.play();
  };

  video.onended = showResult;
}

function showResult() {
  render(resultWithFeedback(userName));
  document.getElementById("submitFeedbackBtn").onclick = submitFeedback;
}

function submitFeedback() {
  const feedback = document.getElementById("feedbackInput").value;
  const rating = document.getElementById("ratingInput").value;

  if (!feedback || !rating) {
    alert("Please give feedback 😇");
    return;
  }

  saveFeedback(userName, userAge, feedback, rating).catch(() => {});
  alert("Thanks! 💖");
}
