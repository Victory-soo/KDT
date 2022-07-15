let boxEl = document.querySelector(".box");
// box 요소를 담는다.
// document = 작성된 모든 소스 중 (처음 만난 것만)
// querySelector("요소선택자") = 선택한다.
// (".box") = CSS 선택자와 같음
//            ex) (".box .small_box")

// boxEl.addEventListener(이벤트, 명령);
// addEventListener = 이벤트가 발생하면 명령을 실행

// 이벤트
// Click : 클릭
// Mouseover : 요소에 커서를 올렸을 때
// Mouseout : 마우스가 요소를 벗어날 때
// Mousedown : 마우스 버튼을 누르고 있는 상태
// Mouseup : 마우스 버튼을 떼는 순간
// Focus : 포커스가 갔을 때
// Blur : 포커스가 벗어나는 순간
// Keypress : 키를 누르는 순간 + 누르고 있는 동안 계속 발생
// Keydown : 키를 누르는 순간에만 발생
// Keyup : 키를 눌렀다가 떼는 순간
// Load : 웹페이지에 필요한 모든 파일(html, css, js 등)의 다운로드가 완료 되었을 때
// Resize : 브라우저 창의 크기가 변경 될 때
// Scroll : 스크롤이 발생할 때
// Unload : 링크를 타고 이동하거나, 브라우저를 닫을 때
// Change : 폼 필드의 상태가 변경 되었을 때





boxEl.addEventListener("click", function() {
    if(boxEl.classList.contains("orange")) {
        boxEl.classList.remove("orange");
        boxEl.classList.add("skyblue");
    } else if (boxEl1.classList.contains("skyblue")) {
        boxEl.classList.remove("skyblue");
        boxEl.classList.add("orange");
    } else {
        boxEl.classList.add("orange");
    }
    console.log(boxEl);
});




let boxEl1 = document.getElementById("second-box");
// getElementById = 해당 id를 가지는 요소를 불러오는 메소드
//                  ~ById 이므로 #id 안씀
console.log(boxEl1);

// class 추가 / 제거
let boxEl2 = document.querySelector(".box");
boxEl2.classList.add("active");
console.log(boxEl2.classList.contains("active"));

let boxEl3 = document.querySelector(".box");
boxEl3.classList.remove("active");
console.log(boxEl3.classList.contains("active"));





// setAttribute = 속성값 추가("속성명", "지정할 속성")
let boxEl4 = document.querySelector(".box");
let inputEl = document.getElementById("apple");

boxEl4.addEventListener("click", function() {
    inputEl.setAttribute("placeholder", "아이디를 입력하시오.");
    inputEl.setAttribute("type", "button");
    inputEl.setAttribute("type", "password");
})





// textContent = 텍스트 변경
let bananaEl = document.querySelector(".banana");

bananaEl.addEventListener("click", function() {
    bananaEl.textContent = "바나나";
});





let box1El = document.querySelector(".box1");
let buttonEl1 = document.getElementById("button1");
let buttonEl2 = document.getElementById("button2");
let exampleEl3 = document.getElementById("example3");
let spanEl = document.querySelector(".example");

box1El.addEventListener("click", function() {
    if(box1El.classList.contains("orange")) {
        box1El.classList.remove("orange");
        box1El.classList.add("skyblue");
    } else if (box1El.classList.contains("skyblue")) {
        box1El.classList.remove("skyblue");
        box1El.classList.add("orange");
    } else {
        box1El.classList.add("orange");
    }
    console.log(box1El);
});

buttonEl1.addEventListener("click", function() {
    exampleEl3.setAttribute("placeholder", "아이디를 입력하세요.");
    spanEl.textContent = "아이디를 입력하세요.";
});

buttonEl2.addEventListener("click", function() {
    // let change1 = document.createElement("span");
    // let change1El = document.querySelector;
    // change1El.classList.add("inputvalue");
    const example3 = document.getElementById("example3").value;
    document.getElementById("inputvalue").innerText = example3;

    // let inputText = example3.value;
    // spanEl.textContext = inputText;
});




// querySelectorAll("")
let caseEls = document.querySelectorAll(".case");
console.log(caseEls);

// .forEach( function(변수, index) {}) = 한 개씩 다 실행
caseEls.forEach(function (caseEl, index) {
    caseEl.classList.add(`case_${index+1}`);
});

console.log(caseEls);




let colorclickEl = document.querySelector("#color_click");

colorclickEl.addEventListener("click", function() {
    let colorEls = document.querySelectorAll(".color");
    colorEls.forEach(function(colorEl, index) {
        colorEl.classList.add(`rainbow${index+1}`)});
});

// div 요소가 엄청 많을 때
// colorclickEl.addEventListener("click", function() {
//     let colorEls = document.querySelectorAll(".color");
//     colorEls.forEach(function(colorEl, index) {
//         if(index % 7 ===0) {
//              colorEl.classList.add(`rainbow1`);
//         } else if (index % 7 === 1) {
//              colorEl.classList.add(`rainbow2`);
//         } else if (index % 7 === 2) {
//              colorEl.classList.add(`rainbow3`);
//         } else if (index % 7 === 3) {
//              colorEl.classList.add(`rainbow4`);
//         } else if (index % 7 === 4) {
//              colorEl.classList.add(`rainbow5`);
//         } else if (index % 7 === 5) {
//              colorEl.classList.add(`rainbow6`);
//         } else if (index % 7 === 6) {
//              colorEl.classList.add(`rainbow7`)}})});


// div 요소가 엄청 많을 때
// colorclickEl.addEventListener("click", function() {
//     let colorEls = document.querySelectorAll(".color");
//     colorEls.forEach(function(colorEl, index) {
//         if(index % 7 ===0) {
//             colorEl.style.backgroundcolor = "red";
//         } else if (index % 7 === 1) {
//             colorEl.style.backgroundcolor = "orange";
//         } else if (index % 7 === 2) {
//             colorEl.style.backgroundcolor = "yellow";
//         } else if (index % 7 === 3) {
//             colorEl.style.backgroundcolor = "green";
//         } else if (index % 7 === 4) {
//             colorEl.style.backgroundcolor = "blue";
//         } else if (index % 7 === 5) {
//             colorEl.style.backgroundcolor = "navy";
//         } else if (index % 7 === 6) {
//             colorEl.style.backgroundcolor = "violet";
// }})});




