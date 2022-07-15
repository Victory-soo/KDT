let pororo = {
    name: "뽀로로",
    height: 70,
    weight: 50,
    gender: "male",
    sayHeight,
}

let luffy = {
    name: "루피",
    height: 180,
    weight: 70,
    gender: "male",
    sayHeight,
}

function sayHeight() {
    console.log(`${this.name}의 키는 ${this.height}cm 입니다.`);
}

pororo.sayHeight();
luffy.sayHeight();





// this
function sayHello() {
    console.log(`Hello, I'm ${this.name}.`);
    console.log(this);
}

const boy = {
    name: "Mike",
    sayHello,
}

const girl = {
    name: "Anna",
    sayHello,
}

boy.sayHello();
girl.sayHello();





// 화살표함수 => this 사용 시 전역객체 참조
//                           브라우저 환경 : window,
//                           Node js : global
let sayhello = () => {
    console.log(`Hello, I'm ${this.name}`);
    console.log(this);
}

let boy1 = {
    name: "Mike",
    sayhello
}

let girl1 = {
    name: "Jane",
    sayhello

}
boy1.sayhello();
girl1.sayhello();
    