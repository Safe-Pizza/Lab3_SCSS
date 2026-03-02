"use strict";

//Eventlyssnare för knapp animation
document.querySelector(".toggle").addEventListener("click", toggleDiv);

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