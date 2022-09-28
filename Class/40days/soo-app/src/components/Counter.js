import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    const onClickPlus = () => {
        setCount(count + 1);
    };

    const onClickMinus = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={onClickMinus}>-1</button>
            <button onClick={onClickPlus}>+1</button>
        </div>
    );
}
