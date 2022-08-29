// @ts-check

// package.json 에서
// "type" = "module" 삭제

// 방법 1
// const name = require('./CommonJS_humans');
// console.log(name);
// name.showName();

// ==============================================

// 방법 2
const { name, showName } = require('./CommonJS_humans');
console.log(name);
showName();
