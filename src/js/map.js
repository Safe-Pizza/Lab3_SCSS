"use strict";

const loaderEl = document.querySelector("#container-loader2");
const resultEl = document.querySelector("#map-result");

//ladda DOM
document.addEventListener("DOMContentLoaded", async () => {

    document.querySelector("#btn-search").addEventListener("click", getInputData);
})

function getInputData() {
    let searchValue = document.querySelector("#search-map").value.toLowerCase();
    getData(searchValue);
}

async function getData(input) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=jsonv2`);
        const data = await res.json();
        showMap(data);
    } catch (error) {
        console.error(error);
    }
}

function showMap(pos) {
    //latitud och longitud från första objektet i sökning
    const lat = pos[0].lat;
    const lon = pos[0].lon;

    //variabel för kart-url
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat},${lon},${lat}&amp;layer=mapnik&amp;marker=${lat},${lon}`;

    //skriva ut karta
    document.querySelector("#map-result").innerHTML = `<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>`


}