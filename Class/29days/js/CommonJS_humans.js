// @ts-check

// package.json 에서
// "type" = "module" 삭제

const name = ['철수', '영희'];

// function showName() {
//   name.map((el) => console.log(el));
// }

// ==============================================

// 방법 1
// module.exports = {
//   name,
//   showName,
// };

// ==============================================

// 방법2
exports.name = name;

exports.showName = function showName() {
  name.map((el) => console.log(el));
};
