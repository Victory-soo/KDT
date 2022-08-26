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

// ======================================================

// class 사용 (Strict 모드, 엄격한 규칙, 호이스팅 미적용, 변수 미리 선언해야함)

// class Car {
//   constructor(brand, color) {
//     this.brand = brand;
//     this.color = color;
//   }

//   drive() {
//     console.log(`${this.brand}'s ${this.color} car is driving.`);
//   }
// }

// const hyundai = new Car('Hyundai', 'skyblue');
// const porsche = new Car('Porsche', 'black');
// const toyota = new Car('Toyota', 'green');

// hyundai.drive();
// porsche.drive();
// toyota.drive();

// ======================================================

// 생성자 함수 사용 (호이스팅 적용, 변수 순서 상관없음 )

// function Car(brand, color) {
//   this.brand = brand;
//   this.color = color;
//   this.drive = function () {
//     console.log(`${this.brand}'s ${this.color} car is driving.`);
//   };
// }

// const hyundai = new Car('Hyundai', 'skyblue');
// const porsche = new Car('Porsche', 'black');
// const toyota = new Car('Toyota', 'green');

// hyundai.drive();
// porsche.drive();
// toyota.drive();

// ======================================================

// Class 상속

// class Car {
//   constructor(brand, color) {
//     this.brand = brand;
//     this.color = color;
//   }

//   drive() {
//     console.log(`${this.brand}'s ${this.color} car is driving.`);
//   }
// }

// class ElecCar extends Car {
//   // extends 로 상속
//   constructor(brand, color, fuel) {
//     super(brand, color);
//     // 그대로 받아올 값 = super() 사용
//     // 부모 클래스에 접근하고 싶을 때 사용
//     this.fuel = fuel;
//   }
//   showFuel() {
//     console.log(`This car uses ${this.fuel} as fuel.`);
//   }
// }

// const hyundai = new Car('Hyundai', 'skyblue');
// const porsche = new Car('Porsche', 'black');
// const toyota = new Car('Toyota', 'green');
// const tesla = new ElecCar('Tesla', 'white', 'electricity');

// hyundai.drive();
// porsche.drive();
// toyota.drive();
// tesla.showFuel();
// tesla.drive();

// ======================================================

// Overriding (부모 클래스의 메소드를 그대로 사용하고 싶지 않을 때)

// class Car {
//   constructor(brand, color) {
//     this.brand = brand;
//     this.color = color;
//   }

//   drive() {
//     console.log(`${this.brand}'s ${this.color} car is driving.`);
//   }

//   showSpec() {
//     console.log(
//       `The brand of this car is ${this.brand}, and color is ${this.color}.`
//     );
//   }
// }

// class ElecCar extends Car {
//   // extends 로 상속
//   constructor(brand, color, fuel) {
//     super(brand, color);
//     // 그대로 받아올 값 = super() 사용
//     this.fuel = fuel;
//   }
//   drive() {
//     console.log(
//       `${this.brand}'s ${this.color} car is driving, using ${this.fuel} as fuel.`
//     );
//     // 따로 설정해서 사용하면 적용됨
//   }

//   showSpec() {
//     // super.method = 부모 메서드에 접근
//     super.showSpec();
//     console.log(`And, this car uses ${this.fuel} as fuel.`);
//   }
// }

// const hyundai = new Car('Hyundai', 'skyblue');
// const porsche = new Car('Porsche', 'black');
// const toyota = new Car('Toyota', 'green');
// const tesla = new ElecCar('Tesla', 'white', 'electricity');

// // insteadof = 특정 Object가 해당 클래스로 만들어졌는지 확인
// hyundai.drive();
// console.log(hyundai instanceof Car);
// console.log('');

// tesla.showSpec();
// console.log(tesla instanceof Car);

// ======================================================

// ES5 (2015년 이전 코드로 작성 시 더 복잡함)

// function Car(brand, color) {
//   this.brand = brand;
//   this.color = color;
//   this.drive = function () {
//     console.log(`${this.brand}의 ${this.color}색 자동차가 주행 중입니다`);
//   };
// }
// function ElecCar(brand, color, fuel) {
//   // Car 생성자 함수의 this 와 생성자를 가져오기 위한 call 메소드 사용
//   Car.call(this, brand, color);
//   this.fuel = fuel; // 오버라이딩 구현
//   this.drive = function () {
//     console.log(
//       `${brand}의 ${color}색 자동차가 ${this.fuel}의 힘으로 주행 중입니다`
//     );
//   };
// } // 상속 받을 ElecCar 의 프로토 타입을 Object 객체(최상위 개념)를 사용해서 Car 의 프로토 타입과 동일하게 만들어 낸다.
// ElecCar.prototype = Object.create(Car.prototype);
// // 상속 받을 ElelCar 의 생성자는 위에서 선언한 생성자 함수의 것을 따르도록 설정
// ElecCar.prototype.constructor = ElecCar;
// const tesla = new ElecCar('tesla', 'white', 'electricity');
// tesla.drive();

// ======================================================

// 실습

// class Shape {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }
//   getArea() {
//     console.log(
//       `Area = ${this.width} * ${this.height} = ${this.width * this.height}`
//     );
//   }
// }

// class Rectangle extends Shape {
//   constructor(width, height) {
//     super(width, height);
//   }
//   getArea() {
//     console.log(
//       `Rectangle Area = ${this.width} * ${this.height} = ${
//         this.width * this.height
//       }`
//     );
//   }
// }

// class Triangle extends Shape {
//   constructor(width, height) {
//     super(width, height);
//   }

//   getArea() {
//     console.log(
//       `Triangle Area = ${this.width} * ${this.height} / 2 = ${
//         (this.width * this.height) / 2
//       }`
//     );
//   }
// }

// class Circle extends Shape {
//   constructor(radius, width, height) {
//     super(width, height);
//     this.radius = radius;
//   }

//   getArea() {
//     console.log(
//       `Circle Area = pi * ${this.radius}^2 = ${Math.floor(
//         this.radius ** 2 * Math.PI
//       )}`
//     );
//   }
// }

// const sTest = new Shape(2, 4);
// const rTest = new Rectangle(2, 4);
// const tTest = new Triangle(2, 4);
// const cTest = new Circle(10);

// sTest.getArea();
// rTest.getArea();
// tTest.getArea();
// cTest.getArea();

// ======================================================

// 서버 구축

const http = require('http');

// req(uest) = 브라우저에서 들어온 요청
// res(ponse) = 요청에 따른 서버 응답
const server = http.createServer((req, res) => {
  console.log(req.url);
  // 서버가 정상일 때, 200 (규약)
  res.statusCode = 200;
  res.end('Hello, back-end');
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`This server is running on ${PORT} port.`);
});

// HTTP 상태 코드
// 100번대 = 정보
// 200번대 = 성공
// 300번대 = 재전송
// 400번대 = 클라이언트 에러
// 500번대 = 서버 에러
