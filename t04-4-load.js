// Load the tvBrandCount.csv file from /data
d3.csv("data/tvBrandCount.csv", d => {
    console.log(d); // inspect raw rows as they stream in
});
d3.csv("data/tvBrandCount.csv", d => {
return {
    brand: d.brand,
    count: +d.count // '+' converts string to number
};
}).then(data => {
    data.sort((a, b) => d3.descending(a.count, b.count));
    console.log(data); // array of typed objects
    createBarChart(data);
    });