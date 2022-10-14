# useClickOutside

A React hook for detecting click events outside of an element.


## Usage

```jsx
const { ref, onClickCapture } = useClickOutside(callback);
```

The only argument to the hook is a callback function that gets invoked when a click event is detected outside of an element.

The hook returns an object with `ref` and `onClickCapture` properties that should be passed to an element.

Property         | Description
---------------- | ------------
`ref`            | A ref object created by the [useRef](https://reactjs.org/docs/hooks-reference.html#useref) hook with an uninitialized `.current` property.
`onClickCapture` | An event handler for the click event in the capture phase.


## Example

```jsx
import React, { useCallback } from 'react';
import useClickOutside from '@trans.eu/use-click-outside';

const Example = () => {
  const onClickOutside = useCallback(() => {
    console.log('Click outside');
  }, []);

  const { ref, onClickCapture } = useClickOutside(onClickOutside);

  return (
    <div ref={ref} onClickCapture={onClickCapture}>
      Element
    </div>
  );
}
```
