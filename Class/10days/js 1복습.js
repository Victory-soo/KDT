// 변수 이름 = 문자 / 숫자 / $ / _ 만 사용 가능 
//           =  첫번째 이름 = 숫자 불가
//           =  예약어 사용 불가 (let, var, const)
// 변수명 시작이 명사(num) > 변수
//              동사(showNumber) > 함수
//              is(isAge) > Boolean T/F
//              const 상수 값 > 대문자로

let num = 1;
let str = "이효석";
let bool = true;
let undef = undefined;
let nul = null;
let arr = [1, 2, 3];
let obj = {
    num: 1,
    str: "String"
}
console.log(typeof num);
console.log(typeof str);
console.log(typeof bool);
console.log(typeof undef);

console.log(typeof nul);
console.log(typeof arr);
console.log(typeof obj);
// 유의! nul / arr / obj = 다 object라고 표시됨

console.log(`${typeof 1} isn't ${typeof "정승수"} data type.`);
console.log("typeof 를 " + (typeof true) + " 이나 " + `${nul}` + " 에 사용하면, " + (typeof {}) + " 결과를 얻을 수 있습니다.");





// let mathScore = Number(prompt("수학 점수를 입력하시오."));
let mathScore = "77";
// let engScore = Number(prompt("영어 점수를 입력하시오."));
let engScore = "88";

let avgScore = (Number(mathScore) + Number(engScore)) / 2;
console.log(avgScore);





let nameArr = ["김아무개", "김수환무" , "거북이와 두루미" , "척척박사"];
for(let i = 0; i < nameArr.length; i++) {
    console.log(`${i+1}번째 이름은 ${nameArr[i]} 입니다.`);
}





let sq = 81;
console.log(Math.sqrt(sq));
// 제곱근 = Math.sqrt();





let numb = 10;
console.log(++numb);
console.log(--numb);
console.log(numb-=5);
console.log(numb/=2.5);
console.log(numb*=15);





let a = 10;
let b = "10";
// 비교연산자 ==
console.log( a == b );
// 일치연산자 ===
console.log( a === b );





let age = 20;
let name = "페레로로쉐";
let isAdult = age > 19;

if (!isAdult) {
    console.log("미성년자");
} else {
    console.log("성인");
}





let gender = "M";
name = "Tom";
isAdult = true;

if (gender === "F" && (name === "Jane" || isAdult === true)) {
    console.log("통과");
} else {
    console.log("돌아가");
}





isAdult = age>19;
let isVIP = true;
let isDrunken = false;
let isMoney = false;

if (((isAdult || isVIP == true) && !isDrunken) || isMoney ) {
    console.log("프리패스");
} else {
    console.log("못가");
}





for (i=1; i<10; i++) {
    for(let j=1; j<10; j++){
        console.log(`${i} x ${j} = ${i*j}`)
    }
}





// num = 0;

// for(num=0; num<=10000; num++) {
//     if(num%13===0 && num%2===1) {
//         console.log(num);
//     }
// }





// let innum= Number(prompt("숫자를 입력하시오."))

// for (let p=0; p<=innum; p+=13) {
//     if(p%13===0 && p%2===1) {
//         console.log(p);
//     }
// }





// do - while 문
i = 1;
do {
    console.log(`do-while 문에서 ${i} 번째 반복문을 시작합니다!`);
} while(i < 0)

// while 문
i = 1;
while(i < 0) {
    console.log(`while 문에서 ${i} 번째 반복문을 시작합니다!`);
}





// i=0;
// j=0;
// // innum=Number(prompt("숫자를 입력하시오."))
// for(let i = 0; i <+innum; i++) {
//     if(i%13===0 && i%2===0) {
//         j=j+i
//         continue;
//     }
// }
// console.log(j);





function sayHello(nickname) {
    console.log(`Hello, Mr. ${nickname}.`);
}
// sayHello(prompt("이름을 입력하세요."));

function square(number, up=3) {
    return number ** up;
}
console.log(typeof square(10,2));
console.log(square(10));





function getTriangleArea(bottom, height) {
    return (bottom * height) / 2;
}

function getCircleArea(r) {
    return (3.14*(r**2));
}

// 함수선언문 : 어디서든 호출가능
function getRange(a,b) {
    return Math.sqrt(a**2 + b**2);
}

// 함수표현식 : 코드에 도달하면 호출가능
let getRange1 = function(a,b) {
    return Math.sqrt(a**2 + b**2);
}

// 화살표함수 : 코드에 도달하면 호출가능
let getRange2 = (a,b) => {
    return Math.sqrt(a**2 + b**2);
}

console.log(getTriangleArea(5,2));
console.log(getCircleArea(10));
console.log(getRange2(3,4));



let getTriangleArea1 = function(bottom, height) {
    return (bottom * height) / 2;
}

let getCircleArea1 = (r) => {
    return (3.14*(r**2));
}





let kdt = ["승수", "민정", "의진", 
            "지현", "유림", "원", 
            "지훈", "효석", "영은", 
            "소민"];
console.log(kdt[5]);
console.log(kdt.length)

// 마지막에 추가
kdt.push("정승수짱");
console.log(kdt);

// 마지막 제거
kdt.pop();
console.log(kdt);

// 맨 앞에 추가
kdt.unshift("정승수짱");
console.log(kdt);

// 맨 앞 제거
kdt.shift();
console.log(kdt);

for (i=0; i<kdt.length; i++) {
    console.log(`${i+1} 번째 참여자 이름은 ${kdt[i]} 입니다.`);
}





let Hello = "H-e-l-l-o";

// .split("") : 문자를 ""인수를 기준으로 쪼개서 배열로 반환
console.log(Hello.split("-"));
// .reverse() : 배열 순서 반대로 반환
console.log(Hello.split("-").reverse());
// .join() : 배열 인수를 기준으로 병합해서 문자열을 반환
console.log(Hello.split("-").reverse().join(""));

let hellow = "hellow";
console.log(hellow.split(""));
console.log(hellow.split("").join("!"));





// 객체 생성
const superman = {
    name: "Clark",
    age: 33,
    }
// 객체 접근
console.log(superman.name);
console.log(superman.age);
// 객체 데이터 추가
superman.gender = "M";
superman["height"] = 187;
console.log(superman);
// 객체 데이터 삭제
delete superman.height;
console.log(superman);


const pororo = {
    name: "뽀로로",
    age: 7,
    fly: function() {
        console.log("날아가요");
    },
    wing(){
        console.log("날개없음");
    },
}

console.log(pororo.name);
console.log(pororo["age"]);

pororo.gender = "male";
console.log(pororo);

pororo.height = "180cm";
console.log(pororo);

delete pororo.gender;
console.log(pororo);





// 객체 특성 존재 여부 확인
console.log("name" in pororo);
console.log("height" in pororo);
console.log("job" in pororo);




// key = i와 비슷한 느낌
for(key in pororo) {
    console.log(key);
    console.log(pororo[key]);
}





pororo.fly();
pororo.wing();