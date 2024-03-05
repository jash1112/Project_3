// Fetch GDP data from the server
var gdpUrl = '/api/gdp'; // URL for fetching GDP data
var inflationUrl = '/api/inflation'; // URL for fetching inflation data
 // Create an overlayMaps object to hold the GDP layer.
 

// Create the tile layer that will be the background of our map.

function get_gdpLayer(gdpResponse) {
    console.log(gdpResponse);
    let markers = [];
    gdpResponse.forEach(function(country) {
        // Create a custom icon based on GDP
        let icon = L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png', 
            iconSize: [25, 41], 
            iconAnchor: [12, 41], 
            popupAnchor: [0, -41] 
        });

        let marker = L.marker([country.latitude, country.longitude], { icon: icon });
        marker.bindPopup('<h3>' + country.Country_Name + '</h3><br>GDP: $' + country[2023] + ' billion');
        markers.push(marker);
    });
    let gdpLayer = L.layerGroup(markers);
    return gdpLayer;
}

function getInflationLayer(inflationResponse) {
    console.log(inflationResponse);
    let inflationMarkers = [];
    inflationResponse.forEach(function(country) {
        // Create a custom icon based on inflation rate
        let icon = L.icon({
            iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', 
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


// function get_gdpLayer(gdpResponse)
// {
//      console.log(gdpResponse);
//     // Loop through the GDP data and add markers to the map
//     let markers=[]
//     gdpResponse.forEach(function(country) {
//         let marker = L.marker([country.latitude, country.longitude], {markerColor: "green"});
//          marker.bindPopup('<h3>' + country.Country_Name + '</h3><br>GDP: $' + country[2023] + ' billion');
//         // Adding the marker to the overlayMaps object
//         markers.push(marker);
//     });
//     let gdpLayer= L.layerGroup(markers);
//     return gdpLayer;
// };
  
// // Fetch inflation data



//     function getInflationLayer(inflationResponse ) {
//         console.log(inflationResponse);
//         let inflationMarkers=[]
//         // Loop through the inflation data and add markers to the map
//         inflationResponse.forEach(function(country) {
//             let marker = L.marker([country.latitude, country.longitude], {markerColor: "red"})
//                 marker.bindPopup('<h3>' + country.Country_Name + '</h3><br>Inflation Rate: ' + country[2023] + '%');
//             // Adding the marker to the overlayMaps object
//             inflationMarkers.push(marker);
//         });
//         let inflationMarkersLayer= L.layerGroup(inflationMarkers);
//         return inflationMarkersLayer
//     };

    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Worldmap": streetmap
    };
    
    // Create the map object with options.
    let Mymap = L.map("map", {
        center: [10,0],
        zoom: 3, 
        layers: [streetmap]
      });

    fetch(gdpUrl)
    .then(gdpResponse => gdpResponse.json())
    .then(gdpData => {
        fetch(inflationUrl)
        .then(inflationResponse => inflationResponse.json())
        .then(inflationData =>{
     
        let overlayMaps = {
            "GDP":get_gdpLayer(gdpData),
            "inflation":getInflationLayer(inflationData)
        };
        // Create a layer control, and pass it baseMaps. Add the layer control to the map
        console.log(overlayMaps)
        L.control.layers(baseMaps, overlayMaps).addTo(Mymap);

    })
})

    