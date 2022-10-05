import React from "react";

export default function Where() {
    const where = prompt("Where are you want to go?    left / right");

    return <>{where === "left" ? <h1>왼쪽 입니다.</h1> : <h1>오른쪽 입니다.</h1>}</>;
    // if (where === "left") {
    //     return (
    //         <>
    //             <h1>왼쪽 입니다.</h1>
    //         </>
    //     );
    // } else if (where === "right") {
    //     return (
    //         <>
    //             <h1>오른쪽 입니다.</h1>
    //         </>
    //     );
    // } else {
    //     return (
    //         <>
    //             <h1>잘못된 값을 입력하셨습니다.</h1>
    //         </>
    //     );
    // }
}
