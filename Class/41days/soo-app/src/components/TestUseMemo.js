import { useMemo, useState } from "react";

export default function TestUseMemo() {
    const hardCalculate = (number) => {
        console.log("어려운 계산 시작합니다.");
        let sum = 0;
        for (let i = 0; i < 1000001; i++) {
            sum = sum + 1;
        }

        return number + sum;
    };

    const [hardNumber, setHardNumber] = useState(1);
    const hardSum = hardCalculate(hardNumber);

    const easyCalculate = (number) => {
        console.log("쉬운 계산 시작합니다.");
        let sum = 1000000 + number;
        return sum;
    };

    const [easyNumber, setEasyNumber] = useState(1);
    const easySum = hardCalculate(easyNumber);

    return (
        <>
            <h1>시간이 오래 걸리는 계산</h1>
            <input
                type="number"
                value={hardNumber}
                onChange={(e) => {
                    setHardNumber(parseInt(e.target.value));
                }}
            ></input>
            <span> + 1000000 = {hardSum} </span>
            <br />
            <br />
            <br />
            <h1>시간이 짧게 걸리는 계산</h1>
            <input
                type="number"
                value={easyNumber}
                onChange={(e) => {
                    setEasyNumber(parseInt(e.target.value));
                }}
            ></input>
            <span> + 1000000 = {easySum} </span>
        </>
    );
}
