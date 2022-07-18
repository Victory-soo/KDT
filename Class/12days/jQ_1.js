
// let spanEl = document.querySelector("span");
// spanEl.remove();


// ============jQuery 사용법==================
// $("span").remove();



// $("선택자").val("") = 값 넣는 법
// $(".input").val("안녕하세요.")

// function showValue() {
//     $("input").val("가나다라마바사");
// }


// $("선택자").text("텍스트 변경값") = text 변경
// $("span").text("가나다라");


// $("선택자").attr("속성", "속성값") = 속성 변경
// $(".text").on("click", function () {
//     $(".text").attr("style", "background-color: orange;")
// })


// $("선택자").css("속성","속성값") = css 변경


// $("선택자").html("<h1>루피</h1>"); = 해당 선택자의 자식요소로 삽입


// $("선택자").append("요소") = 선택된 요소의 자식 요소 제일 마지막 요소로 추가


// $("선택자").prepend("요소") =선택된 요소의 자식 요소 중 첫번째로 추가


// $("선택자").before("요소") = 선택된 요소의 이전 형제 요소로 추가
//                              js에는 없음
//                              after와 동일 작업 불가


// $("선택자").after("요소") = 선택된 요소의 다음 형제 요소로 추가
//                              js에는 없음
//                              before와 동일 작업 불가


// $("선택자").parent("요소") = 바로 위에 존재하는 하나의 부모 요소 선택


// $("선택자").parents("요소") = 바로 위 부모뿐만 아니라 부모의 부모, 모든 조상을 선택
//                              JS 에서는 없음, closest(“선택자”) 로 가까운 조상 찾기는 가능


// $("선택자").children("요소") = 선택된 요소의 자식 요소 모두 선택
//                               JS 에서는 (요소).childNodes  비 노드 요소 포함
//                               JS 에서는 (요소).children  비 노드 요소 제외


// $("선택자").next("요소") = 선택된 요소 바로 다음에 위치한 형제 요소 선택
//                            JS 에서는 (요소).nextSibling


// $("선택자").prev("요소") = 선택된 요소 바로 이전에 위치한 형제 요소 선택
//                            JS 에서는 (요소).previousSibling


// $("선택자").addClass(“클래스명”) = 선택된 요소에 클래스 추가


// $( 선택자 ).removeClass(“클래스명”) = 선택된 요소에 클래스 삭제


// $( 선택자 ).hasClass(“클래스명”) = 선택된 요소에 클래스가 있는지 여부 확인
//                                   Return 값은 true 와 false 로 나온다.



// ==============================================
// 예제1)   Version.JavaScript
// const text = document.querySelector(".text");
// const print = document.querySelector(".print");
// const change = document.querySelector(".change");

// change.addEventListener("click", function() {
//     text.value= "가나다라마바사";   
// })

// print.addEventListener("click", function() {
//     document.querySelector("span").innerText = text.value;
// })



// 예제1)   Version.jQuery
// $(".print").on("click", function() {
//     $("span").text($(".text").val());
// })

// $(".change").on("click", function( ){
//     $(".text").val("가나다라마바사");
// });







// 예제2)   
// [JavaScript]
// const text = document.querySelector(".text-input");
// const btn1 = document.querySelector(".btn1");
// const btn2 = document.querySelector(".btn2");

// btn1.addEventListener("click", function() {
//     text.setAttribute("placeholder","변경1을 누르셨습니다.");
// })

// btn2.addEventListener("click", function() {
//     text.setAttribute("type", "radio");
// })


// [jQuery]
// $(".btn1").on("click", function() {
//     $(".text-input").attr("placeholder", "변경1을 누르셨습니다.");
// })

// $(".btn2").on("click", function() {
//     $(".text-input").attr("type", "radio");
// })








// 예제3)
// [JavaScript]
// const btn1 = document.querySelector(".btn1");
// const btn2 = document.querySelector(".btn2");

// btn1.addEventListener("click",function () {
//     document.querySelector("div").style = "background-color: orange;"
// })

// $(".btn2").on("click", function () {
//     $("div").css("background-color", "skyblue");
// })






// 예제4)
// $("p").html("<h1>루피</h1>");

// document.querySelector("p").innerHTML = "<h1>루피</h1>"






// 예제5)
// [Javascript]
// const inputText = document.querySelector(".inputText");
// const btn = document.querySelector(".btn");
// const ul = document.querySelector("ul");

// btn.addEventListener("click", function() {
//     const addul = document.createElement("li");
//     addul.textContent = inputText.value;
//     ul.prepend(addul);
//     // ul.append(addul);
//     inputText.value = "";
// })


// [jQuery]
// $(".btn").on("click", function () {
//     let text = $(".inputText").val();

//     $("ul").prepend(`<li>${text}</li>`);
// })




// 예제6
// const children = document.querySelector("div").children;
// const childNodes = document.querySelector("div").childNodes;
