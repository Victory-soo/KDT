import { useState, useRef } from "react";

export default function TestRef() {
    const [text, setText] = useState("안녕하세요.");

    // 값이 전부 useRef() => inputValue로 감
    const inputValue = useRef();

    const onChangeText = () => {
        console.log(inputValue);
        let inputText = inputValue.current.value;
        setText(inputText);
    };

    return (
        <div>
            <h1>{text}</h1>
            <input
                ref={inputValue}
                onChange={(e) => {
                    onChangeText();
                }}
            ></input>
        </div>
    );
}
