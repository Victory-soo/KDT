// @ts-check

// 이 함수는 문자열 형태의 이름과 숫자 형태의 나이를 받아서
// 문자열로 출력해주는 함수입니다.

// /**  */로 JSDOC 사용하기

// /**
//  * @param {string} name
//  * @param {number} age
//  * @returns 이름과 나이를 받아서 문자열로 출력
//  * @todo 메모처럼 사용 가능
//  * @deprecated 더이상 해당 기능을 사용하지 않을 때 사용
//  */
// function hello(name, age) {
//   return `내 이름은 ${name} 이고, 나이는 ${age} 입니다.`;
// }

// console.log(hello('정승수', 26));

// /**
//  * @typedef Post
//  * @property {number} id
//  * @property {string} title
//  * @property {string} content
//  */

// /** @type {Post} */
// const post = {
//   id: 1,
//   title: '첫 번째 데이터',
//   content: '첫 번째 내용',
// };

// =============================================================
const arr = [10, 20, 30, 40, 50];

// for of 함수
// for (let item of arr) {
//   console.log(`item : ${item}`);
// }

// .map 함수
// arr.map(function (element, index) {
//   console.log(index + '번 값은 ' + element);
// });

// arr.map((element, index) => {
//   console.log(index + '번 값은 ' + element);
// });

// find 함수
// return 뒤의 조건에 맞는 값 반환
const result = arr.find(function (element) {
  return element === 30;
});

console.log(result);
