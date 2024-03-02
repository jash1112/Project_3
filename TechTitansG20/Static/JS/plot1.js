// Fetch GDP data from the server
var gdpUrl = '/api/gdp'; // URL for fetching GDP data
var inflationUrl = '/api/inflation'; // URL for fetching inflation data

// Fetch GDP data
d3.json(gdpUrl).then(function(gdpResponse) {
    console.log(gdpResponse);

    // Fetch inflation data
    d3.json(inflationUrl).then(function(inflationResponse) {
        console.log(inflationResponse);

        // Create a Leaflet map
        var map = L.map('map').setView([20, 0], 2);

        // Add OpenStreetMap tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Loop through the GDP data and add markers to the map
        gdpResponse.forEach(function(country) {
            var marker = L.marker([country.latitude, country.longitude]).addTo(map);
            marker.bindPopup('<b>' + country.Country_Name + '</b><br>GDP: $' + country.GDP_data.join(', $') + ' billion');
        });

        // Loop through the inflation data and add markers to the map
        inflationResponse.forEach(function(country) {
            var marker = L.marker([country.latitude, country.longitude]).addTo(map);
            marker.bindPopup('<b>' + country.Country_Name + '</b><br>Inflation Rate: ' + country.Inflation_Rate + '%');
        });
    });
});
