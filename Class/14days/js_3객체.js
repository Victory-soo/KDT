// Object.assign(배열1, 배열2, ...)
// 객체 병합
// 기존에 선언된 객체에 사용하지 않고,
// 가상의 Object 라는 것을 불러와서 사용 > [정적 메소드]

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const returnObj = Object.assign(obj1, obj2);

console.log(obj1);
// 결과 = {a: 1, b: 3, c: 4}
// 원본 바뀜

console.log(obj2);
// 결과 = {b: 3, c: 4}

console.log(returnObj);
// 결과 = {a: 1, b: 3, c: 4}
// 덮어쓰기됨





const userName = {
    id: 1,
    name: "tetz",
};

const userEmail = {
    id: 1,
    email: "xenosign@naver.com",
};

const assignedObj = Object.assign(userName, userEmail);
console.log(assignedObj);
// 결과 = {id: 1, name: 'tetz', email: 'xenosign@naver.com'}
console.log(userName);
// 결과 = {id: 1, name: 'tetz', email: 'xenosign@naver.com'}
console.log(assignedObj === userName);
// 결과 = true
console.log(assignedObj === userEmail);
// 결과 = false


const a = { po: "뽀로로" };
const b = { po: "뽀로로" };
console.log(a === b);
// 결과 = false
// 메모리 주소값이 다르기 때문에


const assignedObj2 = Object.assign({}, userName, userEmail);
console.log(assignedObj2);
// 결과 = {id: 1, name: 'tetz', email: 'xenosign@naver.com'}
console.log(userName);
// 결과 = {id: 1, name: 'tetz', email: 'xenosign@naver.com'}
console.log(assignedObj2 === userName);
// 결과 = false
// 맨 앞 객체의 메모리 값으로 저장이 되어 메모리 주소값이 다름
// [객체의 불변성]





const user = {
    id: 1,
    name: "tetz",
    email: "xenosign@naver.com",
};

const keys = Object.keys(user);
console.log(keys);
// 결과 = ["id", "name", "email"]
// keys = key 값

const values = keys.map((key) => user[key]);
console.log(values);
// 결과 = [1, 'tetz', 'xenosign@naver.com']
// key = data 값





// 구조 분해 할당
const user1 = {
    id: 1,
    name: "tetz",
    email: "xenosign@naver.com",
};

// const { id, name, email, address } = user1;

// 기본값 설정 
const { id, name, email, address = "KOREA"} = user1;
// 특정 변수에 넣기 
// const { id, name: tetz, email, address = "KOREA"} = user1;

console.log(id);
console.log(name);
console.log(email);
console.log(address);

const fruits = ["사과", "딸기", "망고", "수박"];
console.log(fruits);
// 결과 = ['사과', '딸기', '망고', '수박']

console.log(...fruits);
// 결과 = 사과 딸기 망고 수박


const fruitss = ["사과", "바나나", "수박", "망고", "딸기"];
function conLog(a, b, ...c) {
console.log(a, b, c);
}

conLog(...fruitss);
// 결과 = 사과 바나나 ['수박', '망고', '딸기']


const fruitsss = ["사과", "바나나", "수박", "망고", "딸기"];
function conLog(...rest) {
rest.forEach((element) => {
console.log(element);
});
}
conLog(...fruitsss);