//Toggle funktion för mobil meny
document.querySelector("#hamburger-menu").addEventListener("click", toggleMenu);
document.querySelector(".toggle").addEventListener("click", toggleDiv);

function toggleMenu() {
    const mainNavEl = document.querySelector("#main-nav");
    const hamMenuEl = document.querySelector("#hamburger-menu");

    if (mainNavEl.style.display === "block") {
        mainNavEl.style.display = "none";
        hamMenuEl.classList.remove("change");
    } else {
        mainNavEl.style.display = "block";
        hamMenuEl.classList.add("change");
    }
}

function toggleDiv() {
    const divEl = document.querySelector(".container-loader");

    if (divEl.style.display === "grid") {
        divEl.style.display = "none";
    } else {
        divEl.style.display = "grid";
    }
}