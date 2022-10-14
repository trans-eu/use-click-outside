import { useLayoutEffect, useRef, useCallback } from 'react';

const useClickOutside = (onOutsideClick) => {
    const containerRef = useRef();
    const callbackTimeoutId = useRef();

    useLayoutEffect(() => {
        if (!onOutsideClick) {
            return undefined;
        }

        let timeoutId;
        const clickHandler = () => {
            // This event handler will always be called, as long as the Component using this hook
            // is mounted. It will be called each time click event is captured in the document.
            // Because it is attached to the document object, it will be called before the React
            // onClickCapture event handler which is attached to the 'root' element (document's descendant).
            // That's why we need to postpone it one loop cycle, to make sure the React's handler
            // executes first.
            timeoutId = setTimeout(onOutsideClick, 0);
            callbackTimeoutId.current = timeoutId;
        };

        const targetDocument = containerRef.current.ownerDocument;
        targetDocument.addEventListener('click', clickHandler, { capture: true });

        return () => {
            // Clear all things that could be leaked in between applying effect.
            clearTimeout(timeoutId);
            targetDocument.removeEventListener('click', clickHandler, { capture: true });
        };
    }, [onOutsideClick]);

    const onClickCapture = useCallback(() => {
        // This is React's event handler. If it executes, it means that there was no outside click
        // and the current timeout is cleared

        clearTimeout(callbackTimeoutId.current);
    }, []);

    return { ref: containerRef, onClickCapture };
};

export default useClickOutside;
