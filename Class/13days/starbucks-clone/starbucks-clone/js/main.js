// SUBMENU > SEARCH
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function() {
    searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function() {
    searchInputEl.setAttribute("placeholder", "통합검색");
});

// focus에서 벗어나면 blur상태
searchInputEl.addEventListener("blur", function() {
    searchInputEl.setAttribute("placeholder", "");
});

// SWIPPER
// NOTICE >> SWIPER
const swiper = new Swiper(".notice .notice-line .swiper", {
    // Optional parameters
    direction: 'vertical',
    // direction: 'horizontal',

    loop: true,
    autoplay: true,
    effect: 'flip',
    flipEffect: {
      slideShadows: false,
    },
});

// PROMOTION >> SWIPER
// SWIPER PROMOTION

const swiperPromotion = new Swiper(".notice .promotion .swiper", {
    direction: "horizontal",
    slidesPerView: 3,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 1000,
        // 1000ms = 1s
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: '.promotion .swiper-button-next',
        prevEl: '.promotion .swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
})

// SWIPER PROMOTION AUTOPLAY  CONTROL
function controlAutoplay() {
    if(swiperPromotion.autoplay.running) {
        swiperPromotion.autoplay.stop();
    } else {
        swiperPromotion.autoplay.start();
    }
};

// TOGGLE PROMOTION
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");

promotionToggleBtn.addEventListener("click", function() {
    // contains => 결과값 true / false 
    if(promotionEl.classList.contains("hide")) {
        promotionEl.classList.remove("hide");
    } else {
        promotionEl.classList.add("hide");
    };

    if (promotionToggleBtn.style.transform === "rotate(180deg)") {
        promotionToggleBtn.style.transform = "rotate(0deg)";
    } else {
        promotionToggleBtn.style.transform = "rotate(180deg)";
}});


// SCROLL ANIMATION
let scrollYpos
window.addEventListener("scroll", function() {
    scrollYpos = window.scrollY;
})