import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: "-15% 0px -15% 0px",
            threshold: 0,
        });

        const { current } = domRef;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) {
                observer.unobserve(current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={domRef}
            className={`reveal-wrapper ${isVisible ? 'is-visible' : ''}`}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;