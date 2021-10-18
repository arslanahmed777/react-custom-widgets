import { useState, useDebugValue } from 'react'
function useNamedState(name, initialValue) {
    const [value, setValue] = useState(initialValue);
    //useDebugValue(`${name}: ${value}`);
    // useDebugValue({ state: name }, value);
    useDebugValue(name);
    return [value, setValue];
}
export { useNamedState }