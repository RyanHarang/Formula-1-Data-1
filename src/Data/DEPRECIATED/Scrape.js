import { JSDOM } from "jsdom";
import { fetch, setGlobalDispatcher, Agent } from 'undici'
setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }) )

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const targetUrl = "https://pitwall.app/drivers/archive/1978";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchYear(year) {
    let drivers = [];
    try {
        let url = `https://pitwall.app/driversarchive/${year}`;
        console.log(url);
        const response = await fetch(url, {
            method: "GET",
            headers: {
                //"Origin": "*",
                //"X-Requested-With": "XMLHttpRequest"
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
            },
            family: 4
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Find the table by class name (adjust class as needed)
        let table = doc.querySelector("table.data-table");

        if (!table) {
            console.log("Table not found");
            return;
        }

        // Get all rows from the table
        let rows = table.querySelectorAll("tr");

        for (let i = 1; i < rows.length; i++) {
            let cells = rows[i].querySelectorAll("td");
            let name = cells[0].querySelector("a").textContent.trim();
            if (!drivers.includes(name)) {
                drivers.push(name);
            }
        }
        return drivers;

    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

async function fetchData() {
    let drivers = [];
    let lastYear = 2025
    while (lastYear >= 1950) {
        let tempDrivers = await fetchYear(lastYear);
        tempDrivers.forEach(driver => {
            if (!drivers.includes(driver)) {
                drivers.push(driver);
            }
        });
        lastYear--;
        await sleep(60 * 1000) //1 minute
    }
    return drivers;
}

let drivers = await fetchData();
drivers.forEach(driver => console.log(driver));
console.log("done");
