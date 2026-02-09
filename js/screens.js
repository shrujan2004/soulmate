function introScreen() {
  return `
    <h2 class="text-2xl font-bold text-center mb-6">
      Soulmate Finder 💖
    </h2>

    <input id="nameInput" class="input mb-4" placeholder="Your name" />

    <select id="ageInput" class="input mb-6">
      <option value="">Your age</option>
      ${Array.from({ length: 30 }, (_, i) => `<option>${18 + i}</option>`).join("")}
    </select>

    <button onclick="saveUserInfo()"
      class="w-full bg-pink-500 text-white py-4 rounded-2xl font-semibold">
      Continue ✨
    </button>
  `;
}

function searchingScreen() {
  return `
    <h2 class="text-xl font-bold text-center mb-4">
      Consulting destiny… 🌌
    </h2>

    <video id="matchVideo" playsinline preload="auto">
      <source src="assets/videos/heaven.mp4" type="video/mp4">
    </video>

    <p id="videoStatus" class="text-center text-sm mt-3 opacity-70">
      Loading heavenly records…
    </p>
  `;
}

function resultScreen(name) {
  return `
    <h2 class="text-2xl font-bold text-center text-pink-600 mb-4">
      ${name}, this is your soulmate 💖
    </h2>

    <img src="assets/images/soulmate.jpg" class="mx-auto mb-4" />

    <p class="text-center font-semibold">
      99.8% compatibility 😌<br>
      Destiny never lies.
    </p>
  `;
}
