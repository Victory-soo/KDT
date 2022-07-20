// 클릭 된 요소를 저장하기 위한 전역 변수
const calendar = document.querySelector("table");
const date = document.querySelector("#date");
const content = document.querySelector("#content");
let targetEl;

calendar.addEventListener("click", function (e) {
  // 클릭된 요소의 종류에 따라 각각의 기능을 수행
  if (e.target.tagName === "P") {
    // 날짜(P 태그)가 클릭이 되면 부모 요소를 전역 변수에 저장하여 위치 전달
    date.value = e.target.textContent;
    targetEl = e.target.parentNode;
  } else if (e.target.tagName === "DIV") {
    // 추가 된 TASK(DIV 요소로 추가)가 클릭이 되면 삭제
    e.target.remove();
  } else {
    // 테이블 TD가 클릭 되면 TD를 전역 변수에 저장하여 위치 전달
    date.value = e.target.querySelector("p").textContent;
    targetEl = e.target;
  }
});

// 작성 버튼이 클릭 되면 실행되는 함수
function writeSchedule() {
  let addEl = document.createElement("div");
  addEl.innerText = content.value;

  // 전역 변수에 저장된 요소의 위치를 사용하여 입력 받은 input 내용을 추가
  targetEl.append(addEl);

  // input의 text를 초기화
  content.value = "";
}