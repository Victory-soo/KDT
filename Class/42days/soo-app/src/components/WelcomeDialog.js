import React from "react";
import Dialog from "./Dialog";
import WelcomeDialogButton from "./WelcomeDialogButton";

export default function WelcomeDialog() {
    return (
        <>
            <Dialog color="lightpink" title="Welcome! soo-app" message="Please give me a happy."></Dialog>
            {/* <WelcomeDialogButton alertMessage="Thanks to click." content="Click Me!" /> */}
            <WelcomeDialogButton alertMessage="Thanks to click me." content="Click Me !" />
        </>
    );
}
