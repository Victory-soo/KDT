import logo from "./logo.svg";
import "./App.css";
import ReactFragment from "./components/ReactFragment";
import TableColums from "./components/TableColumn";
import Comparing from "./components/Comparing";
import TestUseEffect from "./components/TestUseEffect";
import Timer from "./components/Timer";
import { useRef, useEffect, useState } from "react";
import PracticeTimer from "./components/PracticeTimer";
import TestUseMemo from "./components/TestUseMemo";
import UsingUseMemo from "./components/UsingUseMemo";

function App() {
    const [show, setShow] = useState(false);
    const onFocus = useRef();

    useEffect(() => {
        onFocus.current.focus();
    });
    return (
        <div className="App">
            <h1>안녕하세요</h1>
            <table border="5">
                <tbody>
                    <tr>
                        <td>1</td>

                        <td>2</td>

                        <td>3</td>
                    </tr>
                    <tr>
                        <TableColums />
                    </tr>
                </tbody>
            </table>
            <Comparing />
            <TestUseEffect />

            <br />
            <br />
            <br />
            <br />
            {/* {show && <Timer />}
            <button onClick={() => setShow(!show)}>Show !</button> */}
            <br />
            {show && <PracticeTimer />}
            <button ref={onFocus} onClick={() => setShow(!show)}>
                {show ? "숨기기" : "보이기"}
            </button>

            <br />
            <br />
            <br />
            <br />
            <TestUseMemo />
            <br />
            <br />
            <br />
            <br />
            <UsingUseMemo />
        </div>
    );
}

export default App;
