export function introScreen(states) {
  return `
    <h2 class="text-2xl font-bold text-center mb-6">Soulmate Finder 💖</h2>

    <input id="nameInput" class="input mb-4" placeholder="Your name" />

    <div class="select-wrapper mb-4">
      <select id="ageInput" class="input select-field">
        <option value="">Select age</option>
        ${Array.from({length:30},(_,i)=>`<option>${18+i}</option>`).join("")}
      </select>
    </div>

    <div class="select-wrapper mb-6">
      <select id="stateInput" class="input select-field">
        <option value="">Select state</option>
        ${states.map(s=>`<option>${s}</option>`).join("")}
      </select>
    </div>

    <button id="continueBtn"
      class="w-full bg-pink-500 text-white py-4 rounded-2xl font-semibold">
      Continue ✨
    </button>
  `;
}

export function questionScreen(q, options) {
  return `
    <h2 class="text-xl font-bold text-center mb-5">${q}</h2>
    <div class="grid gap-3">
      ${options.map(o=>`
        <button class="optionBtn">${o}</button>
      `).join("")}
    </div>
  `;
}

export function searchingScreen(state) {
  return `
    <h2 class="text-xl font-bold text-center mb-2">Searching in</h2>
    <p class="text-center text-pink-600 mb-4">${state} 🌍</p>

    <div class="relative">
      <video id="matchVideo" muted playsinline></video>
      <button id="videoTapBtn"
        class="absolute inset-0 bg-black/50 text-white flex items-center justify-center rounded-2xl">
        Tap to continue 🔊
      </button>
    </div>
  `;
}

export function resultWithFeedback(name) {
  return `
    <h2 class="text-xl font-bold text-center text-pink-600 mb-4">
      ${name}, destiny has been watching you 💖
    </h2>

    <p class="text-sm mb-4">
      This person enters your life quietly, understands your silence,
      and becomes your safe place without trying.
    </p>

    <div class="soulmate-wrapper">
      <img src="./assets/images/soulmate.jpg" id="soulmateImg" class="soulmate-img"/>
      <canvas id="scratchCanvas"></canvas>
      <div class="scratch-text">
        <button id="revealBtn" class="reveal-btn">Click to reveal ✨</button>
      </div>
    </div>

    <div class="star-rating">
      ${[1,2,3,4,5].map(i=>`<span class="star" data-value="${i}">★</span>`).join("")}
    </div>

    <textarea id="feedbackInput" class="input mb-4"
      placeholder="Was this fun? 😂"></textarea>

    <button id="submitFeedbackBtn"
      class="w-full bg-pink-500 text-white py-3 rounded-2xl">
      Submit Feedback 💌
    </button>
  `;
}
