"use strict";

/**
 * Lyssnare för DOM färdigladdat
 * Anropar sedan fetchData för att hämta data till sidan
 * 
 * @event DOMContentLoaded
 * @listens document#DOMContentLoaded
 * @returns {void} - returnerar inget värde utan anropar funktion när DOM laddat klart
 */

//ladda DOM
document.addEventListener("DOMContentLoaded", async () => {
    fetchData();
})

/**
 * Hämtar diagramdata från extern JSON-fil
 * som skickas vidare till WriteCharts
 * 
 * @function fetchData
 * @returns {void} - returnerar inget värde utan anropar funktion när data hämtas
 * @throws {error} - Skriver ut fel i konsol om hämtning misslyckats
 * 
 */
//hämta JSON-data
async function fetchData() {
    try {
        const response = await fetch("https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json");
        const data = await response.json();

        writeCharts(data);

    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}
/**
 * Filtrerar, sorterar och skiver ut 2 diagram till DOM
 * Filtrerar ut kurser och program
 * Sorterar i fallande ordning efter totalt sökande
 * Väljer topp 6 sökta kurser & topp 5 sökta program
 * Skapar cirkeldiagram för program och stapeldiagram för kurser
 * 
 * @function writeCharts
 * @param {array} chartsData - array med data från JSON-fil
 * @returns {void} - returnerar inget värde,
 */

//funktion för filtrering och utskrift av diagram
function writeCharts(chartsData) {
    //DOM element för utskrift
    const chartStapel = document.querySelector("#canvas-stapel");
    const chartCirkel = document.querySelector("#canvas-cirkel");

    //lagra nya arrayer till stapel diagram
    const courseNameArr = [];
    const courseAppArr = [];
    const programNameArr = [];
    const programAppArr = [];

    //filtrera array på type: kurs
    const courseData = chartsData.filter((data) => data.type.toLowerCase().includes("kurs"));
    const programData = chartsData.filter((data) => data.type.toLowerCase().includes("program"));

    //sortera array fallande efter tot sökande
    courseData.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    programData.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

    //loop för 6 första värderna i sorterad array courseData
    courseData.slice(0, 6).forEach(course => {
        courseNameArr.push(course.name);
        courseAppArr.push(course.applicantsTotal);
    })

    //loop för 5 första värderna i sorterad array programData
    programData.slice(0, 5).forEach(program => {
        programNameArr.push(program.name);
        programAppArr.push(program.applicantsTotal);
    })

    //inställningsvariabler för stapel-diagram
    const stapelOptionChart = {
        maintainAspectRatio: false,
        scales: {
            y: {
                stacked: true,
                grid: {
                    display: true,
                    color: "rgba(255, 255, 255, 0.73)"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const stapelDataChart = {
        labels: courseNameArr,
        datasets: [{
            data: courseAppArr,
            borderWidth: 1,
            borderColor: 'rgb(255, 255, 255)',
            borderWidth: 3,
            backgroundColor: [
                'rgba(234, 46, 87, 0.73)',
                'rgba(54, 163, 235, 0.73)',
                'rgba(255, 204, 86, 0.73)',
                'rgba(18, 241, 63, 0.73)',
                'rgba(214, 27, 235, 0.73)'
            ],
            hoverBackgroundColor: [
                'rgb(234, 46, 87)',
                'rgb(54, 163, 235)',
                'rgb(255, 204, 86)',
                'rgb(18, 241, 63)',
                'rgb(214, 27, 235)'
            ]
        }]
    };

    //iställningsvaribler för cirkel-diagram
    const cirkelDataChart = {
        labels: programNameArr,
        datasets: [{
            label: 'Antal sökande',
            data: programAppArr,
            backgroundColor: [
                'rgba(234, 46, 87, 0.73)',
                'rgba(54, 163, 235, 0.73)',
                'rgba(255, 204, 86, 0.73)',
                'rgba(18, 241, 63, 0.73)',
                'rgba(214, 27, 235, 0.73)'
            ],
            hoverBackgroundColor: [
                'rgb(234, 46, 87)',
                'rgb(54, 163, 235)',
                'rgb(255, 204, 86)',
                'rgb(18, 241, 63)',
                'rgb(214, 27, 235)'
            ],
            hoverOffset: 4
        }]
    };

    //Skapar stapeldiagram och skriver ut till DOM
    new Chart(chartStapel, {
        type: 'bar',
        data: stapelDataChart,
        options: stapelOptionChart
    })

    //skapar cirkeldiagram och skriver ut till DOM
    new Chart(chartCirkel, {
        type: 'pie',
        data: cirkelDataChart,
        options: {
            maintainAspectRatio: false
        }
    })
}