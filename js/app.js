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
let rating = 0;
let answers = {};

// South India states
const southStates = [
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Telangana",
  "Andhra Pradesh"
];

// Questions
const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶","Bold 😎","Funny 😂"] },
  { q: "Weekend?", o: ["Netflix 🍿","Party 🕺","Sleep 😴"] },
  { q: "Late night mood?", o: ["Overthinking 🌙","Music 🎧","Reels 📱"] },
  { q: "First thing you notice in someone?", o: ["Eyes 👀","Smile 😄","Confidence 😎"] },
  { q: "Your toxic trait?", o: ["Overthinking 🧠","Ghosting 👻","Jealous 😤"] },
  { q: "Biggest turn-on?", o: ["Respect 🙏","Humor 😂","Ambition 🔥"] },
  { q: "Ideal first date?", o: ["Coffee ☕","Long drive 🚗","Movie 🍿"] },
  { q: "How do you handle fights?", o: ["Silent 😶","Talk it out 🗣️","Ignore 🚶"] },
  { q: "Most used app at night?", o: ["Instagram 📱","Spotify 🎧","YouTube ▶️"] },
  { q: "Your love language?", o: ["Time ⏳","Words 💬","Gifts 🎁"] },
  { q: "Relationship status energy?", o: ["Hopeless romantic 💖","Chill 😌","Emotionally unavailable 🧱"] },
  { q: "Red flag you ignore?", o: ["Late replies ⏰","Mood swings 🌪️","Too secretive 🕵️"] },
  { q: "What scares you in love?", o: ["Getting hurt 💔","Commitment 😬","Losing freedom 🕊️"] }
];

window.onload = showIntro;

/* ---------------- INTRO ---------------- */

function showIntro() {
  render(introScreen());
  setupDropdown("ageDropdown", "ageLabel", "ageInput");
  setupDropdown("stateDropdown", "stateLabel", "stateInput");
  continueBtn.onclick = startFlow;
}

function setupDropdown(id, labelId, inputId) {
  const dropdown = document.getElementById(id);
  const label = document.getElementById(labelId);
  const hidden = document.getElementById(inputId);

  dropdown.querySelector(".dropdown-btn").onclick = () =>
    dropdown.classList.toggle("open");

  dropdown.querySelectorAll(".dropdown-item").forEach(item => {
    item.onclick = () => {
      label.textContent = item.textContent;
      hidden.value = item.textContent;
      dropdown.classList.remove("open");
    };
  });
}

/* ---------------- QUESTIONS ---------------- */

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

/* ---------------- VIDEO ---------------- */

function showVideo() {
  render(searchingScreen(userState));

  const video = document.getElementById("matchVideo");
  const tapBtn = document.getElementById("videoTapBtn");

  video.src = southStates.includes(userState)
    ? "./assets/videos/south.mp4"
    : "./assets/videos/heaven.mp4";

  tapBtn.onclick = () => {
    tapBtn.style.display = "none";
    video.muted = false;
    video.play();
  };

  video.onended = showResult;
}

/* ---------------- RESULT ---------------- */

function showResult() {
  saveUser(userName, userAge, userState, answers).catch(() => {});
  render(resultWithFeedback(userName));

  setupScratch();
  setupStars();
  submitFeedbackBtn.onclick = submitFeedback;
}

/* ---------------- SCRATCH REVEAL ---------------- */

function setupScratch() {
  const canvas = document.getElementById("scratchCanvas");
  const img = document.getElementById("soulmateImg");
  const ctx = canvas.getContext("2d");

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "destination-out";

  let scratching = false;
  let scratchedCount = 0;

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - r.left,
        y: e.touches[0].clientY - r.top
      };
    }
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  }

  function scratch(e) {
    if (!scratching) return;
    const { x, y } = getPos(e);

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    scratchedCount++;
    if (scratchedCount > 120) {
      canvas.style.display = "none";
      img.classList.add("revealed");
    }
  }

  // Mouse
  canvas.addEventListener("mousedown", e => {
    scratching = true;
    scratch(e);
  });
  canvas.addEventListener("mouseup", () => scratching = false);
  canvas.addEventListener("mouseleave", () => scratching = false);
  canvas.addEventListener("mousemove", scratch);

  // Touch
  canvas.addEventListener("touchstart", e => {
    scratching = true;
    scratch(e);
  }, { passive: false });

  canvas.addEventListener("touchend", () => scratching = false);
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    scratch(e);
  }, { passive: false });
}

/* ---------------- STARS ---------------- */

function setupStars() {
  rating = 0;
  document.querySelectorAll(".star").forEach(star => {
    star.onclick = () => {
      rating = Number(star.dataset.value);
      document.querySelectorAll(".star").forEach(s =>
        s.classList.toggle("active", Number(s.dataset.value) <= rating)
      );
    };
  });
}

/* ---------------- FEEDBACK ---------------- */

function submitFeedback() {
  if (!feedbackInput.value || !rating) {
    alert("Give rating & feedback 😇");
    return;
  }

  saveFeedback(userName, userAge, feedbackInput.value, rating).catch(() => {});
  alert("Thanks 💖");
}
