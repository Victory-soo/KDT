const button = document.querySelector("table");

button.addEventListener("click", function(e) {
    console.log(e.target);
    document.querySelector("#date").value = e.target.innerText;
    e.target.classList.add("print");
})

const contentBtn = document.querySelector("#content")
const date = document.querySelector("#date").value

function writeSchedule() {
    document.querySelector(".print")
    const print = document.querySelector(".print").append("div");
    
}


// function writeSchedule() {
//     for(i=0; i<=42; i++) {
//         if(i == date) {
//             console.log(document.querySelectorAll(`td:nth-child(${i})`));
//             const addDiv = document.createElement(div);

//             addDiv.textContent = contentBtn.value;
//         }
//     }
//     const text = content.value
    
// };