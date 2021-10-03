import { useEffect, useRef, useCallback } from 'react';

const noop = () => {};

const useClickOutside = (fn = noop) => {
    const lastTarget = useRef();
    const containerRef = useRef();

    useEffect(() => {
        let timeoutId;
        const clickHandler = (event) => {
            // This event will be called each time click event is captured in the target owner document.
            // Because it is attached to the document object, it will be called before the React
            // onClickCapture event handler, which is attached to the app root element (document's descendant).
            // That's why check must be postponed - to make sure the React's handler executes first.
            timeoutId = setTimeout(() => {
                // If event target is different than last react handler target
                // this muse be an outside click event.
                if (lastTarget.current !== event.target) {
                    fn();
                    // Cleanup event target to prevent memory leaks.
                    lastTarget.current = null;
                }
            }, 0);
        };

        // use ownerDocument because node could be portaled into other browser window
        const targetDocument = containerRef.current.ownerDocument;
        targetDocument.addEventListener('click', clickHandler, { capture: true });

        return () => {
            // Clear all things that could be leaked.
            clearTimeout(timeoutId);
            lastTarget.current = null;
            targetDocument.removeEventListener('click', clickHandler, { capture: true });
        };
    }, [fn]);

    const onClickCapture = useCallback((event) => {
        // Save event target on click to compare it with target in document dom click handler.
        lastTarget.current = event.target;
    }, []);

    return { ref: containerRef, onClickCapture };
};

export default useClickOutside;
