// @ts-check

// < Common JS >

// 불러오기 방법 1
// 파일 불러오기 (확장자 X)
const animals = require('./CommonJS_animals');

// animals 라는 obj 안의 animals 출력
console.log(animals.animals);

// animals 라는 obj 안의 showAnimals 함수 출력
animals.showAnimals();

// ===============================================

// 불러오기 방법 2

const { animals, showAnimals } = require('./CommonJS_animals');
console.log(animals);
showAnimals();
