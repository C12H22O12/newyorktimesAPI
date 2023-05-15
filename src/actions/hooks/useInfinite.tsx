import { useCallback, useEffect, useRef } from "react";

function useInfinite(onIntersect) {
  const ref = useRef(null);

  const handleIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer;

    if (ref.current) {
      observer = new IntersectionObserver(handleIntersect, { threshold: 0.3 });
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref, handleIntersect]);

  return ref;
}

export default useInfinite;
