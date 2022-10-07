// 초기 값 설정
const initState = {
    list: [
        {
            id: 0,
            text: "졸업 취업 뿌수자",
            done: false,
        },
        {
            id: 1,
            text: "운동화 AS 확인",
            done: false,
        },
        {
            id: 2,
            text: "만두 먹기",
            done: false,
        },
    ],
};

// Action type 정의하기
const CREATE = "todo/CREATE";
const DONE = "todo/DONE";

// Action 함수 생성하기
export function create(payload) {
    return {
        type: CREATE,
        payload,
    };
}

export function done(id) {
    return {
        type: DONE,
        id,
    };
}
// reducer 선언하기
export default function todo(state = initState, action) {
    return state;
}
