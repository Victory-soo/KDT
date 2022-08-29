// @ts-check

// ES6
// CommonJS = exports
// ES6 = export

const animals = ['dog', 'bear'];
function showAnimals() {
  animals.map((el) => console.log(el));
}

// export { animals, showAnimals };

// ========================================================

// 모듈 이름 바꿔서 내보내기
export { animals as ani, showAnimals as show };

// ========================================================

// Class 로 만들어서 내보내기

export default class Animal {
  constructor() {
    this.animals = ['dog', 'bear'];
  }

  showAnimals() {
    this.animals.map((el) => console.log(el));
  }
}
