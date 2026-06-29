import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export function ScratchConnectCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || canvas.offsetWidth || 350;
      const height = rect?.height || canvas.offsetHeight || 180;
      
      canvas.width = width;
      canvas.height = height;

      // Draw metallic background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#7c3aed'); // Violet
      gradient.addColorStop(0.5, '#06b6d4'); // Cyan
      gradient.addColorStop(1, '#ec4899'); // Pink
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add modern matrix dot overlay effect on the scratch layer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < width; i += 6) {
        for (let j = 0; j < height; j += 6) {
          ctx.beginPath();
          ctx.arc(i, j, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Add premium holographic diagonal stripes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 2;
      for (let i = -height; i < width; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }

      // Write heading
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "Sora", "Inter", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 6;
      ctx.fillText("Let's connect !! 🪄", width / 2, height / 2 - 12);

      // Write action text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.shadowBlur = 0;
      ctx.fillText("Scratch it to reveal", width / 2, height / 2 + 18);
    };

    // Draw initially
    drawCanvas();

    // Use ResizeObserver for responsive redraws on screen size changes
    const observer = new ResizeObserver(() => {
      if (!isRevealed) {
        drawCanvas();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    // Sample pixels to reveal early
    checkPercent(ctx, canvas);
  };

  const checkPercent = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (isRevealed) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparent++;
      }
    }

    const sampledCount = pixels.length / 16;
    const percent = (transparent / sampledCount) * 100;

    // Reveal completely when 40% scratched
    if (percent > 40) {
      setIsRevealed(true);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[180px] rounded-2xl overflow-hidden glass border border-white/5 shadow-2xl flex flex-col justify-center items-center select-none"
    >
      {/* Hidden layer: Premium UI message revealed underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0 bg-gradient-to-br from-violet-950/20 via-black/40 to-cyan-950/20">
        <Sparkles className="w-8 h-8 text-yellow-400 mb-2 animate-bounce" />
        <h4 className="font-display font-bold text-white text-lg tracking-tight">Let's build something epic! 🚀</h4>
        <p className="text-xs text-gray-400 mt-1 max-w-[280px] leading-relaxed">
          You unlocked the secret message! Feel free to fill out the form on the right or reach out via email. Let's make it happen.
        </p>
      </div>

      {/* Canvas scratch card overlay */}
      {!isRevealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 cursor-pointer touch-none transition-opacity duration-500 ease-out"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        />
      )}
    </div>
  );
}
