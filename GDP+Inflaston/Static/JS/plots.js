url = 'api/v1.0/global_data';
d3.json(url).then(function(response) {
    console.log(response);


let trace1 = {
        x: Object.keys(response),  // Assuming the response is an object with categories as keys
        y: Object.values(response), // Assuming the response values are the data points
        text: 'blabla',
        name: 'funny chart',
        type: 'bar'
};
// let trace2 = {
//     x: [32,64,78,34,54,90],
//     y: [90,102,127,8,29],
//     text: 'cool',
//     name: 'next chart',
//     type: 'bar'
// };

// create data array
// create data array
let data = [trace1];
let layout = {
    title: "Bar Chart",
    xaxis: {
        title: 'Categories'
    },
    yaxis: {
        title: 'Values'
    },
    barmode: "group",
    margin: {
        l: 50,
        r: 50,
        b: 200,
        t: 50,
        pad: 4
    }
};

// plot the data
Plotly.newPlot("plot", data, layout);
});