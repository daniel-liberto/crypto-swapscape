
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
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Create particles
    const particlesCount = 50;
    const particles: Particle[] = [];
    
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
    }
    
    // Define colors based on theme - with higher contrast
    const getColors = () => {
      return theme === "dark" 
        ? ["#FF8A50", "#FFA07A", "#FFD700", "#87CEFA", "#E5DEFF"]  // Vibrant colors for dark theme
        : ["#FF6724", "#D946EF", "#8B5CF6", "#0EA5E9", "#F97316"];  // Bold colors for light theme
    };
    
    // Initialize particles
    const initParticles = () => {
      const colors = getColors();
      
      for (let i = 0; i < particlesCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 6 + 3, // Increased size for better visibility
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.4 + 0.6 // Higher opacity for better visibility
        });
      }
    };
    
    initParticles();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(30, 30, 40, 1)");
        gradient.addColorStop(1, "rgba(20, 20, 30, 1)");
      } else {
        gradient.addColorStop(0, "rgba(240, 240, 245, 1)");
        gradient.addColorStop(1, "rgba(220, 220, 230, 1)");
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Connect nearby particles with more visible lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = theme === "dark" ? 
              `rgba(255, 103, 36, ${0.2 * (1 - distance / 150)})` : 
              `rgba(255, 103, 36, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 1.5; // Thicker lines
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
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
