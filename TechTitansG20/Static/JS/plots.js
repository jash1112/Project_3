url = 'api/v1.0/global_data';
d3.json(url).then(function(response) {
    console.log(response);


let trace 1 = {
    x: ,
    y: ,
    text: ,
    name: ,
    type: 'bar'
};

let trace 2 = {
    x: ,
    y: ,
    text: ,
    name: ,
    type: 'bar'
};

// create data array
// create data array
let data = [trace1, trace2];
let layout = {
    title: "xxxxxxxxx",
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
plotly.newPlot("plot", data, layout);
});