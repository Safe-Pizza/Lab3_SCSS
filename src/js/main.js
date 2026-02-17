

//Eventlyssnare för hamburgermeny
document.querySelector("#hamburger-menu").addEventListener("click", toggleMenu);

//Eventlyssnare för knapp animation
document.querySelector(".toggle").addEventListener("click", toggleDiv);


//togglefunktion för hamburgermeny
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

//togglefunktion för laddningsanimation
function toggleDiv() {
    const divEl = document.querySelector(".container-loader");
    const buttonEl = document.querySelector(".toggle");

    if (divEl.style.display === "grid") {
        divEl.style.display = "none";
        buttonEl.innerHTML = "Klick";
    } else {
        divEl.style.display = "grid";
        buttonEl.innerHTML = "Stoppa";
    }
}