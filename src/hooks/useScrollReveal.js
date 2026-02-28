/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

const useScrollReveal = (threshold = 0.15) => {
    const ref = useRef(null);
    const isVisibleRef = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisibleRef.current) {
                    isVisibleRef.current = true;
                    entry.target.classList.add("reveal-active");
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    return ref;
};

export default useScrollReveal;