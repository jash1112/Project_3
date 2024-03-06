let url = 'http://127.0.0.1:5000/api/company';
let allData = []; // To store all company data

// Fetch all data and initialize dropdowns
fetch(url)
  .then(response => response.json())
  .then(data => {
    allData = data; // Store the data for later use
    initializeCountriesDropdown(data);
    initializeDataTypeDropdown(); // Initialize this for user to select data type after country is selected
  })
  .catch(error => console.error('Error fetching data:', error));

function initializeCountriesDropdown(data) {
  const dropdown = document.getElementById('countriesDropdown');
  const countries = [...new Set(data.map(item => item.Country_Name))]; // Extract distinct countries
  
  // Populate dropdown with countries
  countries.forEach(country => {
    const option = new Option(country, country);
    dropdown.add(option);
  });
  
  // Event listener for country selection
  dropdown.addEventListener('change', function() {
    updateChartForCountry(this.value); // Update chart when a country is selected
  });
}

function initializeDataTypeDropdown() {
  const dataTypeDropdown = document.getElementById('dataTypeDropdown');
  dataTypeDropdown.addEventListener('change', function() {
    const selectedCountry = document.getElementById('countriesDropdown').value;
    if(selectedCountry) updateChartForCountry(selectedCountry); // Re-update the chart with the new data type for the already selected country
  });
}

function updateChartForCountry(country) {
    const filteredData = allData.filter(item => item.Country_Name === country);
  
    const companyNames = filteredData.map(item => item.Company_Name);
    const dataType = document.getElementById('dataTypeDropdown').value; // Get the selected data type
  
    // Dynamically choose which data to display based on the dataType
    let dataValues = [];
    switch(dataType) {
        case 'Market_Cap':
            dataValues = filteredData.map(item => item.Market_Cap);
            break;
        case 'P/E_Ratio':
            dataValues = filteredData.map(item => item['P/E_Ratio']);
            break;
        case 'Dividend':
            dataValues = filteredData.map(item => item.Dividend);
            break;
        default:
            console.error('Invalid data type selected');
            return;
    }
  
    updateChart(companyNames, dataValues, dataType);
}

function updateChart(companyNames, dataValues, dataType) {
    const ctx = document.getElementById('bar_graph').getContext('2d');
    
    // Define a mapping of data types to background colors
    const backgroundColors = {
        'Market_Cap': 'rgba(255, 99, 132, 0.5)', // Red
        'P/E_Ratio': 'rgba(54, 162, 235, 0.5)', // Blue
        'Dividend': 'rgba(75, 192, 192, 0.5)' // Green
    };

    const backgroundColor = backgroundColors[dataType] || 'rgba(201, 203, 207, 0.5)'; // Default to grey if dataType is unknown

    // Check if the chart instance already exists
    if (window.myBarChart) window.myBarChart.destroy(); // This will destroy the existing chart instance
    
    window.myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: companyNames,
          datasets: [{
              label: dataType,
              data: dataValues, 
              backgroundColor: backgroundColor, 
              stack: 'Stack 0'
          }]
      },
      options: {
          scales: {
              x: {stacked: true},
              y: {stacked: true}
          },
          plugins: {
              title: {
                  display: true,
                  text: 'Chart.js Bar Chart - Stacked'
              }
          }
      }
    });
}