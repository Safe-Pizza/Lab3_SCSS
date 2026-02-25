"use strict";

//ladda DOM
document.addEventListener("DOMContentLoaded", async () => {
    fetchData();
})

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


//funktion för filtrering och utskrift av stapeldiagram
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
                    color: "rgba(255, 255, 255, 0.2)"
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const stapelDataChart = {
        labels: courseNameArr,
        datasets: [{
            label: 'Antal sökande',
            data: courseAppArr,
            borderWidth: 1
        }]
    };

    //iställningsvaribler för cirkel-diagram
    const cirkelDataChart = {
        labels: programNameArr,
        datasets: [{
            label: 'Antal sökande',
            data: programAppArr,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
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
        //options: stapelOptionChart
    })
}