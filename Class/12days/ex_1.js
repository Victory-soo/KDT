const table = document.querySelector("table");
const text_date = document.querySelector("#date");
const text_content = document.querySelector("#content");

table.addEventListener("click", function(e) {
    if(e.target.tagName === "P") {
        text_date.value = e.target.innerText;
    } else if(e.target.tagName === "DIV") {
    //     e.target.remove();
    } else {
        // 테이블 TD가 클릭 되면 TD를 전역 변수에 저장하여 위치 전달
        date.value = e.target.querySelector("p").textContent;
        targetEl = e.target;
}})

function writeSchedule() {
    let newDiv = document.createElement("div");
    let text1 = text_content.value;
    newDiv.textContent = (text1);
    for(i=5; i<=31; i++) {
        if(text_date.value == document.getElementsByTagName("p")[`${i}`].innerText) {
            document.getElementsByTagName("p")[`${i}`].classList.add("print");
            $(".print").parent("td").append(newDiv);
            text_date.value = "";
            text_content.value = "";
            document.querySelector(".print").classList.remove("print");
        }
    }

    newDiv.addEventListener("click", function () {
        if(newDiv.style.textDecoration === "line-through") {
            newDiv.style.textDecoration = "";
        } else {
            newDiv.style.textDecoration = "line-through";
        }
    })
    
    newDiv.addEventListener("dblclick", function () {
        newDiv.remove();
    })

}