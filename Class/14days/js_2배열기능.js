// 원본 배열이 변합니다!! 주의하세요!!
let numbers = [1, 2, 3, 4, 5, 6];

// 마지막에 추가 push
numbers.push(7);
console.log(numbers);

// 처음에 추가 push
numbers.unshift(0);
console.log(numbers);

// 마지막 요소 삭제 & 반환 pop
console.log(numbers.pop());

// 첫 요소 삭제 & 반환 shift
console.log(numbers.shift());





const numbers1 = [1, 2, 3, 4];
const numbers2 = [1, 2, 3, 4];

// .splice(시작점, 자를 개수, 자른 곳에 넣을 값)
console.log(numbers1.splice(0,2));
numbers2.splice(0, 2, 77)
console.log(numbers2);





// 배열.concat(합칠 배열)
// 원래 배열에 영향 X
let numberr = [1, 2, 3, 4, 5, 6];
let fruits = ["사과", "딸기", "수박"];

console.log(numberr.concat(fruits));
console.log(numberr);
console.log(fruits);





for(let i = 0; i<numberr.length; i++) {
    console.log(numberr[i]);
}

for(let j = 0; j<fruits.length; j++) {
    console.log(fruits[j]);
}





// for of 반복문
for(let item of numberr) {
// numberr에 있는 값을 item에 넣어준다.
    console.log(item);
}

for(let fruit of fruits) {
    console.log(fruit);
}





// [배열].forEach(function(배열 값, 인덱스값, 원본 배열))
numberr.forEach(function(item, index, array){
    console.log(item, index, array);
})

// forEach를 화살표 함수로
numberr.forEach( (item, index, array) => {
    console.log(item, index, array);
})
// 결과 = 1 0 (6) [1, 2, 3, 4, 5, 6]
//        2 1 (6) [1, 2, 3, 4, 5, 6]
//        3 2 (6) [1, 2, 3, 4, 5, 6]
//        4 3 (6) [1, 2, 3, 4, 5, 6]
//        5 4 (6) [1, 2, 3, 4, 5, 6]
//        6 5 (6) [1, 2, 3, 4, 5, 6]

fruits.forEach(function(fruitsItem, index, array) {
    console.log(fruitsItem, index, array);
})
// 결과 = 사과 0 (3) ['사과', '딸기', '수박']
//        딸기 1 (3) ['사과', '딸기', '수박']
//        수박 2 (3) ['사과', '딸기', '수박']





let box = [];
for (let i=0; i<=99; i++) {
    // box[i] = i+1;
    box.push(i+1);
}
console.log(box);

let sum1 = 0;
for (let j=0; j<=99; j++) {
    sum1 += box[j];
}
console.log(sum1);

let sum2 = 0;
for(let item of box) {
    sum2 += item;
}
console.log(sum2);

let sum3 = 0;
box.forEach(function(box) {
    sum3 += box;
})
console.log(sum3);





// [배열].map
numberr = [1, 2, 3, 4, 5, 6];
let fore = numberr.forEach(function(item) {
    return item;})
console.log(fore);
// 결과 = undefined (리턴값이 없음)


let map = numberr.map(function(item, index, array) {
    return item;})
console.log(map);


let map2 = numberr.map((item) => item);
console.log(map2);
// 결과 = [1, 2, 3, 4, 5, 6]
// forEach에 push 사용과 같지만 더 간단함
// 배열로 출력


fruits = ["사과", "딸기", "수박"];
let obj = fruits.map(function(item, index){
    return {
        id: index + 1,
        name: item,
    }});
console.log(obj);
// 결과 =  {id: 1, name: '사과'}
//         {id: 2, name: '딸기'}
//         {id: 3, name: '수박'}





// [배열].reduce = 배열의 합산
// return 값을 가지고 있다.
// return 값에 추가가 되는 값들을 계속 누적
// .reduce(function(값들의 합을 받을 변수, 배열의 값, 인덱스, 배열))

numberr = [1, 2, 3, 4, 5, 6];
let reduce = numberr.reduce(function(sum, item, index, array) {
    console.log(sum,item,index, array);
    return sum + item;
})
console.log(reduce);
// 결과 = 21

let box2 = [];
for (let i=1; i<=100; i++) {
    box2.push(i);
}

let reduce1 = box2.reduce(function(sum, item) {
    return sum + item;
})
console.log(reduce1);





// 문자열도 컴퓨터는 배열로 인식한다.
let str = "apple";
console.log([...str]);
// 결과 = ['a', 'p', 'p', 'l', 'e']

[...str].forEach(function(item, index ,array) {
    console.log(item, index, array);
})
// 결과 = a 0 ['a', 'p', 'p', 'l', 'e']
//        p 1 ['a', 'p', 'p', 'l', 'e']
//        p 2 ['a', 'p', 'p', 'l', 'e']
//        l 3 ['a', 'p', 'p', 'l', 'e']
//        e 4 ['a', 'p', 'p', 'l', 'e']




// [배열].filter(function(매개변수) {조건})
// [배열].filter((매개변수) => 조건)
// 조건에 부합하는 배열 요소만 반환
numberr = [1, 2, 3, 4, 5, 6];

let arr = numberr.filter(function(item) {
    return item >3;});
console.log(arr);
// 결과 = [4, 5, 6]


let arr2 = numberr.filter((item) => item < 3);
console.log(arr2);
// 결과 = [1, 2]


const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result1 = words.filter(function(item) {
    return item.length >= 6 });
const result2 = words.filter((item) => item.length >= 6 );
console.log(result1);
console.log(result2);
// 결과 = ['exuberant', 'destruction', 'present']
// return 값이 true 인 것에 반환





// [배열].includes(요소)
// 해당 배열에 지정한 요소가 있는지 확인하는 메소드
numberr = [1, 2, 3, 4, 5, 6];
console.log(numberr.includes(3));
// 결과 = true


let fruits1 = ["사과", "딸기", "파인애플", "수박", "참외", "오렌지", "자두", "망고"];
let fruits2 = ["수박", "사과", "참외", "오렌지", "파인애플", "망고"];

let same =[];
let diff =[];

same = fruits1.filter((item) => fruits2.includes(item));
// fruits1.forEach(function(item) {
//     if(fruits2.includes(item)) {
//         same.push(item);
//     }
// })
console.log(same);


diff = fruits1.filter((item)=> !(fruits2.includes(item)));
// fruits1.forEach(function(item) {
//     if(!(fruits2.includes(item))) {
//         same.push(item);
//     }
// })
console.log(diff);





// [배열].find = 배열에 특정 값이 있는지 찾고 반환
// [배열].findIndex = 배열에 특정 값이 있는지 찾고 위치를 반환

const fruitss = ["Apple", "Banana", "Cherry"];
const results1 = fruitss.find(item => {
    return /^A/.test(item);})
//  /^A/ = 대문자 A로 시작

const results2 = fruitss.findIndex(item => {
    return /^C/.test(item);})
//  /^C/ = 대문자 C로 시작
console.log(results1);
console.log(results2);


function solution(arr) {
    var answer = 0;
    let sum = 0;
    let reduce = arr.reduce(function(sum, item) {
        return sum + item;
    })
    answer = reduce / arr.length;
    return answer;
}