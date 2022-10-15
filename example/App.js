import React, { useRef, useEffect, useState, forwardRef, useCallback } from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import useClickOutside from '../index.js';
import pkgInfo from '../package.json';
import Box from './Box';
import Portal from './Portal';

const Element = () => {
    const [clicked, setClicked] = useState(false);
    const handler = useCallback(() => setClicked(Symbol('clicked')), []);
    const props = useClickOutside(handler);

    return <Box {...props} highlight={clicked}>Element #1</Box>;
};

const ElementWithPortal = ({ children }) => {
    const [clicked, setClicked] = useState(false);
    const handler = useCallback(() => setClicked(Symbol('clicked')), []);
    const props = useClickOutside(handler);

    return <Box {...props} highlight={clicked}>
        Element #2
        <Portal>
            <Box highlight={clicked}>Element #2 portal</Box>
        </Portal>
    </Box>;
};

const App = () => (
    <>
        <h1>{pkgInfo.name} ({pkgInfo.version})</h1>
        <p><a href={pkgInfo.homepage} target="_blank">README</a> | <a href="https://github.com/trans-eu/use-click-outside/tree/main/example">Code</a></p>
        <Element />
        <ElementWithPortal />
    </>
);

export default App;
