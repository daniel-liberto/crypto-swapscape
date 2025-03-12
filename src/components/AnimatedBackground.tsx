
import { useEffect, useRef } from "react";
import { useTheme } from "@/providers/ThemeProvider";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Animation properties
    let animationFrameId: number;
    const bubbles: Bubble[] = [];
    const bubbleCount = 30;
    
    interface Bubble {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;
      opacity: number;
      pulseSpeed: number;
      pulseDirection: 1 | -1;
      wobbleSpeed: number;
      wobbleAmount: number;
      wobbleOffset: number;
    }
    
    // Define colors based on theme
    const getColors = () => {
      return theme === "dark" 
        ? ["#FF6724", "#D946EF", "#8B5CF6", "#0EA5E9", "#F97316"] 
        : ["#FF8A50", "#D946EF", "#8B5CF6", "#87CEFA", "#FFD700"];
    };
    
    // Create bubbles
    const createBubbles = () => {
      const colors = getColors();
      
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 100,
          size: Math.random() * 100 + 50,
          speedY: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.15 + 0.05,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseDirection: 1,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          wobbleAmount: Math.random() * 30 + 10,
          wobbleOffset: Math.random() * Math.PI * 2
        });
      }
    };
    
    createBubbles();
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(20, 20, 30, 1)");
        gradient.addColorStop(1, "rgba(30, 30, 40, 1)");
      } else {
        gradient.addColorStop(0, "rgba(240, 240, 245, 1)");
        gradient.addColorStop(1, "rgba(225, 225, 235, 1)");
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw bubbles
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        
        // Update position
        b.y -= b.speedY;
        
        // Wobble effect
        const wobbleX = Math.sin(time * b.wobbleSpeed + b.wobbleOffset) * b.wobbleAmount;
        
        // Pulse size effect
        if (b.pulseDirection === 1) {
          b.size += b.pulseSpeed;
          if (b.size > (Math.random() * 100 + 50) * 1.2) b.pulseDirection = -1;
        } else {
          b.size -= b.pulseSpeed;
          if (b.size < (Math.random() * 100 + 50) * 0.8) b.pulseDirection = 1;
        }
        
        // Draw bubble
        ctx.beginPath();
        ctx.globalAlpha = b.opacity;
        
        // Create gradient for bubble
        const bubbleGradient = ctx.createRadialGradient(
          b.x + wobbleX, b.y, 0,
          b.x + wobbleX, b.y, b.size
        );
        
        bubbleGradient.addColorStop(0, b.color);
        bubbleGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = bubbleGradient;
        ctx.arc(b.x + wobbleX, b.y, b.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset bubble if it goes out of screen
        if (b.y < -b.size * 2) {
          b.y = canvas.height + b.size;
          b.x = Math.random() * canvas.width;
        }
      }
      
      ctx.globalAlpha = 1;
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
