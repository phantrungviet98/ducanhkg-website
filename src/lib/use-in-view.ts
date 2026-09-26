import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin ?? "0px 0px -48px 0px";
  const threshold = options?.threshold ?? 0.1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, inView };
}
