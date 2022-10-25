import React, { useRef, useEffect, useState, forwardRef, useCallback } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import useClickOutside from '../index.js';
import pkgInfo from '../package.json';
import Box from './Box';
import Portal from './Portal';
import NewWindow from './NewWindow';

const Element = ({ children }) => {
    const [clicked, setClicked] = useState(false);
    const handler = useCallback(() => setClicked(Symbol('clicked')), []);
    const props = useClickOutside(handler);

    return <Box {...props} highlight={clicked}>{children}</Box>;
};

const ElementWithPortal = ({ children }) => {
    const [clicked, setClicked] = useState(false);
    const handler = useCallback(() => setClicked(Symbol('clicked')), []);
    const props = useClickOutside(handler);

    return <Box {...props} highlight={clicked}>
        {children}
        <Portal>
            <Box highlight={clicked}>{children} portal</Box>
        </Portal>
    </Box>;
};

const App = () => {
    const [open, setOpen] = useState();

    return (
        <>
            <h1>{pkgInfo.name}</h1>
            <p><a href={pkgInfo.homepage} target="_blank">README</a> | <a href="https://github.com/trans-eu/use-click-outside/tree/main/example">Code</a></p>
            <Element>Element #1</Element>
            <ElementWithPortal>Element #2</ElementWithPortal>
            <button onClick={() => setOpen(prev => !prev)}>{open ? 'close' : 'open'} new window</button>
            {open && (
                <NewWindow width={600} height={400} onClose={setOpen}>
                    <Element>Element in external window</Element>
                </NewWindow>
            )}
        </>
    )
};

export default App;
