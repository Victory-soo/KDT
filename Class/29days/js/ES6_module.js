// @ts-check

// ES6 방법

// 각각 불러오기

// import { animals, showAnimals } from './ES6_animals.js';

// console.log(animals);
// showAnimals();

// ========================================================

// 가져올게 많아서, 한꺼번에 불러오기

// import * as animals from './ES6_animals.js';
// console.log(animals);

// ========================================================

// 불러올 때, 모듈 이름 바꾸기

// import { animals as ani, showAnimals as show } from './ES6_animals.js';
// console.log(ani);
// show();

// ========================================================

// 모듈 이름 바꾼 것 불러오기

// import { ani, show } from './ES6_animals.js';
// console.log(ani);
// show();

// ========================================================

// Class 로 묶은 것 불러오기 ( {} 중괄호 없이 불러오기)

import Animal from './ES6_animals.js';

const ani = new Animal();
console.log(ani);
ani.showAnimals();
