'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FloatingElementProps {
  children?: React.ReactNode;
  duration?: number;
  amplitude?: number;
  className?: string;
  delay?: number;
}

export default function FloatingElement({ 
  children, 
  duration = 4,
  amplitude = 20,
  className = "",
  delay = 0
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 부드러운 플로팅 애니메이션
    const timeline = gsap.timeline({ repeat: -1, yoyo: true, delay: delay });
    
    timeline
      .to(element, {
        y: -amplitude,
        rotation: 2,
        duration: duration,
        ease: "power2.inOut"
      })
      .to(element, {
        y: amplitude,
        rotation: -2,
        duration: duration,
        ease: "power2.inOut"
      });

    // 마우스 인터랙션
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      gsap.to(element, {
        rotationY: deltaX * 10,
        rotationX: -deltaY * 10,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      timeline.kill();
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [duration, amplitude, delay]);

  return (
    <div 
      ref={elementRef} 
      className={`transform-gpu will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}