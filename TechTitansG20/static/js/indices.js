let url = '/api/indices';
function drawLineChart() {
    d3.json(url).then(data => {
        let dates = data.map(entry => entry.Date);
        let percentages = data.map(entry => parseFloat(entry.Percentage));
        // line chart trace
        let listOfCountries=['Australia', 'Brazil','Canada', 'China', 'India', 'Turkiya', 'UK', 'US','France', 'Germany','Indonesia', 'Italy', 'Japan', 'Mexico','Russia', 'Saudi Arabia', 'South Korea'];
        let listOfTraces=[];
        console.log(data)
        listOfCountries.forEach(country =>{
            
            listOfTraces.push(
                {
                    x: dates,
                    y: data.map(entry => parseFloat(entry[country].replace(',', ''))),
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`},
                    line: {width: 2},
                    name:country
                }
            )

        })
        
        let trace = {
            x: dates,
            y: percentages,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`},
            line: {width: 2}
        };
        // layet
        let layout = {
            title: 'G20 S/P 500 Index',
            xaxis: {title: 'Date'},
            yaxis: {title: 'Percentage'}
        };
        console.log(listOfTraces)
        // result
        Plotly.newPlot('line_chart', listOfTraces, layout);
    });
};

document.addEventListener('DOMContentLoaded', function() {
    drawLineChart();
});


// let url = '/api/indices';
// function drawLineChart(data) {
//     let dates = data.map(entry => entry.Date); // Assuming your data is an array of objects like the one provided
//     let listOfCountries = ['Argentina']; // Updated list with 'South Africa'
//     let listOfTraces = listOfCountries.map(country => {
//         return {
//             x: dates,
//             y: data.map(entry => parseFloat(entry[country].replace(',', ''))),
//             type: 'scatter',
//             mode: 'lines+markers',
//             marker: {color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`},
//             line: {width: 2},
//             name: country
//         };
//     });

//     let layout = {
//         title: 'G20 S/P 500 Index',
//         xaxis: {title: 'Date'},
//         yaxis: {title: 'Value'}
//     };

//     Plotly.newPlot('line_chart', listOfTraces, layout);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     let data = [/* your data object here */];
//     drawLineChart(data);
// });