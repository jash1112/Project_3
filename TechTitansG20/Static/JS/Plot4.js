// Fetch GDP data from the server
var gdpUrl = '/api/gdp'; // URL for fetching GDP data
var inflationUrl = '/api/inflation'; // URL for fetching inflation data

// Function to create the GDP layer
function getGdpLayer(gdpResponse) {
    let markers = [];
    gdpResponse.forEach(function(country) {
        // Determine the color based on GDP value
        let color = '';
        if (country[2023] >= 6) {
            color = 'darkgreen';
        } else if (country[2023] > 3) {
            color = 'lightgreen';
        } else if (country[2023] >= 0) {
            color = 'mediumseagreen';
        } else {
            color = 'red';
        }

        // Create a custom icon based on GDP
        let icon = L.icon({
            iconUrl: 'leaf.png', // Adjust the icon URL accordingly
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41],
            // Use the determined color
            iconColor: color
        });

        let marker = L.marker([country.latitude, country.longitude], { icon: icon });
        marker.bindPopup('<h3>' + country.Country_Name + '</h3><br>GDP: $' + country[2023] + ' billion');
        markers.push(marker);
    });
    let gdpLayer = L.layerGroup(markers);
    return gdpLayer;
}

// Function to create the inflation layer
function getInflationLayer(inflationResponse) {
    let inflationMarkers = [];
    inflationResponse.forEach(function(country) {
        // Create a custom icon based on inflation rate
        let icon = L.icon({
            iconUrl: 'leaf-green.png', // Adjust the icon URL accordingly
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41]
        });

        let marker = L.marker([country.latitude, country.longitude], { icon: icon });
        marker.bindPopup('<h3>' + country.Country_Name + '</h3><br>Inflation Rate: ' + country[2023] + '%');
        inflationMarkers.push(marker);
    });
    let inflationMarkersLayer = L.layerGroup(inflationMarkers);
    return inflationMarkersLayer;
}

// Create the tile layer that will be the background of our map.
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a baseMaps object to hold the streetmap layer.
let baseMaps = {
    "Worldmap": streetmap
};

// Create the map object with options.
let myMap = L.map("map", {
    center: [10, 0],
    zoom: 3,
    layers: [streetmap]
});

// Fetch GDP data
fetch(gdpUrl)
    .then(response => response.json())
    .then(gdpData => {
        // Fetch inflation data
        fetch(inflationUrl)
            .then(response => response.json())
            .then(inflationData => {
                // Create overlay maps
                let overlayMaps = {
                    "GDP": getGdpLayer(gdpData),
                    "Inflation": getInflationLayer(inflationData)
                };

                // Create a layer control, and pass it baseMaps. Add the layer control to the map
                L.control.layers(baseMaps, overlayMaps).addTo(myMap);
            });
    });
