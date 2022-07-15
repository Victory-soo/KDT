// 생성자함수 = 이름 무조건 대문자시작

function User(name, age) {
    this.name = name;
    this.age = age;
}

user1 = new User("Mike", 30);
console.log(user1);





function Fruits(name, price) {
    this.name = name;
    this.price = price;
    this.showPrice = function() {
        console.log(`${this.name}의 가격은 ${this.price}원 입니다.`);
    }
}

let apple = new Fruits("apple", 1000);
let pineapple = new Fruits("pineapple", 2000);
let watermelon = new Fruits("watermelon", 10000);
let strawberry = new Fruits("strawberry", 50000);

apple.showPrice();
pineapple.showPrice();
watermelon.showPrice();
strawberry.showPrice();





function Kdt (name, gender) {
    this.name = name;
    this.gender = gender;
    this.showNameGender = function() {
        console.log(`${this.name}의 성별은 ${this.gender} 입니다.`);
    }
}

let minjung = new Kdt("민정", "여자");
let seungsoo = new Kdt("승수", "남자");
let eunby = new Kdt("은비", "여자");
let jisoo = new Kdt("지수", "여자");

minjung.showNameGender();
seungsoo.showNameGender();
eunby.showNameGender();
jisoo.showNameGender();