function helloKDT() {
    console.log("Hello, KDT");
}
helloKDT();

function returnFunc() {
    return 123;
}

let num = returnFunc();
console.log(num);


// 기명함수 (이름 있음)
function hello() {
    console.log("Hello");
}

// 익명함수 (이름 없음)
let world = function() {
    console.log("World")
}

hello();
world();