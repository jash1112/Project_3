// url = 'http://127.0.0.1:5000/api/gdp';
// d3.json(url).then(function(response) {
//     console.log(response);


// let trace1 = {
//         x: Object.keys(response),  // Assuming the response is an object with categories as keys
//         y: Object.values(response), // Assuming the response values are the data points
//         text: 'blabla',
//         name: 'funny chart',
//         type: 'bar'
// };
// // let trace2 = {
// //     x: [32,64,78,34,54,90],
// //     y: [90,102,127,8,29],
// //     text: 'cool',
// //     name: 'next chart',
// //     type: 'bar'
// // };

// // create data array
// // create data array
// let data = [trace1];
// let layout = {
//     title: "Bar Chart",
//     xaxis: {
//         title: 'Categories'
//     },
//     yaxis: {
//         title: 'Values'
//     },
//     barmode: "group",
//     margin: {
//         l: 50,
//         r: 50,
//         b: 200,
//         t: 50,
//         pad: 4
//     }
// };

// // plot the data
// Plotly.newPlot("plot", data, layout);
// });

async function loadAndPlotData() {
    const url = '/api/gdp';
    try {
        const response = await d3.json(url);
        console.log(response);

        if (!response || Object.keys(response).length === 0) {
            console.error('No data received');
            return; // Exit if no data
        }

        let trace1 = {
            x: Object.keys(response),  // Categories
            y: Object.values(response), // Data points
            text: 'GDP Data',
            name: 'GDP',
            type: 'bar'
        };

        let data = [trace1];
        let layout = {
            title: "GDP Bar Chart",
            xaxis: { title: 'Countries' },
            yaxis: { title: 'GDP in Billions' },
            barmode: "group",
            margin: { l: 50, r: 50, b: 100, t: 50, pad: 4 }
        };

        Plotly.newPlot("plot", data, layout);
    } catch (error) {
        console.error('Error fetching or plotting data:', error);
    }
}

loadAndPlotData();


//------indices------

function drawLineChart() {
    let url = 'http://127.0.0.1:5000/api/indices'; 
    d3.json(url).then(data => {
        let dates = data.map(entry => entry.Date);
        let percentages = data.map(entry => parseFloat(entry.Percentage));

        // line chart trace
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

        // result
        Plotly.newPlot('line-chart', [trace], layout);
    });
}