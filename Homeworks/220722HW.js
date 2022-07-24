// 핸드폰 번호 가리기
let phone_number = "01026482367";

function solution1(phone_number) {
    var answer = '';
    let cut = "*";
    answer = cut.repeat(phone_number.length-4) + phone_number.slice(-4);
    return answer;
}
console.log("<핸드폰 번호 가리기>");
console.log(solution1(phone_number));
console.log("");





// 자릿수 더하기
let n=1234;

function solution2(n){
    var answer = 0;
    let str = [...String(n)];
    for (i=0; i<str.length; i++) {
        answer += Number(str[i]);
    }
    return answer;
}
console.log("<자릿수 더하기>");
console.log(solution2(n));
console.log("");




// 없는 숫자 더하기
let numbers = [1,2,3,4,6,7,8,0];

function solution3(numbers) {
    var answer = 0;
    let stndrd = [0,1,2,3,4,5,6,7,8,9];
    let notNum = stndrd.filter((item) => !(numbers.includes(item)));
    for(let item of notNum) {
        answer += item;
    }
    return answer;
}
console.log("<없는 숫자 더하기>")
console.log(solution3(numbers));
console.log("");




// 나누어 떨어지는 숫자 배열
let arr = [3,2,6];
let divisor = 10;

function solution(arr, divisor) {
    var answer = [];
    answer = arr.filter( num => num % divisor == 0);
    answer.sort(function(a,b) {
        return a - b;
    });
    if (answer.length == 0) {
        answer = [-1];
    }
    return answer;
}
console.log("<나누어 떨어지는 숫자 배열>")
console.log(solution(arr,divisor));