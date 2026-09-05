import { useEffect, useRef } from "react";
import "./LogoIntro.css";

function LogoIntro({ onComplete }) {
  const canvasRef = useRef(null);

  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();

    let animationFrame;
    let startTime;

    const duration = 2600;
    const columns = 8;
    const rows = 8;

    const rotations = Array.from(
      { length: rows * columns },
      () => Math.random() * 0.3 - 0.15
    );

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const draw = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      if (!image.width || !image.height) {
        animationFrame = requestAnimationFrame(draw);
        return;
      }

      const scale = Math.min(
        (width * 0.72) / image.width,
        (height * 0.72) / image.height
      );

      const logoWidth = image.width * scale;
      const logoHeight = image.height * scale;

      const logoX = (width - logoWidth) / 2;
      const logoY = (height - logoHeight) / 2;

      const pieceWidth = image.width / columns;
      const pieceHeight = image.height / rows;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const index = row * columns + col;

          const sx = col * pieceWidth;
          const sy = row * pieceHeight;

          const dx = logoX + sx * scale;
          const dy = logoY + sy * scale;

          const dw = pieceWidth * scale + 1;
          const dh = pieceHeight * scale + 1;

          const distance = 180 + (row + col) * 12;

          const angle = Math.atan2(
            dy + dh / 2 - height / 2,
            dx + dw / 2 - width / 2
          );

          const startX =
            dx + Math.cos(angle) * distance * (1 - progress);

          const startY =
            dy + Math.sin(angle) * distance * (1 - progress);

          const rotation =
            rotations[index] * (1 - eased);

          ctx.save();

          ctx.translate(
            startX + dw / 2,
            startY + dh / 2
          );

          ctx.rotate(rotation);

          ctx.globalAlpha = Math.min(1, progress * 1.5);

          ctx.drawImage(
            image,
            sx,
            sy,
            pieceWidth,
            pieceHeight,
            -dw / 2,
            -dh / 2,
            dw,
            dh
          );

          ctx.restore();
        }
      }

      if (progress > 0.82) {
        const glowProgress = (progress - 0.82) / 0.18;

        ctx.save();

        const glowX = logoX + logoWidth / 2;
        const glowY = logoY + logoHeight * 0.96;

        const gradient = ctx.createRadialGradient(
          glowX,
          glowY,
          0,
          glowX,
          glowY,
          logoWidth * 0.32
        );

        gradient.addColorStop(
          0,
          `rgba(22, 136, 255, ${
            0.28 * Math.sin(glowProgress * Math.PI)
          })`
        );

        gradient.addColorStop(
          0.45,
          `rgba(22, 136, 255, ${
            0.12 * Math.sin(glowProgress * Math.PI)
          })`
        );

        gradient.addColorStop(
          1,
          "rgba(22, 136, 255, 0)"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.ellipse(
          glowX,
          glowY,
          logoWidth * 0.30,
          logoHeight * 0.035,
          0,
          0,
          Math.PI * 2
        );

        ctx.fill();

        ctx.restore();
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 350);
      }
    };

    image.onload = () => {
      resizeCanvas();
      animationFrame = requestAnimationFrame(draw);
    };

    image.src = "/adic-logo.jpeg";

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="logo-intro">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default LogoIntro;