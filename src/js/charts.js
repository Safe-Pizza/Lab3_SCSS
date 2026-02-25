"use strict";

//global variabel för hämtad data
let allChartData = [];

const chartStapel = document.querySelector("#canvas-stapel");
const chartCirkel = document.querySelector("#canvas-cirkel");

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

        getStapelData(data);
    } catch (error) {
        console.error(`Felmeddelande ${error}`);
    }
}

function getStapelData(chartsData) {
    //lagra nya arrayer till stapel diagram
    const courseNameArr = [];
    const courseAppArr = [];

    //filtrera array på type: kurs
    const courseData = chartsData.filter((data) => data.type.toLowerCase().includes("kurs"));

    //sortera array fallande efter tot sökande
    courseData.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
    
    //loop för 6 första värderna i sorterad array
    courseData.slice(0, 6).forEach(course => {
        courseNameArr.push(course.name);
        courseAppArr.push(course.applicantsTotal);
    })

    //Skapar stapeldiagram och skriver ut till DOM
    new Chart(chartStapel, {
        type: 'bar',
        data: {
            labels: courseNameArr,
            datasets: [{
                label: '# of Votes',
                data: courseAppArr,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}