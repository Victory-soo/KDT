// console.log(window);

// const form  = document.getElementById('todo-form')
// console.log(form);

// const form = document.querySelector("#todo-form");
// console.log(form);

// const items = document.querySelectorAll(".item");
// console.log(items);
// items.forEach((item)=>{
//     console.log(item);
// });

// console.log(document.getElementsByClassName('item'));
// console.log(document.getElementsByTagName('li'));

// // todos.remove();
// todos.style.background = "green";
// todos.lastElementChild.remove();
// todos.firstElementChild.textContent = "Hello";
// todos.lastElementChild.innerHTML = "<h1>Hello</h1>"

const button = document.querySelector(".submit");
const todos = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-input");
const msg = document.querySelector("#msg");

// button.addEventListener("click",function(e) {
//     e.preventDefault();
//     // e.target.style.color = 'red';
//     console.log("clicked");
// });

button.addEventListener("click", onSubmit);
function onSubmit(e) {
    e.preventDefault();
    if (todoInput.value === "") {
        msg.style.display = "block";
        setTimeout(() => (msg.style.display = "none"), 2000);
        return;
    }
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(todoInput.value));
    li.classList.add("item");
    todos.appendChild(li);
    todoInput.value = "";
}
