let day;

if (new Date().getDay() == 0) {
    day = "일요일";
} else if(new Date().getDay() == 1) {
    day = "월요일";
} else if(new Date().getDay() == 2) {
    day = "화요일";
} else if(new Date().getDay() == 3) {
    day = "수요일";
} else if(new Date().getDay() == 4) {
    day = "목요일";
} else if(new Date().getDay() == 5) {
    day = "금요일";
} else if(new Date().getDay() == 6) {
    day = "토요일";
} else {
    day = "요일이 아닙니다."
}

console.log(day);
// alert(new Date().getDay());


