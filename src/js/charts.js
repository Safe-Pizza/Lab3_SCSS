"use strict";

//global varibel för hämtad data
let allChartData = [];

//ladda DOM
document.addEventListener("DOMContentLoaded", async () => {
    fetchData();
})

//hämta JSON-data
async function fetchData() {
    try {
        const response = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
        const data = await response.json();

        //lagra i global variabel
        allChartData = data;

        writeChart(data);
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

function writeChart(chartsData) {
    console.log(chartsData);
}