// let a=1;
// let b=1;

// while (a<10){
//     b=1;
//     while(b<10){
//         console.log(a+" x "+b+" = "+(a*b));
//         b++;
//     }
//     a++;
// }

// for(a=1; a<10; a++) {
//     for(b=1; b<10; b++){
//         console.log(a+" x "+b+" = "+(a*b));
//     }
// }

let j=0;
for (let i=0; i<=100; i++){
    // if(i%2==0 || i%5==0){
    if(i%2==0){
        j=j+i;
    } else if(i%5==0){
        j=j+i;
    }
}

console.log(j);