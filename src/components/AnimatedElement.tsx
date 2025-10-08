'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInDown' | 'slideIn' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  trigger?: string;
  className?: string;
}

export default function AnimatedElement({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 1,
  trigger,
  className = ""
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const element = elementRef.current;
    if (!element) return;

    // 초기 상태 설정
    const initialState = {
      fadeInUp: { opacity: 0, y: 50 },
      fadeInDown: { opacity: 0, y: -50 },
      slideInLeft: { opacity: 0, x: -100 },
      slideInRight: { opacity: 0, x: 100 },
      slideIn: { opacity: 0, x: -50 },
      scaleIn: { opacity: 0, scale: 0.8 },
      rotateIn: { opacity: 0, rotation: 45, scale: 0.8 }
    };

    // 최종 상태
    const finalState = {
      fadeInUp: { opacity: 1, y: 0 },
      fadeInDown: { opacity: 1, y: 0 },
      slideInLeft: { opacity: 1, x: 0 },
      slideInRight: { opacity: 1, x: 0 },
      slideIn: { opacity: 1, x: 0 },
      scaleIn: { opacity: 1, scale: 1 },
      rotateIn: { opacity: 1, rotation: 0, scale: 1 }
    };

    gsap.set(element, initialState[animation]);

    const timeline = gsap.timeline({
      scrollTrigger: trigger ? {
        trigger: trigger,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      } : undefined
    });

    timeline.to(element, {
      ...finalState[animation],
      duration,
      delay,
      ease: "power3.out"
    });

    return () => {
      timeline.kill();
    };
  }, [animation, delay, duration, trigger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}