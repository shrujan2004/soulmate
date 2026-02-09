import { render } from "./interactions.js";
import {
  introScreen, questionScreen, searchingScreen, resultWithFeedback
} from "./screens.js";
import { saveUser, saveFeedback } from "./firebase.js";

let userName="", userAge="", userState="", qIndex=0, rating=0;
let answers={};

const southStates=["Karnataka","Kerala","Tamil Nadu","Telangana","Andhra Pradesh"];

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


window.onload=showIntro;

function showIntro(){
  render(introScreen());
  setupDropdown("ageDropdown","ageLabel","ageInput");
  setupDropdown("stateDropdown","stateLabel","stateInput");
  continueBtn.onclick=startFlow;
}

function setupDropdown(id,labelId,inputId){
  const d=document.getElementById(id);
  const label=document.getElementById(labelId);
  const hidden=document.getElementById(inputId);
  d.querySelector(".dropdown-btn").onclick=()=>d.classList.toggle("open");
  d.querySelectorAll(".dropdown-item").forEach(i=>{
    i.onclick=()=>{label.textContent=i.textContent;hidden.value=i.textContent;d.classList.remove("open");};
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
  render(questionScreen(questions[qIndex].q,questions[qIndex].o));
  document.querySelectorAll(".optionBtn").forEach(btn=>{
    btn.onclick=()=>{
      answers[questions[qIndex].q]=btn.innerText;
      ++qIndex<questions.length?showQuestion():showVideo();
    };
  });
}

function showVideo(){
  render(searchingScreen(userState));
  const video=matchVideo;
  video.src=southStates.includes(userState)
    ? "./assets/videos/south.mp4"
    : "./assets/videos/heaven.mp4";

  videoTapBtn.onclick=()=>{videoTapBtn.style.display="none";video.muted=false;video.play();};
  video.onended=showResult;
}

function showResult(){
  saveUser(userName,userAge,userState,answers).catch(()=>{});
  render(resultWithFeedback(userName));
  setupScratch();
  document.querySelectorAll(".star").forEach(s=>{
    s.onclick=()=>{
      rating=+s.dataset.value;
      document.querySelectorAll(".star").forEach(x=>x.classList.toggle("active",+x.dataset.value<=rating));
    };
  });
  submitFeedbackBtn.onclick=submitFeedback;
}

function setupScratch(){
  const c=scratchCanvas, img=soulmateImg, ctx=c.getContext("2d");
  const r=c.getBoundingClientRect();
  c.width=r.width; c.height=r.height;
  ctx.fillStyle="#111"; ctx.fillRect(0,0,c.width,c.height);
  ctx.globalCompositeOperation="destination-out";
  let down=false;

  function pos(e){
    const r=c.getBoundingClientRect();
    return e.touches
      ? {x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top}
      : {x:e.clientX-r.left,y:e.clientY-r.top};
  }

  function scratch(e){
    if(!down) return;
    const p=pos(e);
    ctx.beginPath();
    ctx.arc(p.x,p.y,18,0,Math.PI*2);
    ctx.fill();
  }

  c.onmousedown=()=>down=true;
  c.onmouseup=()=>down=false;
  c.onmousemove=scratch;
  c.ontouchstart=()=>down=true;
  c.ontouchend=()=>down=false;
  c.ontouchmove=e=>{e.preventDefault();scratch(e);};

  setTimeout(()=>{c.style.display="none";img.classList.add("revealed");},4500);
}

function submitFeedback(){
  if(!feedbackInput.value||!rating) return alert("Give rating & feedback 😇");
  saveFeedback(userName,userAge,feedbackInput.value,rating).catch(()=>{});
  alert("Thanks 💖");
}
