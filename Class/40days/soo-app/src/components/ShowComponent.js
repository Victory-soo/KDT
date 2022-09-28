import { useState } from "react";

export default function ShowComponent(props) {
    const [content, changeContent] = useState("누르면 바뀝니다.");
    const [btn, changebtn] = useState("1번 나와라");

    const onChange = () => {
        if (content === "누르면 바뀝니다.") {
            changeContent("1번 클릭");
            changebtn("2번 나와라");
        } else if (content === "1번 클릭") {
            changeContent("2번 클릭");
            changebtn("1번 나와라");
        } else if (content === "2번 클릭") {
            changeContent("1번 클릭");
            changebtn("2번 나와라");
        }
    };

    return (
        <div>
            <h1>{content}</h1>
            <button onClick={onChange}>{btn}</button>
        </div>
    );
}
