export default function CustomList(props) {
    return (
        <div>
            <ul>
                {props.arr.map((el) => {
                    return <li>{el}</li>;
                })}
            </ul>
        </div>
    );
}
