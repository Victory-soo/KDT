let a = true;
let b = false;
let c = true;

// 하나라도 false > false
console.log(a && b && c);

// 하나라도 true > true
console.log(a || b || c);



let soo = "정승수";
let gender = "male";

if (gender == "male") {
    if(soo == "정승수") {
        alert("남자 정승수");
    } else if (soo == "정승슈") {
        alert("남자 정승슈");
    } else {
        alert("남자 난몰라잉");
    }
} else {
    if(soo == "정승수") {
        alert("여자 정승수");
    } else if (soo == "정승슈") {
        alert("여자 정승슈");
    } else {
        alert("여자 난몰라잉");
    }
}



