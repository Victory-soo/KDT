import { useRef, useState } from "react";

const Comparing = () => {
    const [countState, setState] = useState(0);
    const countRef = useRef(0);
    let countVar = 0;
    const [render, setRender] = useState(0);

    const countUpState = () => {
        setState(countState + 1);
        console.log("State: ", countState);
    };

    const countUpRef = () => {
        // input Tag에 countRef가 걸려있을 때는 countRef.current.value 값
        // countRef가 아니라 countRef.current
        countRef.current++;
        console.log("Ref: ", countRef.current);
    };

    const countUpVar = () => {
        countVar++;
        console.log("Variable: ", countVar);
    };

    const reRender = () => {
        setRender(render + 1);
    };

    return (
        <>
            <h1>State: {countState}</h1>
            <h1>Ref: {countRef.current}</h1>
            <h1>Variable: {countVar}</h1>
            <button onClick={countUpState}>+State Up</button>
            <button onClick={countUpRef}>+Ref Up</button>
            <button onClick={countUpVar}>+Var Up</button>
            <button onClick={reRender}>Rendering</button>
        </>
    );
};

export default Comparing;
