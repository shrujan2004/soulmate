function searchingScreen() {
  return `
    <h2 class="text-xl font-bold text-center mb-4">
      Consulting destiny… 🌌
    </h2>

    <!-- Skeleton Loader -->
    <div id="videoSkeleton"
      class="w-full h-48 rounded-2xl bg-gradient-to-r
             from-gray-200 via-gray-300 to-gray-200
             animate-pulse mb-4">
    </div>

    <!-- Video (hidden until ready) -->
    <video
      id="matchVideo"
      playsinline
      preload="auto"
      class="mx-auto mb-3 hidden rounded-2xl">
      <source src="assets/videos/heaven.mp4" type="video/mp4">
    </video>

    <p id="videoStatus"
      class="text-center text-sm opacity-70">
      Accessing heavenly records…
    </p>
  `;
}

function matchmakingScreen() {
  return `
    <h2 class="text-xl font-bold text-center mb-3">
      Finalizing match… 💖
    </h2>

    <p id="dialogueText"
      class="text-center text-sm opacity-80">
      Prabhu… aapne toh kaha tha ye single maregi…
    </p>
  `;
}

function resultScreen(name) {
  return `
    <h2 class="text-2xl font-extrabold text-center mb-4 text-pink-600">
      ${name}, this is your soulmate 💖
    </h2>

    <img src="assets/images/soulmate.jpg"
      class="mx-auto mb-4 rounded-2xl" />

    <p class="text-center font-semibold text-lg">
      99.8% compatibility 😌<br>
      Destiny never lies.
    </p>
  `;
}
