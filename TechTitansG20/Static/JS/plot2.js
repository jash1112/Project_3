// Fetch GDP data from the server
var gdpUrl = '/api/gdp'; // URL for fetching GDP data
var inflationUrl = '/api/inflation'; // URL for fetching inflation data
 // Create an overlayMaps object to hold the GDP layer.
 

// Create the tile layer that will be the background of our map.
// Fetch GDP data

fetch(gdpUrl)
    .then(response => response.json())
    .then(gdpResponse =>{
    
        console.log("insde then")
        console.log(gdpResponse);
        // Loop through the GDP data and add markers to the map
        let markers=[]
        gdpResponse.forEach(function(country) {
            let marker = L.marker([country.latitude, country.longitude]);
            // marker.bindPopup('<h3>' + country.Country_Name + '</h3><br>GDP: $' + country.GDP_data + ' billion');
            // Adding the marker to the overlayMaps object
            markers.push(marker);
            
        });
        let GDPMap= L.layerGroup(markers);

        let inflationMarkers_map= fetch(inflationUrl)
    .then(response => response.json())
    .then(inflationResponse => {
        console.log(inflationResponse);
        let inflationMarkers=[]
        // Loop through the inflation data and add markers to the map
        inflationResponse.forEach(function(country) {
            let marker = L.marker([country.latitude, country.longitude]);
            // marker.bindPopup('<b>' + country.Country_Name + '</b><br>Inflation Rate: ' + country.Inflation_Rate + '%');
            // Adding the marker to the overlayMaps object
            inflationMarkers.push(marker);
            
        });
        let inflationMarkers_map= L.layerGroup(inflationMarkers);


    })
    


    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Worldmap": streetmap
    };
    
    let overlayMaps = {
        "GDP":GDPMap,
        "inflation":inflationMarkers_map
    };
    
    // Create an empty overlayMaps object
    // let overlayMaps = {};
    
    // Create the map object with options.
    let Mymap = L.map("map", {
      center: [39, 34],
      zoom: 1, 
      layers: [streetmap]
    });
    
    // Create a layer control, and pass it baseMaps. Add the layer control to the map
    // L.control.layers(baseMaps, overlayMaps).addTo(Mymap);
    

    });
   

// Fetch inflation data


    
// Add overlayMaps to the layer control
// L.control.layers(baseMaps, overlayMaps).addTo(Mymap);