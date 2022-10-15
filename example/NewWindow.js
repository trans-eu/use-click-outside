import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const NewWindow = ({
    children,
    width,
    height,
    target,
    onClose,
}, ref) => {
    const [closed, setClosed] = useState(false);
    const container = useRef();

    if (!container.current) {
        const {
            availWidth,
            availHeight,
        } = window.screen;

        const windowFeatures = Object.entries({
            width,
            height,
            left: (availWidth - width) / 2,
            top: (availHeight - height) / 2,
        })
            .filter(([, value]) => value !== undefined)
            .map((item) => item.join('='))
            .join(',');

        const handle = window.open('', target, windowFeatures);
        container.current = handle.document.createElement('div');

        handle.document.body.append(...[...document.querySelectorAll('link[rel="stylesheet"]')].map((linkNode) =>
            Object.assign(handle.document.createElement('link'), {
                rel: 'stylesheet',
                href: linkNode.href,
            })
        ));
        
        handle.document.body.append(container.current);
        useImperativeHandle(ref, () => handle);
    }

    useEffect(() => {
        const handler = container.current.ownerDocument.defaultView;
        handler.addEventListener('beforeunload', () => {
            onClose();
            setClosed(true);
        }, { capture: true });

        return () => {
            handler.close();
        };
    }, []);

    if (closed) {
        return null;
    }

    return createPortal(children, container.current);
};

export default forwardRef(NewWindow);
