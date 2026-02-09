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
  render(introScreen());
});

window.saveUserInfo = async function () {
  userName = document.getElementById("nameInput").value;
  userAge = document.getElementById("ageInput").value;

  if (!userName || !userAge) {
    alert("Fill all details 😌");
    return;
  }

  await saveUser(userName, userAge);
  qIndex = 0;
  render(questionScreen(questions[0].q, questions[0].o));
};

window.nextQuestion = function () {
  qIndex++;
  if (qIndex < questions.length) {
    render(questionScreen(questions[qIndex].q, questions[qIndex].o));
  } else {
    render(searchingScreen());
  }
};

window.startVideoFromTap = function () {
  const video = document.getElementById("matchVideo");
  document.getElementById("videoTapBtn").style.display = "none";

  video.muted = false;
  video.volume = 0.9;
  video.play();

  video.onended = () => render(feedbackScreen());
};

window.submitFeedback = async function () {
  const feedback = document.getElementById("feedbackInput").value;
  const rating = document.getElementById("ratingInput").value;

  if (!feedback || !rating) {
    alert("Please fill feedback 😇");
    return;
  }

  await saveFeedback(userName, userAge, feedback, rating);
  render(resultScreen(userName));
};
