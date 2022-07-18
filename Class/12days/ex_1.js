const table = document.querySelector("table");
const text_date = document.querySelector("#date");
const text_content = document.querySelector("#content");

table.addEventListener("click", function(e) {
    if(e.target.tagName === "P") {
        text_date.value = e.target.innerText;
    }
})

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
}

table.addEventListener("click", function(e) {
    if(e.target.tagName === "DIV") {
        e.target.remove();
    }
})