import logo from "./logo.svg";
import "./App.css";
import StatePractice from "./components/StatePractice";
import Counter from "./components/Counter";
import MainHeader from "./components/MainHearder";
import CustomList from "./components/CustomList";
import CustomObject from "./components/CustomObject";
import ChangeObj from "./components/ChangeObj";
import TestCss from "./components/TestCss";
import TestStyled from "./components/TestStyled";

function App() {
    const nameArr = ["김치퐁", "채채퐁", "재밌어"];
    const sooObj = [
        {
            name: "Soo",
            age: "26",
            nickName: "victory",
        },
        {
            name: "Luffy",
            age: "20",
            nickName: "pirateKing",
        },
        {
            name: "Usob",
            age: "21",
            nickName: "Pinokio",
        },
    ];
    return (
        <div className="App">
            <StatePractice />
            <Counter />
            <MainHeader text="Go To Naver" name="Soo" href="http://naver.com" />
            <CustomList arr={nameArr} />
            <ChangeObj objArr={sooObj} />
            <TestCss />
            <TestStyled />
        </div>
    );
}

export default App;
