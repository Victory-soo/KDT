// gsap.registerPlugin(ScrollTrigger);

// let tl = gsap.timeline();

// tl.to(".box1", {
//   x: 500,
//   rotation: 720,
//   duration: 3,
// })
//   .to(".box1", {
//     duration: 1,
//     backgroundColor: "orange",
//   })
//   .to(".box2", {
//     x: 0,
//     opacity: 0,
//     duration: 3,
//   });

// gsap.to(".box1", {
//   scrollTrigger: {
//     trigger: ".box1",
//     toggleActions: "restart",
//     markers: true,
//     scrub: true,
//     // start: "bottom 50%",
//     end: "+=3000",
//     pin: true,
//   },
//   x: 1000,
//   rotation: 720,
//   scale: 2,
//   duration: 3,
// });

// gsap.from(".box2", {
//   scrollTrigger: {
//     trigger: ".box3",
//     toggleActions: "restart",
//   },
//   x: 1000,
//   rotation: 720,
//   scale: 2,
//   duration: 3,
// });

// =============================================
gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".wrap",
    start: "top top",
    marker: true,
    end: "+=3000",
    scrub: true,
    pin: true,
  },
});

gsap.defaults({
  ease: "none",
  duration: 2,
});

tl.from(".lightgreen", { xPercent: -100 }).from(".violet", { xPercent: 100 }).from(".lightblue", { yPercent: -100 });
