import { useDispatch, useSelector } from "react-redux";
import React from "react";

export default function Test() {
    const weight = useSelector((state) => state);
    const dispatch = useDispatch();
    return (
        <>
            <h1>당신의 몸무게는 {weight}kg 입니다.</h1>
            <button
                onClick={() => {
                    dispatch({ type: "증가" });
                }}
            >
                증가
            </button>

            <button
                onClick={() => {
                    dispatch({ type: "감소" });
                }}
            >
                감소
            </button>
        </>
    );
}
