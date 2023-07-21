const startConfetti = () => {
  if (document.querySelector("#confetti-script") == null) {
    const script = document.createElement("script");
    script.id = "confetti-script";
    script.src =
      "https://cdn.jsdelivr.net/npm/tsparticles-confetti@2.11.0/tsparticles.confetti.bundle.min.js";
    script.async = true;
    script.onload = () => {
      woohoo();
    };
    document.body.appendChild(script);
  } else {
    woohoo();
  }
};

const woohoo = () => {
  const confetti = (window as any).confetti;
  console.log(confetti);
  if (confetti === undefined) return;
  const defaults = {
    spread: 80,
    ticks: 50,
    gravity: 1,
    decay: 0.94,
    startVelocity: 60,
    particleCount: 1,
    scalar: 4,
    shapes: ["image"],
    shapeOptions: {
      image: [
        {
          src: "https://static.cdn.zo.xyz/web-media/bitcoin-bros/phallus.svg",
          width: 24,
          height: 24,
        },
      ],
    },
  };
  const end = Date.now() + 1 * 1000;

  (function frame() {
    confetti({
      ...defaults,
      angle: 60,
      origin: { x: 0, y: 0.75 },
    });

    confetti({
      ...defaults,
      angle: 120,
      origin: { x: 1, y: 0.75 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export default startConfetti;
