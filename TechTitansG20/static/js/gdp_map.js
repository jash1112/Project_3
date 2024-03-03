function updateContent() {
    var year = document.getElementById('yearSelector').value;
    // Fetch GDP data for the selected year
    fetch(`/api/gdp?year=${year}`)
        .then(response => response.json())
        .then(data => {
            // Update the map and table with the fetched data
            updateMap(data);
            updateTable(data);
        })
        .catch(error => console.error("Failed to fetch GDP data:", error));
}

function updateMap(data) {
    // Assuming you have a way to clear existing markers on the map
    // clearMarkers();

    data.forEach(countryData => {
        if (countryData.gdp !== "no data") {
            var marker = L.marker([countryData.lat, countryData.lng]).addTo(map);
            marker.bindPopup(`<b>${countryData.name}</b><br>GDP: ${countryData.gdp}`);
        }
    });
}

function updateTable(data) {
    // Sort the data by GDP in descending order and take the top 20
    var sortedData = data.sort((a, b) => b.gdp - a.gdp).slice(0, 20);

    var tableBody = document.getElementById('tableBody');
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Add new rows for the top 20 countries
    sortedData.forEach((country, index) => {
        if (country.gdp !== "no data") {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = country.name;
            cell2.innerHTML = country.gdp;
        }
    });
}