// node main.js 로 실행

// ======================================================

// <Typescript 실행 주석>

// @ts-check

// ======================================================

// <서버확인코드>

// const http = require('http');

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.end('Hello');
// });

// const PORT = 4000;
// server.listen(PORT, () => {
//   console.log(`The server is listening at port: ${PORT}`);
// });

// ======================================================

// Callback 확인 코드

// console.log('1');
// setTimeout(() => {
//   console.log('callback');
// }, 3000);
// console.log('2');

// ======================================================

// Callback 확인 코드2

// let id = prompt('Please input your ID.');

// let userId = '';

// console.log('Attempt to log in...');
// setTimeout(() => {
//   userId = 'Soo';
//   console.log('Successfully achieve the ID.');
//   if (id === userId) {
//     console.log('Log in success...');
//   } else {
//     console.log('Log in Failed');
//   }
// }, 2000);

// ======================================================

// // Promise 사용법

// // 서버 통신 성공시 resolve
// // 서버 통신 실패시 reject
// const promise = new Promise((resolve, reject) => {
//   console.log('The code inside the PROMISE is executed immediately.');
//   setTimeout(() => {
//     const userId2 = 'soo';
//     // resolve(
//     //   'If the operation is successful, the result will be delivered to the "resolve" immediately.'
//     // );
//     // resolve(userId2);

//     if (userId2 === 'Soo') {
//       resolve(userId2);
//     } else {
//       reject(new Error('ID is not matched.'));
//     }
//   }, 2000);
// });

// promise
//   .then((value) => {
//     console.log(`The ID you requested is '${value}'`);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log('End the PROMISE sequence.');
//   });

// // promise.then() = resolve 안의 데이터를 value 값으로 받음
// // promise.catch() = reject 안의 데이터를 error 값으로 받음
// // promise.finally() = 결과 상관없이 무조건 실행

// ======================================================

// Async + Await

// Function 앞에 async를 붙이면 해당 함수는 항상 Promise 를 반환
// async가 붙은 함수 내부에 await 키워드 사용 가능
