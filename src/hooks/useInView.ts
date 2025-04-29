import { useEffect, useRef, useState } from "react";

const useInView = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

export default useInView;
