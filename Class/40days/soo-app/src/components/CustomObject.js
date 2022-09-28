export default function CustomObj(props) {
    const { name, age, nickName } = props.obj;

    return (
        <div>
            {props.obj.map((el) => {
                return (
                    <div>
                        <h1> 이름 : {el.name}</h1>
                        <h1> 나이 : {el.age}</h1>
                        <h1> 별명 : {el.nickName}</h1>
                    </div>
                );
            })}
        </div>
    );
}
