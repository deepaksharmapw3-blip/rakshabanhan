import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  color: string;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      initEmbers();
    };

    window.addEventListener('resize', handleResize);

    const starColors = ['#ffffff', '#ffebcc', '#ffd6a5', '#ff9e7d', '#ffe4e1', '#ffd700'];
    const emberColors = ['#ff6b35', '#ffd700', '#ffb366', '#ff4d4d', '#ff9e7d'];
    
    let stars: Star[] = [];
    let embers: Ember[] = [];
    const shootingStars: ShootingStar[] = [];

    const initStars = () => {
      const starCount = Math.floor((width * height) / 4200);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const baseOpacity = Math.random() * 0.6 + 0.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.6,
          opacity: baseOpacity,
          baseOpacity,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
    };

    const initEmbers = () => {
      const emberCount = Math.min(30, Math.floor(width / 45));
      embers = [];
      for (let i = 0; i < emberCount; i++) {
        embers.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          speedY: Math.random() * 0.4 + 0.15,
          speedX: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          color: emberColors[Math.floor(Math.random() * emberColors.length)],
        });
      }
    };

    initStars();
    initEmbers();

    // Trigger shooting star periodically
    const shootInterval = setInterval(() => {
      if (Math.random() > 0.3 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 90 + 45,
          speed: Math.random() * 7 + 6,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          opacity: 1,
          active: true,
        });
      }
    }, 2800);

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient with rich cosmic twilight
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 3,
        100,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#151124');
      bgGrad.addColorStop(0.5, '#0a0913');
      bgGrad.addColorStop(1, '#050408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Saffron/Kesari Neon ambient glow aura (Top-Right)
      const saffronAura = ctx.createRadialGradient(
        width * 0.85,
        height * 0.25,
        20,
        width * 0.85,
        height * 0.25,
        width * 0.45
      );
      saffronAura.addColorStop(0, 'rgba(255, 107, 53, 0.08)');
      saffronAura.addColorStop(0.5, 'rgba(255, 85, 0, 0.03)');
      saffronAura.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = saffronAura;
      ctx.fillRect(0, 0, width, height);

      // Golden Swarna Glow Aura (Bottom-Left)
      const goldAura = ctx.createRadialGradient(
        width * 0.15,
        height * 0.75,
        20,
        width * 0.15,
        height * 0.75,
        width * 0.45
      );
      goldAura.addColorStop(0, 'rgba(255, 215, 0, 0.06)');
      goldAura.addColorStop(0.5, 'rgba(255, 179, 102, 0.02)');
      goldAura.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = goldAura;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle Sacred Geometric Mandala Rings in background center
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 179, 102, 0.025)';
      ctx.lineWidth = 1;
      
      const mandalaRings = [120, 220, 340, 480];
      mandalaRings.forEach((radius, rIdx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // 8-spoke sacred petals
        if (rIdx === 1) {
          const spokeCount = 12;
          for (let s = 0; s < spokeCount; s++) {
            const spokeAngle = (s * Math.PI * 2) / spokeCount + time * 0.0005;
            const sx = centerX + Math.cos(spokeAngle) * radius;
            const sy = centerY + Math.sin(spokeAngle) * radius;
            ctx.beginPath();
            ctx.arc(sx, sy, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 215, 0, 0.04)';
            ctx.fill();
          }
        }
      });
      ctx.restore();

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = Math.sin(time * star.twinkleSpeed + i) * 0.4;
        const currentOpacity = Math.max(0.1, Math.min(1, star.baseOpacity + twinkle));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentOpacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra twinkle cross on larger stars
        if (star.size > 1.7 && currentOpacity > 0.65) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.size * 2, star.y);
          ctx.lineTo(star.x + star.size * 2, star.y);
          ctx.moveTo(star.x, star.y - star.size * 2);
          ctx.lineTo(star.x, star.y + star.size * 2);
          ctx.stroke();
        }
      }

      // Draw Floating Festive Stardust / Sacred Embers
      for (let i = 0; i < embers.length; i++) {
        const emb = embers[i];
        emb.y -= emb.speedY;
        emb.x += Math.sin(time * 0.02 + i) * 0.3;

        if (emb.y < -10) {
          emb.y = height + 10;
          emb.x = Math.random() * width;
        }

        ctx.fillStyle = emb.color;
        ctx.globalAlpha = emb.opacity * (0.6 + Math.sin(time * 0.05 + i) * 0.3);
        ctx.beginPath();
        ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Shooting Stars
      ctx.globalAlpha = 1;
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(255, 107, 53, 0)');
        grad.addColorStop(0.7, 'rgba(255, 215, 0, 0.5)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 1)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(shootInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starBg"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
