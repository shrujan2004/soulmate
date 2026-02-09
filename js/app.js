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
let userState = "";
let qIndex = 0;
let answers = {};

const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶", "Bold 😎", "Funny 😂"] },
  { q: "Attracted to?", o: ["Eyes 👀", "Mind 🧠", "Body 💪"] },
  { q: "Weekend?", o: ["Netflix 🍿", "Party 🕺", "Sleep 😴"] },
  { q: "Biggest green flag?", o: ["Respect 🙏", "Loyalty 💍", "Ambition 🔥"] },
  { q: "Late night mood?", o: ["Overthinking 🌙", "Music 🎧", "Reels 📱"] }
];

window.addEventListener("DOMContentLoaded", () => {
  render(introScreen());
  document.getElementById("continueBtn").onclick = startFlow;
});

function startFlow() {
  userName = nameInput.value;
  userAge = ageInput.value;
  userState = stateInput.value;

  if (!userName || !userAge || !userState) {
    alert("Fill all details 😌");
    return;
  }

  qIndex = 0;
  answers = {};
  showQuestion();
}

function showQuestion() {
  render(questionScreen(questions[qIndex].q, questions[qIndex].o));
  document.querySelectorAll(".optionBtn").forEach(btn => {
    btn.onclick = () => {
      answers[questions[qIndex].q] = btn.innerText;
      qIndex++;
      qIndex < questions.length ? showQuestion() : showVideo();
    };
  });
}

function showVideo() {
  render(searchingScreen(userState));
  const video = matchVideo;
  videoTapBtn.onclick = () => {
    videoTapBtn.style.display = "none";
    video.muted = false;
    video.play();
  };
  video.onended = showResult;
}

function showResult() {
  saveUser(userName, userAge, userState, answers).catch(() => {});
  render(resultWithFeedback(userName));
  submitFeedbackBtn.onclick = submitFeedback;
}

function submitFeedback() {
  if (!feedbackInput.value || !ratingInput.value) {
    alert("Give feedback 😇");
    return;
  }
  saveFeedback(userName, userAge, feedbackInput.value, ratingInput.value).catch(()=>{});
  alert("Thanks 💖");
}
