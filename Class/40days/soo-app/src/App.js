import logo from "../src/logo.svg";
import StyledAppjs from "./components/StyledAppjs";
import ConditionalRender from "./components/ConditionalRenter";
import { useState } from "react";
import ShowComponent from "./components/ShowComponent";
import PracticeOne from "./components/PracticeOne";
import PracticeTwo from "./components/PracticeTwo";
import TestRef from "./components/TestRef";
import ChangeFocus from "./components/ChangeFocus";

function App() {
    // const [condition, setCondition] = useState("보이기");

    // const onChange = () => {
    //     condition === "보이기" ? setCondition("감추기") : setCondition("보이기");
    // };

    // const conditionRender = condition === "감추기" && <ConditionalRender />;

    const [condition, setCondition] = useState("1번");

    const onChange = () => {
        condition === "1번" ? setCondition("2번") : setCondition("1번");
    };
    return (
        <div className="App">
            {/* <StyledAppjs /> */}
            {/* {conditionRender}
            <button onClick={onChange}>{condition}</button> */}
            {/* <ShowComponent /> */}

            {condition === "1번" ? <PracticeOne text={condition} /> : <PracticeTwo text={condition} />}
            <button onClick={onChange}>{condition}</button>

            <TestRef />
            <ChangeFocus />
        </div>
    );
}

export default App;
