import { useEffect, useRef, useState } from "react";

const useInView = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [ref.current, JSON.stringify(options)]);

  return [ref, isIntersecting] as const;
};

export default useInView;
