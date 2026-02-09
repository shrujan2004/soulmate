export function introScreen() {
  const states = [
    "Andhra Pradesh","Assam","Bihar","Chandigarh","Delhi","Gujarat",
    "Karnataka","Kerala","Maharashtra","Punjab","Rajasthan",
    "Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"
  ];
  const ages = Array.from({ length: 30 }, (_, i) => 18 + i);

  return `
    <h2 class="text-2xl font-bold text-center mb-6">Soulmate Finder 💖</h2>

    <input id="nameInput" class="input mb-4" placeholder="Your name" />

    <div class="dropdown mb-4" id="ageDropdown">
      <div class="dropdown-btn"><span id="ageLabel">Select age</span><span>⌄</span></div>
      <div class="dropdown-list">
        ${ages.map(a => `<div class="dropdown-item">${a}</div>`).join("")}
      </div>
    </div>
    <input type="hidden" id="ageInput" />

    <div class="dropdown mb-6" id="stateDropdown">
      <div class="dropdown-btn"><span id="stateLabel">Select state</span><span>⌄</span></div>
      <div class="dropdown-list">
        ${states.map(s => `<div class="dropdown-item">${s}</div>`).join("")}
      </div>
    </div>
    <input type="hidden" id="stateInput" />

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
      ${options.map(o => `<button class="optionBtn border rounded-2xl p-4">${o}</button>`).join("")}
    </div>
  `;
}

export function searchingScreen(state) {
  return `
    <h2 class="text-xl font-bold text-center mb-2">Searching matches in</h2>
    <p class="text-center text-pink-600 font-semibold mb-4">${state} 🌍</p>

    <div class="relative">
      <video id="matchVideo" muted playsinline>
        <source src="./assets/videos/heaven.mp4" type="video/mp4">
      </video>
      <button id="videoTapBtn"
        class="absolute inset-0 bg-black/50 text-white flex items-center justify-center rounded-2xl">
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

    <div class="star-rating">
      ${[1,2,3,4,5].map(i => `<span class="star" data-value="${i}">★</span>`).join("")}
    </div>

    <textarea id="feedbackInput" class="input mb-4"
      placeholder="Was this fun? 😂"></textarea>

    <button id="submitFeedbackBtn"
      class="w-full bg-pink-500 text-white py-3 rounded-2xl">
      Submit Feedback 💌
    </button>
  `;
}
