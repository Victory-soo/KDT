// const upper = document.querySelector(".upper");

// document.addEventListener("click", function () {
//   upper.classList.add("on");
// });

//========================================================

const main = document.querySelector("main");
const btns = main.querySelectorAll("#nav li");
const btnsLen = btns.length;

let before = -1;

for (let i = 0; i < btnsLen; i++) {
  btns[i].addEventListener("click", function (e) {
    if (before === -1 && i != 0) {
      before = i;
      btns[0].classList.remove("on");
      btns[i].classList.add("on");
    } else if (before !== i) {
      btns[before].classList.remove("on");
      btns[i].classList.add("on");
      before = i;
    }
  });
}
