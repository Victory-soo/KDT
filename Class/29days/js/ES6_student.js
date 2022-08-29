// @ts-check

// package.json 에서
// "type" = "module" 입력

const student = ['세호', '재석'];

function showStudent() {
  student.map((el) => console.log(el));
}
export { student as stu, showStudent as showS };
