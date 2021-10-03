import { useEffect, useRef, useCallback } from 'react';

const noop = () => {};

const useClickOutside = (handler = noop) => {
    const lastTarget = useRef();
    const containerRef = useRef();

    useEffect(() => {
        let timeoutId;
        const clickHandler = (event) => {
            timeoutId = setTimeout(() => {
                if (lastTarget.current !== event.target) {
                    handler();
                    lastTarget.current = null;
                }
            }, 0);
        };

        const targetDocument = containerRef.current.ownerDocument;
        targetDocument.addEventListener('click', clickHandler, { capture: true });

        return () => {
            clearTimeout(timeoutId);
            lastTarget.current = null;
            targetDocument.removeEventListener('click', clickHandler, { capture: true });
        };
    }, [handler]);

    const onClickCapture = useCallback((event) => {
        lastTarget.current = event.target;
    }, []);

    return { ref: containerRef, onClickCapture };
};

export default useClickOutside;
