document.querySelector("#hamburger-menu").addEventListener("click", toggleMenu);

function toggleMenu() {
    var x = document.querySelector("#main-nav");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}