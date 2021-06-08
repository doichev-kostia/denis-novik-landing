const burgerMenu = document.querySelector(".menu__burger");
const menu = document.querySelector(".menu__body");

burgerMenu.addEventListener("click", (e) => {
    const target = e.target;
    const currentTarget = e.target

    if (target === currentTarget || target.closest("button")){
        burgerMenu.classList.toggle("active");
        menu.classList.toggle("active");
        document.body.classList.toggle("lock-screen")
    }
})
