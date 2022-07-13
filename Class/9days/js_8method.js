const soo = {
    name: "정승수",
    age: 26,
    isMarried: false,
    gender: "male",
    height: 180,

    // 메소드 Method
    getname: function() {
        return this.name;
    },

    doesHeMarried: function() {
        return this.isMarried;
    },

    getGender: function() {
        return this.gender;
    },

    showHisHeight: function() {
        console.log(this.height);
    },
}

let hisName = soo.getname();
console.log(hisName);
console.log(soo.doesHeMarried());

console.log(soo.getGender());
soo.showHisHeight();
