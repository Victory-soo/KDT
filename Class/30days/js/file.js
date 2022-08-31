// @ts-check

// CommonJS 방식으로 파일 불러오기
// fs = file system

// const fs = require('fs');

// fs.readFile('readme.txt', 'utf-8', function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.readFile('readme.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// =========================================================

// writeFile = 파일을 초기화 시키고, 새로운 내용 추가

// const fs = require('fs');

// const str = ' 파일 쓰기가 정상적으로 수행시, 이 문구가 파일에 들어갑니다.';
// fs.writeFile('readme1.txt', str, 'utf-8', (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('writeFile 정상 작동');
//   }
// });

// =========================================================

// 비동기 프로그래밍
// const fs = require('fs');

// fs.readFile('readme.txt', 'utf-8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log('1번 일꾼', data.toString);
// });

//   fs.readFile('readme.txt', 'utf-8', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log('2번 일꾼', data.toString);
//   });

//     fs.readFile('readme.txt', 'utf-8', (err, data) => {
//       if (err) {
//         throw err;
//       }
//       console.log('3번 일꾼', data.toString);
//     });

//       fs.readFile('readme.txt', 'utf-8', (err, data) => {
//         if (err) {
//           throw err;
//         }
//         console.log('4번 일꾼', data.toString);
//       });
// =========================================================

// Callback 사용( 순차적 일 시키기 )
// const fs = require('fs');

// fs.readFile('readme.txt', 'utf-8', (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log('1번 일꾼', data);
//   fs.readFile('readme.txt', 'utf-8', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log('2번 일꾼', data);
//     fs.readFile('readme.txt', 'utf-8', (err, data) => {
//       if (err) {
//         throw err;
//       }
//       console.log('3번 일꾼', data);
//       fs.readFile('readme.txt', 'utf-8', (err, data) => {
//         if (err) {
//           throw err;
//         }
//         console.log('4번 일꾼', data);
//       });
//     });
//   });
// });

// =========================================================

// 동기 프로그래밍( Sync, 서버 상에서 정상작동 안하는 경우 빈번! )

// const fs = require('fs');

// let data = fs.readFileSync('./readme.txt', 'utf-8');
// console.log('1번 일꾼', data.toString());
// data = fs.readFileSync('./readme.txt', 'utf-8');
// console.log('2번 일꾼', data.toString());
// data = fs.readFileSync('./readme.txt', 'utf-8');
// console.log('3번 일꾼', data.toString());
// data = fs.readFileSync('./readme.txt', 'utf-8');
// console.log('4번 일꾼', data.toString());

// =========================================================

// Promise ( resolve와 reject 매개변수를 받음 / 받을 때까지 무한 대기)
// resolve - then
// reject - catch
// pending - resolve 또는 reject를 기다리는 상태

// const promise = new Promise((resolve, reject) => {
//   const soo = 'diligent';
//   if (soo === 'diligent') {
//     setTimeout(() => {
//       console.log(promise);
//       resolve('soo is diligent.');
//     }, 3000);
//   } else {
//     reject('soo is lazy.');
//   }
// });

// resolve('soo is diligent.') 값이 then((data))로 들어감
// reject('soo is lazy.') 값이 catch((err))로 들어감
// promise
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// =========================================================

// Callback -> Promise로 변경

// const fs = require('fs').promises;

// // 자동으로 resolve / reject가 구분이 됨
// fs.readFile('readmed.txt', 'utf-8')
//   .then((data) => {
//     console.log('1번 일꾼', data);
//     return fs.readFile('readme.txt', 'utf-8');
//   })
//   .then((data) => {
//     console.log('2번 일꾼', data);
//     return fs.readFile('readme.txt', 'utf-8');
//   })
//   .then((data) => {
//     console.log('3번 일꾼', data);
//     return fs.readFile('readme.txt', 'utf-8');
//   })
//   .then((data) => {
//     console.log('4번 일꾼', data);
//     return fs.readFile('readme.txt', 'utf-8');
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log('Error');
//   });

// =========================================================

// async function = 동기 함수
// await = resolve 값을 얻을 때까지 기다린다.
//         기다렸다가 resolve 값을 data에 넣고 다음 실행

const fs = require('fs').promises;

async function main() {
  let data = await fs.readFile('readme.txt', 'utf-8');
  console.log('1번', data);
  data = await fs.readFile('readme.txt', 'utf-8');
  console.log('2번', data);
  data = await fs.readFile('readme.txt', 'utf-8');
  console.log('3번', data);
  data = await fs.readFile('readme.txt', 'utf-8');
  console.log('4번', data);
}

main();
