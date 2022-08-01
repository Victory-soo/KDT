const frame = document.querySelector("section");
const list = frame.querySelectorAll("article");
const len = list.length;
const deg = 360 / len;

for (let i = 0; i < len; i++) {
  list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;
}

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
let num = 0;
let active = 0;

prev.addEventListener("click", function (e) {
  frame.style.transform = `rotate(${deg * ++num}deg)`;

  if (active === 0) {
    active = len - 1;
  } else {
    active--;
  }

  for (let el of list) {
    el.classList.remove("on");
  }
  list[active].classList.add("on");
});

next.addEventListener("click", function (e) {
  frame.style.transform = `rotate(${deg * --num}deg)`;

  if (active === len - 1) {
    active = 0;
  } else {
    active++;
  }

  for (el of list) {
    el.classList.remove("on");
  }
  list[active].classList.add("on");
});
