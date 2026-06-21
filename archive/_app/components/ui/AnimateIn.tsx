"use client";
import { useEffect, useRef, ReactNode, ElementType } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  /** Direction the element enters from */
  direction?: "up" | "left" | "right" | "scale" | "none";
  /** Delay in ms — maps to data-delay CSS attribute */
  delay?: 0 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 500;
  /** Fraction of element visible before triggering (0–1) */
  threshold?: number;
  as?: ElementType;
}

export default function AnimateIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
  as: Tag = "div",
}: AnimateInProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el); // fire once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const AnyTag = Tag as any;

  return (
    <AnyTag
      ref={ref}
      className={`reveal ${className}`}
      data-dir={direction}
      data-delay={delay > 0 ? String(delay) : undefined}
    >
      {children}
    </AnyTag>
  );
}