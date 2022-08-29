// @ts-check

// < Common JS >

const animals = ['dog', 'bear'];

function showAnimals() {
  animals.map((el) => console.log(el));
}

// function showAnimals() {
//   animals.map(function (el) {
//     return console.log(el);
//   });
// }

// 내보내는 방법 1 ( 한 파일로 통째로 obj 형태로 내보내는 방법)
// module.exports = 외부로 내보내기
module.exports = {
  animals,
  showAnimals,
};

// 내보내는 방법 2 (일일이 내보낼 것을 선택 후, 정의하는 방법)
exports.animals = animals;

exports.showAnimals = function showAnimals() {
  animals.map((el) => console.log(el));
};
