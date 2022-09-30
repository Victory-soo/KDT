import { useEffect } from "react";

export default function Timer() {
    // 최초 한번만 실행
    useEffect(() => {
        // 1초에 한번씩 console.log 찍어주는 함수
        const timer = setInterval(() => {
            console.log("타이머 실행중");
        }, 1000);

        // useEffect 함수 내부에 return 값 = UnMount 설정
        return () => {
            // setInterval을 취소시키는 함수 = clearInterval
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <h1>타이머가 실행중 입니다.</h1>
        </>
    );
}
