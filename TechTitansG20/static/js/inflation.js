<script>
document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([20, 0], 2); // Adjusted for global view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    document.getElementById('yearSelector').addEventListener('change', function() {
        fetch(`/api/inflation?year=${this.value}`)
            .then(response => response.json())
            .then(data => {
                // Clear existing markers
                // Note: Implement logic to clear markers if you're adding new markers
                data.forEach(country => {
                    if(country[this.value] !== "no data") {
                        L.marker([country.latitude, country.longitude]).addTo(map)
                            .bindPopup(`${country.Country_Name}: ${country[this.value]}`);
                    }
                });
                // Update table
                updateTable(data, this.value);
            })
            .catch(error => console.error('Error:', error));
    });

    function updateTable(data, year) {
        // Clear existing table rows
        // Note: Implement logic to sort data and update the table with top 20 countries
    }
});
</script>