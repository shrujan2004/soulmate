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
  "Andhra Pradesh",
  "Karnataka",
  "Kerala",
  "Tamil Nadu",
  "Telangana"
];

// All Indian states + UTs
const allStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal",
  "Delhi","Chandigarh","Puducherry","Jammu & Kashmir","Ladakh",
  "Lakshadweep","Andaman & Nicobar Islands",
  "Dadra & Nagar Haveli and Daman & Diu"
];

// 🔥 ALL QUESTIONS (INCLUDING YOUR EXTRA ONES)
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
  render(introScreen(allStates));
  continueBtn.onclick = startFlow;
}

/* ---------------- QUESTIONS FLOW ---------------- */

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
  const canvas = scratchCanvas;
  const img = soulmateImg;
  const ctx = canvas.getContext("2d");

  const r = img.getBoundingClientRect();
  canvas.width = r.width;
  canvas.height = r.height;

  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = "destination-out";

  let scratching = false;
  let count = 0;

  function pos(e) {
    const b = canvas.getBoundingClientRect();
    return e.touches
      ? { x: e.touches[0].clientX - b.left, y: e.touches[0].clientY - b.top }
      : { x: e.clientX - b.left, y: e.clientY - b.top };
  }

  function scratch(e) {
    if (!scratching) return;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    if (++count > 120) {
      canvas.remove();
      img.classList.add("revealed");
    }
  }

  canvas.onmousedown = e => { scratching = true; scratch(e); };
  canvas.onmousemove = scratch;
  canvas.onmouseup = () => scratching = false;
  canvas.onmouseleave = () => scratching = false;

  canvas.addEventListener("touchstart", e => {
    scratching = true;
    scratch(e);
  }, { passive: false });

  canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    scratch(e);
  }, { passive: false });

  canvas.addEventListener("touchend", () => scratching = false);
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
