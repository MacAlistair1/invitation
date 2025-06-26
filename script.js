tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  particles: {
    number: {
      value: 25,
      density: { enable: true, value_area: 800 },
    },
    color: { value: ["#ffc0cb", "#ff99aa", "#ffffff"] },
    shape: {
      type: "char",
      character: {
        value: ["❤", "❀", "♡"],
        font: "Verdana",
        style: "",
        weight: "800",
        fill: true,
      },
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: 20,
      random: { enable: true, minimumValue: 10 },
    },
    move: {
      direction: "bottom",
      enable: true,
      outModes: "out",
      speed: 1,
    },
  },
  background: {
    color: "transparent",
  },
});

const weddingDate = new Date("December 16, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("countdown").innerHTML = "We're Married!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown(); // initial call

let hasScrolled = false;

function playMusicWithFadeIn() {
  if (!hasScrolled) {
    const audio = document.getElementById("bg-music");
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        // Fade in over 4 seconds
        let volume = 0;
        const targetVolume = 0.2; // max volume
        const fadeInterval = 400; // every 200ms
        const volumeStep = targetVolume / (4000 / fadeInterval); // total time: 4000ms

        const fadeIn = setInterval(() => {
          if (volume < targetVolume) {
            volume += volumeStep;
            audio.volume = Math.min(volume, targetVolume);
          } else {
            clearInterval(fadeIn);
          }
        }, fadeInterval);
      })
      .catch((err) => {
        console.log("Autoplay prevented:", err);
      });

    hasScrolled = true;
  }
}

window.addEventListener("click", playMusicWithFadeIn);
