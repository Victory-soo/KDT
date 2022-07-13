let boxEl = document.querySelector(".box");

console.log(boxEl);

boxEl.addEventListener("click",function() {
    if(boxEl.classList.contains("orange")){
        boxEl.classList.remove("orange");
        boxEl.classList.add("skyblue");
    } else {
        boxEl.classList.add("orange");
    }
    // alert("click!");
    console.log(boxEl);
});