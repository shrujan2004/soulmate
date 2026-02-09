import { render } from "./interactions.js";
import {
  introScreen, questionScreen, searchingScreen, resultWithFeedback
} from "./screens.js";
import { saveUser, saveFeedback } from "./firebase.js";

let userName="", userAge="", userState="", qIndex=0, rating=0;
let answers = {};

const questions = [
  { q: "Your ideal vibe?", o: ["Soft 🫶","Bold 😎","Funny 😂"] },
  { q: "Weekend?", o: ["Netflix 🍿","Party 🕺","Sleep 😴"] },
  { q: "Late night mood?", o: ["Overthinking 🌙","Music 🎧","Reels 📱"] },

  // 🔥 ADD THESE BELOW
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

function showIntro() {
  render(introScreen());
  setupDropdown("ageDropdown","ageLabel","ageInput");
  setupDropdown("stateDropdown","stateLabel","stateInput");
  continueBtn.onclick = startFlow;
}

function setupDropdown(id,labelId,inputId){
  const d=document.getElementById(id);
  const label=document.getElementById(labelId);
  const hidden=document.getElementById(inputId);

  d.querySelector(".dropdown-btn").onclick=()=>d.classList.toggle("open");
  d.querySelectorAll(".dropdown-item").forEach(i=>{
    i.onclick=()=>{ label.textContent=i.textContent; hidden.value=i.textContent; d.classList.remove("open"); }
  });
}

function startFlow(){
  userName=nameInput.value;
  userAge=ageInput.value;
  userState=stateInput.value;
  if(!userName||!userAge||!userState) return alert("Fill all details 😌");
  qIndex=0; answers={}; showQuestion();
}

function showQuestion(){
  render(questionScreen(questions[qIndex].q, questions[qIndex].o));
  document.querySelectorAll(".optionBtn").forEach(btn=>{
    btn.onclick=()=>{
      answers[questions[qIndex].q]=btn.innerText;
      ++qIndex < questions.length ? showQuestion() : showVideo();
    };
  });
}

function showVideo(){
  render(searchingScreen(userState));
  videoTapBtn.onclick=()=>{ videoTapBtn.style.display="none"; matchVideo.muted=false; matchVideo.play(); };
  matchVideo.onended=showResult;
}

function showResult(){
  saveUser(userName,userAge,userState,answers).catch(()=>{});
  render(resultWithFeedback(userName));
  document.querySelectorAll(".star").forEach(s=>{
    s.onclick=()=>{
      rating=+s.dataset.value;
      document.querySelectorAll(".star").forEach(x=>x.classList.toggle("active",+x.dataset.value<=rating));
    };
  });
  submitFeedbackBtn.onclick=submitFeedback;
}

function submitFeedback(){
  if(!feedbackInput.value||!rating) return alert("Give rating & feedback 😇");
  saveFeedback(userName,userAge,feedbackInput.value,rating).catch(()=>{});
  alert("Thanks 💖");
}
