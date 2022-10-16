import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
    const domNode = useRef();
    if (!domNode.current) {
        const element = document.createElement('div');
        document.body.append(element);
        domNode.current = element;
    }

    useEffect(() => () => {
        domNode.remove();
    }, []);

    return createPortal(children, domNode.current);
};

export default Portal;
