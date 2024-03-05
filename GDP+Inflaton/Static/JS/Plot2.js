url = '/api/inflation';
d3.json(url).then(function(response) {
    console.log(response);

    // Extract years from the first object in the response
    const years = Object.keys(response[0]).filter(key => key !== "Country_Name" && key !== "latitude" && key !== "longitude");

    // Prepare data for Plotly
    // let data = response.map(country => {
    //     return {
    //         x: years,
    //         y: years.map(year => parseFloat(country[year])), 
    //         type: 'bar',
    //         name: country.Country_Name,
    //         text: country.Country_Name + ' GDP',
    //         hoverinfo: 'text+y',
    //     };
    // });
    data={
        x:[1,2,3,4,5],
        y:[2,4,3,5,7],
        type: 'scatter'
    }

    // Set up layout for the chart
    let layout = {
        title: "GDP Comparison by Country",
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'GDP Value'
        },
        barmode: 'group',
        margin: {
            l: 50,
            r: 50,
            b: 200,
            t: 50,
            pad: 4
        }
    };

    // Plot the data
    Plotly.newPlot("plot", [data], layout);
});
