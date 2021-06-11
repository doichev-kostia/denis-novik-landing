const burgerMenu = document.querySelector(".menu__burger");
const menu = document.querySelector(".menu__body");
const tabletWidth = 768;
const desktopWidth = 1024;

burgerMenu.addEventListener("click", (e) => {
    const target = e.target;
    const currentTarget = e.target;

    if (target === currentTarget || target.closest("button")) {
        burgerMenu.classList.toggle("active");
        menu.classList.toggle("active");
        document.body.classList.toggle("lock-screen");
    }
});

window.addEventListener("resize", (e) => {
    const targetWidth = e.target.innerWidth;
    if (targetWidth > tabletWidth) {
        document.body.classList.remove("lock-screen");
        burgerMenu.classList.remove("active");
        menu.classList.remove("active");
    }

});