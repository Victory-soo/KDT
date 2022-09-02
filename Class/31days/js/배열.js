// @ts-check

// ===================================================

// 전개 구문

// const arr = [1, 2, 3, 4, 5];
// console.log(arr);
// // 배열 내부 요소들을 흩뿌려준다.
// console.log(...arr);

// ===================================================

// // 객체 합치기

// const sooBase = {
//   name: '정승수',
//   gender: 'M',
// };

// const sooInfo = {
//   nickname: 'racoon-Man',
//   email: 'victory-soo@naver.com',
// };

// // 객체씩 따로따로 출력
// const soo1 = {
//   sooBase,
//   sooInfo,
// };

// // 필드값 합쳐짐
// const soo2 = {
//   ...sooBase,
//   ...sooInfo,
// };

// console.log(soo1);
// console.log(soo2);

// ===================================================

// 배열 합치기

// const arr1 = [1, 2, 3];
// const arr2 = ['4', '5', '6'];

// const merge1 = [arr1, arr2];
// const merge2 = [...arr1, ...arr2];

// console.log(merge1);
// console.log(merge2);

// console.log(merge1[1][2]);
// console.log(merge2[5]);

// ===================================================

// const sooInfo = {
//   name: '정승수',
//   gender: 'Male',
//   nickname: 'racoon-Man',
//   email: 'victory-soo@naver.com',
// };

// 데이터 값 넣기
// const { name, gender, nickname, email } = sooInfo;
// const { gender, ...rest } = sooInfo;

// console.log(name, gender, nickname, email);
// console.log(gender, rest);

// ===================================================

// 나머지 배열 연산자

// const arr = [1, 2, 3, 4, 5];
// const [first, second, ...rest] = arr;

// console.log(first, second, rest);

// ===================================================

// 매개변수

function spread(first, ...rest) {
  console.log(first);
  console.log(rest);
}

spread(1, 2, 3, 4, 5, 6, 7);

// ===================================================

// 파일 위치, 이름을 가리키는 객체

console.log('디렉토리 위치', __dirname);
console.log('파일명', __filename);
