import React from "react";

export default function Dialog(props) {
    return (
        // <div style={{ backgroundColor: props.color }}>
        <div style={typeof props.color !== "undefined" ? { backgroundColor: props.color } : { backgroundColor: "orange" }}>
            {typeof props.title === "string" ? <h1>{props.title}</h1> : props.title}
            <p>{props.message}</p>
            {typeof props.color !== "undefined" ? null : alert("색상 값이 없습니다.")}
            {props.children}
        </div>
    );
}
