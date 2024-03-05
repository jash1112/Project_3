//let url = '/api/inflation';

function drawLineChart() {
    d3.json(inflationUrl).then(data => {
        let dates = Object.keys(data[0]).filter(key => !isNaN(parseInt(key)));
        let listOfCountries = ['Argentina', 'Australia', 'Brazil', 'Canada', 'China', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Mexico', 'Russia', 'Saudi Arabia', 'South Korea', 'Turkey', 'UK', 'US', 'EU'];
        let listOfTraces = [];

        listOfCountries.forEach(country => {
            let countryData = data.find(entry => entry.Country_Name === country);
            if (countryData) {
                let countryGDP = dates.map(year => parseFloat(countryData[year].replace(',', '')));
                let trace = {
                    x: dates,
                    y: countryGDP,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})` },
                    line: { width: 2 },
                    name: country
                };
                listOfTraces.push(trace);
            }
        });

        let layout = {
            title: "Inflation Comparison by Country",
            xaxis: {
                title: 'Year'
            },
            yaxis: {
                title: 'Inflation Value',
                range: [-30, 30]
            },
            margin: {
                l: 50,
                r: 50,
                b: 200,
                t: 50,
                pad: 4
            }
        };

        Plotly.newPlot("inflationplot", listOfTraces, layout);
    });
}

drawLineChart();