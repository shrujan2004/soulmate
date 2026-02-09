function introScreen() {
  return `
    <h2 class="text-2xl font-bold mb-6 text-center">
      Find Your Soulmate 💖
    </h2>

    <input id="nameInput"
      class="input mb-4"
      placeholder="Your name" />

    <select id="ageInput" class="input mb-6">
      <option value="">Your age</option>
      ${Array.from({ length: 25 }, (_, i) =>
        `<option>${18 + i}</option>`).join("")}
    </select>

    <button onclick="saveUserInfo()"
      class="w-full bg-pink-500 text-white py-4 rounded-2xl font-semibold shadow-lg">
      Continue ✨
    </button>
  `;
}

function revealScreen(name) {
  return `
    <p class="text-lg text-center leading-relaxed">
      Okay <b>${name}</b>… 👀<br><br>
      We already know a few things about you.<br>
      You’re craving attention.<br>
      You want something <b>real</b>.<br><br>
      Relax… destiny is working 💖
    </p>

    <button onclick="showQuestion(0)"
      class="mt-6 w-full bg-purple-500 text-white py-4 rounded-2xl font-semibold">
      Continue 😇
    </button>
  `;
}

function questionScreen(question, options) {
  return `
    <h2 class="text-xl font-bold mb-5 text-center">
      ${question}
    </h2>

    <div class="grid gap-3">
      ${options.map(opt => `
        <button onclick="nextQuestion()"
          class="border rounded-2xl p-4 text-left hover:bg-pink-50">
          ${opt}
        </button>
      `).join("")}
    </div>
  `;
}

function searchingScreen() {
  return `
    <h2 class="text-xl font-bold text-center mb-3">
      Searching the universe… 🌌
    </h2>

    <video id="matchVideo" loop playsinline class="mx-auto mb-3">
      <source src="assets/videos/heaven.mp4" type="video/mp4">
    </video>

    <p id="dialogueText"
      class="text-center text-sm mt-2 opacity-80">
      Prabhu… aapne toh kaha tha ye single maregi…
    </p>
  `;
}

function resultScreen(name) {
  return `
    <h2 class="text-2xl font-extrabold text-center mb-4 text-pink-600">
      ${name}, this is your soulmate 💖
    </h2>

    <img src="assets/images/soulmate.jpg" class="mx-auto mb-4" />

    <p class="text-center font-semibold text-lg">
      99.8% compatibility 😌<br>
      Destiny never lies.
    </p>
  `;
}
