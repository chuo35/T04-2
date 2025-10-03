// call the tvBrandCount.csv file from /data
d3.csv("data/tvBrandCount.csv", d => {
    console.log(d); // check data loaded from CSV
});
// call the tvBrandCount.csv file from /data and convert count to number
d3.csv("data/tvBrandCount.csv", d => {
return {
    brand: d.brand,
    count: +d.count // '+' converts string to number
};
}).then(data => {
    data.sort((a, b) => d3.descending(a.count, b.count)); // Sort descending by count
    console.log(data); // array of typed objects
    createBarChart(data); //call chart function from t04-5-bars.js
    });