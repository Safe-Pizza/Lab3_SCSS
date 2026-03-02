"use strict";
const resultEl = document.querySelector("#map-result");

/**
 * Lyssnare för DOM färdigladdat
 * Lyssnare för klick för att anropa funktion getInputData
 * 
 * @event DOMContentLoaded
 * @event click
 * @returns {void} - returnerar inget värde utan anropar funktion getInputData vid klick
 */

//ladda DOM
document.addEventListener("DOMContentLoaded", async () => {

    document.querySelector("#btn-search").addEventListener("click", getInputData);
})

/**
 * Hämtar inmatad sökdata från inputfält
 * Om sökfält inte är tomt anropas getData med sökdata
 * annars visas felmeddelande i DOM
 * 
 * @returns {void} - returnerar inget värde utan anropar funktion getData med sökdata
 * @throws {string} - skriver felmeddelande i DOM vid tomt inputfält
 */
function getInputData() {
    let searchValue = document.querySelector("#search-map").value.toLowerCase();

    if (searchValue.length > 0) {
        getData(searchValue);
    } else {
        resultEl.innerHTML = "Du måste fylla i textfältet";
    }
}

/**
 * Hämtar geografisk data från Nominatim API utifrån användares sökdata från inputfält
 * 
 * @param {string} input - sökdata i textform från inputfält
 * @returns {void} - returnerar inget värde utan anropar funktion showMap med data från API
 * @throws {error} - skriver ut fel i DOM om hämtning misslyckas
 */
async function getData(input) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=jsonv2`);
        const data = await res.json();
        showMap(data);
    } catch (error) {
        resultEl.innerHTML = "Platsen finns ej, prova sök igen";
    }
}

/**
 * Visar karta med geodata (longitud & latitud) från första träffen från API-svaret
 * 
 * @param {array} pos - array med geodatabobjekt från API
 * @returns {void} - returnerar inget värde utan uppdaterar DOM med karta
 */

function showMap(pos) {
    //latitud och longitud från första objektet i sökning
    const lat = pos[0].lat;
    const lon = pos[0].lon;

    //variabel för kart-url
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat},${lon},${lat}&amp;layer=mapnik&amp;marker=${lat},${lon}`;

    //skriva ut karta till DOM
    resultEl.innerHTML = `<iframe class="responsive-iframe" width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>`
}