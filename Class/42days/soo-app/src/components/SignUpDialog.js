import React from "react";
import Dialog from "./Dialog";

export default function SignUpDialog() {
    return (
        // <Dialog color="navy" title="안내" message="회원 가입이 필요합니다.">
        <Dialog color="navy" title={<button onClick={() => alert("Welcome!")}>Welcome</button>} message="회원 가입이 필요합니다.">
            {/* <Dialog title={<button onClick={() => alert("Welcome!")}>Welcome</button>} message="회원 가입이 필요합니다."> */}
            <a href="https://naver.com">회원 가입 페이지로 이동</a>
        </Dialog>
    );
}
