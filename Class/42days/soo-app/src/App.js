import "./App.css";
// import Where from "./components/Where";
import Image from "./components/Image";
import Dialog from "./components/Dialog";
import WelcomeDialog from "./components/WelcomeDialog";
import FancyBorder from "./components/FancyBorder";
import SignUpDialog from "./components/SignUpDialog";
import Profile from "./components/Profile";
import Board from "./components/Board";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import BoardDetail from "./components/BoardDetail";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <Where /> */}
                <Image />
                <Dialog color="lightblue" title="Welcome! soo-app" message="Please give me a happy." />
                <FancyBorder color="blue">
                    {/* <h1>Hello, props.children</h1>
                    <p>This is very useful.</p> */}
                    <WelcomeDialog />
                </FancyBorder>

                <FancyBorder color="white">
                    <SignUpDialog />
                </FancyBorder>

                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/board/:BoardID" element={<BoardDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;
