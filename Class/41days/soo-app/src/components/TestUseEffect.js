import { useEffect, useRef, useState } from "react";

export default function TestUseEffect() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("입력하시오.");
    const inputValue = useRef();
    const onInputChange = () => {
        setText(inputValue.current.value);
    };

    const onButtonClick = () => {
        setCount(count + 1);
    };

    // [빈배열] 입력 시, 최초 렌더링 시에만 반응
    useEffect(() => {
        console.log("🔴최초 렌더링 할 때 실행되는 useEffect");
    }, []);

    // [배열]값으로 넣어줘야함
    // [값]이 변화할 때마다 실행됨
    useEffect(() => {
        console.log(" 🟠🟡버튼 클릭 + 키 입력 시 실행되는 useEffect");
    }, [count, text]);

    useEffect(() => {
        console.log("🟢렌더링 할 때마다 실행되는 useEffect");
    });

    return (
        <>
            <h1>{count}</h1>
            <button onClick={onButtonClick}>Press +1</button>
            <br />
            <br />
            <br />
            <input ref={inputValue} onChange={onInputChange}></input>
            <h1>{text}</h1>
        </>
    );
}
