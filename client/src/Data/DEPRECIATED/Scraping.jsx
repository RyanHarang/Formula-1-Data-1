import { useState } from "react";

function Scraping() {
    const [word, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    function fetchData() {
        setLoading(true);
        fetch("https://proxy.corsfix.com/?https://pitwall.app/drivers")
            .then(response => response.text())
            .then(html => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(html, "text/html");
                let table = doc.querySelector("table");
                setTitle(html);
                // if (table == null) {
                //     setTitle("table null");
                // }
                // else{
                //     setTitle("Data fetched successfully");
                // }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error:", error);
                setTitle("Error fetching data");
                setLoading(false);
            });
    }

    return (
        <div>
            <h1>Scraping</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? "Scraping..." : "Scrape"}
            </button>
            <div className="text-center text-lg font-semibold">
                {loading ? "Loading..." : word}
            </div>
        </div>
    );
}

export default Scraping;