import logo from "../logo.svg";
import React from "react";
import styled, { keyframes } from "styled-components";

const RootDiv = styled.div`
    text-align: center;
`;

const AppHeader = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const AppLogo = styled.img`
    height: 40vmin;
    pointer-events: none;
    animation: ${spin} infinite 20s linear;
`;

const MyA = styled.a`
    color: #61dafb;
`;

export default function StyledAppjs() {
    return (
        <RootDiv>
            <AppHeader>
                <AppLogo src={logo} alt="app" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <MyA href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </MyA>
            </AppHeader>
        </RootDiv>
    );
}
