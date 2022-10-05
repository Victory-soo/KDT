import React from "react";

export default function WelcomeDialogButton(props) {
    return (
        <button
            onClick={() => {
                alert(props.alertMessage);
            }}
        >
            {props.content}
        </button>
    );
}
