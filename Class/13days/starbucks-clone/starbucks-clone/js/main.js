// SUBMENU > SEARCH
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
searchEl.addEventListener("click", function() {
    searchInputEl.focus();
});
searchInputEl.addEventListener("focus", function() {
    searchInputEl.setAttribute("placeholder", "통합검색");
});
searchInputEl.addEventListener("blur", function() {
    searchInputEl.setAttribute("placeholder", "");
});