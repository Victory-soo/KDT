const inputTask = document.querySelector(".input-task");
const addBtn = document.querySelector(".input-btn");
const todoList = document.querySelector(".todo-list")

addBtn.addEventListener("click", function() {
    if(inputTask.value === "") {
        inputTask.setAttribute("placeholder", "내용을 입력해주세요.");
    } else {
        const addli = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("click", function() {
            if(checkbox.checked === true) {
                checkbox.parentNode.style.textDecoration = "line-through";
            } else {
                checkbox.parentNode.style.textDecoration = "none";
            }
        })
        const deleteBtn = document.createElement("input");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("value", "Del");
        // deleteBtn.setAttribute("onclick","deleteTask(this);");

        addli.append(checkbox);
        addli.append(inputTask.value);
        addli.append(deleteBtn);
        todoList.append(addli);
        inputTask.value = "";
    }
})

// Delete 방법 2번째
todoList.addEventListener("click", function(e) {
    if(e.target.tagName === "INPUT" && e.target.getAttribute("type") === "button") {
        e.target.parentNode.remove();
    }
})



// Delete 방법 1번째
// function deleteTask(t) {
//     t.parentNode.remove();
// }



// append() : Node(요소) + String(문자) 추가 가능
//            여러가지 값 ,로 한번에 붙이기 가능
//            반환값이 없다. (console.log 했을 때 undefined)

// appendChild() : Node만 추가 가능 (문자는 document.createTextNode로 추가)
//                 한 번에 한번만 추가 가능
//                 추가한 Node 반환

// append() + appendChild() : 부모 노드의 마지막 요소로 추가
