let day;

switch (new Date().getDay()) {
    case 0:
        day = "일요일";
        break;
    case 1:
        day = "월요일";
        break;
    case 2:
        day = "화요일";
        break;
    case 3:
        day = "수요일";
        break;
    case 4:
        day = "목요일";
        break;
    case 5:
        day = "금요일";
        break;
    case 6:
        day = "토요일";
        break;
    default:
        day = "요일이 아닙니다.";
}

console.log(day);