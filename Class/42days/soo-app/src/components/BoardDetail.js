import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "./Header";

export default function BoardDetail() {
    // const params = useParams();
    const { BoardID } = useParams();
    const location = useLocation();

    return (
        <>
            <Header />
            <h2> {BoardID}번 게시글 내용입니다.</h2>
            <p>Search : {location.search}</p>
            <p>Pathname : {location.pathname}</p>
            <p>Hash : {location.hash}</p>
        </>
    );
}
