let target;
let currentTarget;

// $("선택자").on = addEventListner
$("td").on("click", function(obj) {
    target = obj.target;
    console.log(target);
    currentTarget = obj.currentTarget;
    console.log(currentTarget);
    console.log("");
    
    if($(target).prop("tagName")==="DIV") {
        $(target).remove();
    }

    $("#date").val($(currentTarget).text());
})

function writeSchedule() {
    let task = $("#content").val();
    $(currentTarget).append(`<div>${task}</div>`);
    $("#content").val("");
}