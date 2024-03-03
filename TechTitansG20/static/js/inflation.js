document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map on the "map" div with a given center and zoom
    var map = L.map('map', {
        center: [20.5937, 78.9629], // Example center coordinates (latitude, longitude)
        zoom: 2, // Example zoom level
        maxZoom: 18, // Maximum zoom level
        minZoom: 2, // Minimum zoom level
        layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                // Attribution is required for OpenStreetMap
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            })
        ]
    });

    // Example function to update content based on the selected year
    function updateContent() {
        var year = document.getElementById('yearSelector').value;
        console.log("Selected year:", year);
        // Placeholder for AJAX call to fetch data and update the map and table
    }

    // Event listener for the dropdown selection change
    document.getElementById('yearSelector').addEventListener('change', updateContent);

    // Initial call to populate the map based on the default or initial year selection
    updateContent();
});