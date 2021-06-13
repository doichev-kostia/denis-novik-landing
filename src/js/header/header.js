const burgerMenu = document.querySelector(".menu__burger");
const menu = document.querySelector(".menu__body");
const menuItems = document.querySelectorAll(".menu__item");
const tabletWidth = 768;
const desktopWidth = 1024;

menuItems.forEach(item => {
    item.addEventListener("click", event=>{
        const target= event.target;
        const currentTarget = event.target;
        if (target === currentTarget || target.closest(item.className)){
            burgerMenu.classList.remove("active");
            menu.classList.remove("active");
            document.body.classList.remove("lock-screen");
        }

    })
})

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