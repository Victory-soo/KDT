import { useRef } from "react";
import { useSelector } from "react-redux";

export default function Todolist() {
    const list = useSelector((state) => state.todo.list);
    const inputRef = useRef();

    return (
        <section>
            <h1> 할 일 목록</h1>
            <div>
                <input type="text" ref={inputRef} />
                <button>추가</button>
            </div>
            <ul>
                {list.map((el) => {
                    return <li key={el.id}>{el.text}</li>;
                })}
            </ul>
        </section>
    );
}
