import { useEffect, useRef, useState } from "react";

export default function PracticeTimer() {
    let showTime = useRef(0);
    const [render, setRender] = useState(0);

    const reRender = () => {
        setRender(render + 1);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            showTime.current++;
            console.log(showTime.current);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <h1>TIME </h1>
            <h1>{showTime.current}</h1>
            <button onClick={reRender}>시간</button>
        </>
    );
}
