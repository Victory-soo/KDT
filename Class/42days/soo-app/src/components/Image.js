import React from "react";
import catImg from "../images/123.jpg";

export default function Image() {
    return (
        <>
            {/* public 폴더 static 처리 되어있음 */}
            <img src={"/images/123.jpg"} alt="cat" />

            {/* src 폴더는 상대경로 가능 */}
            <img src={catImg} alt="cat" />
        </>
    );
}
