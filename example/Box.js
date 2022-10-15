import React, { forwardRef, useState, useEffect } from 'react';
import './Box.css';

const Box = forwardRef(({ children, highlight, ...rest }, ref) => {
    const [highlighted, setHighlighted] = useState(false);
    useEffect(() => {
        if (highlight) {
            setHighlighted(true);
        }
    }, [highlight]);

    return (
        <div
            ref={ref}
            {...rest}
            className={highlighted ? 'highlight' : 'wrapper'}
            onTransitionEnd={() => setHighlighted(false)}
        >
            {children}
        </div>
    );
});

export default Box;