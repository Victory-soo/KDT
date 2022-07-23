// 문자열 길이 = 문자열.length();
const str = "Hello, world";
console.log(str.length);
// 12



// 문자열 위치 찾기 = 문자를 찾을 문자열.indexOf(“찾을 문자열”);
const str1 = "Hello, world";
console.log(str1.indexOf("world"));
// 7



// 문자열 자르기 = 문자열.slice(시작위치, 종료위치);
const str2 = "Hello, world";
console.log(str2.slice(0, 5));
//Hello



// 문자열 바꾸기 = 문자열.replace(“찾을 문자” , “바꿀 문자”);
const str3 = "Hello, world";
console.log(str3.replace("world", "뽀로로"));
// Hello, 뽀로로



// 문자열 반복하기 = 문자열.repeat(반복 횟수);
let str4 = "우영";
let longStr = str4.repeat(10) + "우";
console.log(longStr);



// 앞뒤 공백문자 제거 = 문자열.trim();
const str5 = "           Hello, world            ";
console.log(str5.trim());
// Hello, world



const pi = 3.14159265358979;
// parseInt = 정수형
let int = parseInt(pi);

// parseFloat = 부동소수
let float = parseFloat(pi);

console.log(int);
console.log(float);
console.log(typeof int, typeof float);



console.log("abs: ", Math.abs(-999));       // 절대값

console.log("min: ", Math.min(10, 33));     // 작은 값
console.log("min: ", Math.min(10, 33, 6, 2, -1));   // 작은 값

console.log("max: ", Math.max(10, 33));     // 큰 값
console.log("max: ", Math.max(10, 33, 2, 1, 77));   // 큰 값

console.log("ceil: ", Math.ceil(3.14));     // 올림

console.log("floor: ", Math.floor(3.14));   // 버림

console.log("round: ", Math.round(3.6));    // 반올림
console.log("round: ", Math.round(3.4));    // 반올림

console.log("random: ", Math.random());     // 랜덤



let nums = [-1.23, 13, 14.52, -33.53, 30];
let max = Math.max(...nums);
let min = Math.min(...nums);
console.log(Math.floor(max));
console.log(Math.floor(min));
console.log((Math.abs(max)+Math.abs(min))/2);

let randomNumber = Math.floor(Math.random()*100);
console.log(randomNumber);