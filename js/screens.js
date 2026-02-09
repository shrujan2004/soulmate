export function introScreen() {
  return `
    <h2 class="text-2xl font-bold text-center mb-6">
      Soulmate Finder 💖
    </h2>

    <input id="nameInput" class="input mb-4" placeholder="Your name" />

    <select id="ageInput" class="input mb-4">
      <option value="">Your age</option>
      ${Array.from({ length: 30 }, (_, i) => `<option>${18 + i}</option>`).join("")}
    </select>

    <select id="stateInput" class="input dropdown-animate mb-6">
      <option value="">Your state</option>
      <option>Andhra Pradesh</option>
      <option>Assam</option>
      <option>Bihar</option>
      <option>Chandigarh</option>
      <option>Delhi</option>
      <option>Gujarat</option>
      <option>Karnataka</option>
      <option>Kerala</option>
      <option>Maharashtra</option>
      <option>Punjab</option>
      <option>Rajasthan</option>
      <option>Tamil Nadu</option>
      <option>Telangana</option>
      <option>Uttar Pradesh</option>
      <option>West Bengal</option>
    </select>

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
      ${options.map(o => `
        <button class="optionBtn border rounded-2xl p-4 hover:bg-pink-50">
          ${o}
        </button>
      `).join("")}
    </div>
  `;
}

export function searchingScreen(state) {
  return `
    <h2 class="text-xl font-bold text-center mb-2">
      Searching matches in
    </h2>

    <p class="text-center text-pink-600 font-semibold mb-4 text-lg">
      ${state} 🌍
    </p>

    <div class="relative">
      <video id="matchVideo" muted playsinline preload="auto">
        <source src="./assets/videos/heaven.mp4" type="video/mp4">
      </video>

      <button id="videoTapBtn"
        class="absolute inset-0 bg-black/50 text-white flex items-center justify-center font-semibold rounded-2xl">
        Tap to continue 🔊
      </button>
    </div>
  `;
}

export function resultWithFeedback(name) {
  return `
    <h2 class="text-2xl font-bold text-center text-pink-600 mb-4">
      ${name}, this is your soulmate 💖
    </h2>

    <img src="./assets/images/soulmate.jpg" class="mb-4" />

    <p class="text-center font-semibold mb-6">
      99.8% compatibility 😌
    </p>

    <textarea id="feedbackInput" class="input mb-3"
      placeholder="Was this fun? 😂"></textarea>

    <select id="ratingInput" class="input mb-4">
      <option value="">Rate it</option>
      <option>⭐</option>
      <option>⭐⭐</option>
      <option>⭐⭐⭐</option>
      <option>⭐⭐⭐⭐</option>
      <option>⭐⭐⭐⭐⭐</option>
    </select>

    <button id="submitFeedbackBtn"
      class="w-full bg-pink-500 text-white py-3 rounded-2xl">
      Submit Feedback 💌
    </button>
  `;
}
