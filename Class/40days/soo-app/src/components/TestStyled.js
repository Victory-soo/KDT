import styled from "styled-components";

const Mydiv = styled.div`
    background-color: black;
    color: white;
`;

const MyHeading = styled.h1`
    color: blue;
`;

const MySpan = styled.span`
    background-color: pink;
    color: black;
`;

export default function TestStyled() {
    return (
        <Mydiv>
            <MyHeading> h1 태그 입니다.</MyHeading>
            <MySpan> span 태그 입니다.</MySpan>
        </Mydiv>
    );
}
