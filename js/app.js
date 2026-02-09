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

window.onload = () => {
  setupBackground();
  setupWebglBackground();
  showIntro();
};

function setupWebglBackground() {
  const canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  document.body.prepend(canvas);

  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) return;

  const vertexSrc = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;
  const fragmentSrc = `
    precision mediump float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uPointer;

    vec3 palette(float t) {
      vec3 a = vec3(0.8, 0.5, 0.9);
      vec3 b = vec3(0.3, 0.7, 0.9);
      vec3 c = vec3(0.9, 0.3, 0.7);
      vec3 d = vec3(0.2, 0.2, 0.6);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec2 p = uv - 0.5;
      p.x *= uResolution.x / uResolution.y;

      float swirl = sin((p.x + uPointer.x) * 6.0 + uTime * 0.4)
        + cos((p.y + uPointer.y) * 6.0 - uTime * 0.35);
      float glow = exp(-length(p + uPointer) * 3.0);
      float t = swirl * 0.15 + glow * 0.6 + uTime * 0.02;
      vec3 color = palette(t);
      color += glow * vec3(0.6, 0.2, 0.8);
      gl_FragColor = vec4(color, 0.45);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const vertexShader = compile(gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSrc);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const resolutionUniform = gl.getUniformLocation(program, "uResolution");
  const timeUniform = gl.getUniformLocation(program, "uTime");
  const pointerUniform = gl.getUniformLocation(program, "uPointer");

  const pointer = { x: 0.0, y: 0.0 };
  const pointerTarget = { x: 0.0, y: 0.0 };

  function resize() {
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    const scale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * scale;
    canvas.height = innerHeight * scale;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
  }

  function updatePointer(clientX, clientY) {
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (1 - clientY / window.innerHeight) * 2 - 1;
    pointerTarget.x = x * 0.35;
    pointerTarget.y = y * 0.35;
  }

  window.addEventListener("mousemove", event => {
    updatePointer(event.clientX, event.clientY);
  });

  window.addEventListener("touchmove", event => {
    if (!event.touches?.length) return;
    updatePointer(event.touches[0].clientX, event.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("touchstart", event => {
    if (!event.touches?.length) return;
    updatePointer(event.touches[0].clientX, event.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("resize", resize);
  resize();

  let time = 0;
  const speed = { value: 0.5 };
  if (window.gsap) {
    window.gsap.to(speed, { value: 1.2, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }

  function renderFrame() {
    time += 0.01 * speed.value;
    pointer.x += (pointerTarget.x - pointer.x) * 0.06;
    pointer.y += (pointerTarget.y - pointer.y) * 0.06;
    gl.uniform1f(timeUniform, time);
    gl.uniform2f(pointerUniform, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
}

function setupBackground() {
  const root = document.documentElement;
  let targetX = 50;
  let targetY = 30;
  let currentX = 50;
  let currentY = 30;
  let rafId = null;

  function apply() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    root.style.setProperty("--bg-x", `${currentX}%`);
    root.style.setProperty("--bg-y", `${currentY}%`);
    rafId = requestAnimationFrame(apply);
  }

  function updateFromPoint(clientX, clientY) {
    const { innerWidth, innerHeight } = window;
    targetX = Math.min(100, Math.max(0, (clientX / innerWidth) * 100));
    targetY = Math.min(100, Math.max(0, (clientY / innerHeight) * 100));
    if (!rafId) {
      rafId = requestAnimationFrame(apply);
    }
  }

  window.addEventListener("mousemove", event => {
    updateFromPoint(event.clientX, event.clientY);
  });

  window.addEventListener("touchmove", event => {
    if (!event.touches?.length) return;
    updateFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("touchstart", event => {
    if (!event.touches?.length) return;
    updateFromPoint(event.touches[0].clientX, event.touches[0].clientY);
  }, { passive: true });
}

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

  let scratching = false;
  let count = 0;
  let revealed = false;

  function sizeCanvas() {
    const r = img.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(r.width));
    canvas.height = Math.max(1, Math.floor(r.height));
    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "destination-out";
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    canvas.remove();
    img.classList.add("revealed");
    if (typeof revealBtn !== "undefined") {
      revealBtn.remove();
    }
    if (typeof scratchText !== "undefined") {
      scratchText.remove();
    }
  }

  function pos(e) {
    const b = canvas.getBoundingClientRect();
    if (e.touches?.length) {
      return { x: e.touches[0].clientX - b.left, y: e.touches[0].clientY - b.top };
    }
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  }

  function scratch(e) {
    if (!scratching || revealed) return;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    if (++count > 40) {
      reveal();
    }
  }

  function startScratch(e) {
    scratching = true;
    scratch(e);
  }

  function stopScratch() {
    scratching = false;
  }

  img.addEventListener("load", sizeCanvas);
  if (img.complete) sizeCanvas();
  window.addEventListener("resize", sizeCanvas);

  canvas.addEventListener("pointerdown", startScratch);
  canvas.addEventListener("pointermove", scratch);
  canvas.addEventListener("pointerup", stopScratch);
  canvas.addEventListener("pointerleave", stopScratch);
  canvas.addEventListener("dblclick", reveal);

  canvas.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
  if (typeof revealBtn !== "undefined") {
    revealBtn.addEventListener("click", reveal);
  }
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
