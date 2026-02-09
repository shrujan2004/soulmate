export function introScreen(states) {
  return `
    <h2 class="text-2xl font-bold text-center mb-6">Soulmate Finder 💖</h2>

    <input id="nameInput" class="input mb-4" placeholder="Your name" />

    <div class="status-pill mb-4">
      <span class="status-dot"></span>
      <span class="status-text"><strong>${(Math.floor(Math.random() * 9000) + 10000).toLocaleString()}</strong> people online now</span>
    </div>

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

    <p class="text-sm mb-3">
      This soulmate arrives like a gentle shift in the air—subtle at first,
      then unmistakable. They feel familiar in a way you can't explain,
      like a memory you've never lived but always carried.
    </p>
    <p class="text-sm mb-3">
      They notice the details you think no one sees: the pause before you speak,
      the way your eyes soften around the right people, the stories you hide
      behind your smiles. With them, being understood stops feeling rare.
    </p>
    <p class="text-sm mb-4">
      What makes it thrilling is the mystery—you won't meet them by chasing,
      but by living. A random plan, a quiet place, a moment that feels ordinary
      until it isn't. Stay open. The universe likes surprises.
    </p>

    <div class="soulmate-wrapper">
      <img src="./assets/images/soulmate.jpg" id="soulmateImg" class="soulmate-img"/>
      <canvas id="scratchCanvas"></canvas>
      <div class="scratch-text" id="scratchText">
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
