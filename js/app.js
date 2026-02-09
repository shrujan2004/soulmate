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
let userAnswers = {}; // 🔥 NEW

const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶", "Bold 😎", "Funny 😂"] },
  { q: "Your place?", o: ["Delhi", "Bangalore", "Chandigarh", "Mumbai"] },
  { q: "Attracted to?", o: ["Eyes 👀", "Mind 🧠", "Body 💪"] },
  { q: "Weekend?", o: ["Netflix 🍿", "Party 🕺", "Sleep 😴"] },
  { q: "Biggest red flag?", o: ["Lies ❌", "Anger 😡", "Ego 🧱"] },
  { q: "Biggest green flag?", o: ["Respect 🙏", "Loyalty 💍", "Ambition 🔥"] },
  { q: "Love language?", o: ["Time ⏳", "Gifts 🎁", "Words 💬"] },
  { q: "Late night mood?", o: ["Overthinking 🌙", "Music 🎧", "Reels 📱"] }
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

  qIndex = 0;
  userAnswers = {}; // reset for safety
  showQuestion();
}

function showQuestion() {
  render(questionScreen(questions[qIndex].q, questions[qIndex].o));

  document.querySelectorAll(".optionBtn").forEach(btn => {
    btn.onclick = () => {
      // 🔥 STORE ANSWER
      userAnswers[questions[qIndex].q] = btn.innerText;
      nextQuestion();
    };
  });
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
  // 🔥 SAVE USER + ANSWERS (FIRE & FORGET)
  saveUser(userName, userAge, userAnswers).catch(() => {});

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
