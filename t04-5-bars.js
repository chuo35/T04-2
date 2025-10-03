const createBarChart = (data) => {
  //Setup the bar Sizes with its logical and display sizes
  const viewW = 500;                                 // logical width (forces x-scaling) //for the bar chart
  const viewH = Math.max(220, data.length * 28);     // logical height based on rows
  const displayW = 1000;                               // rendered width on page //for the background conatiner
  const displayH = Math.min(480, data.length * 24 + 40); // rendered height cap

  // --- SVG root ---
  const svg = d3.select(".responsive-svg-container")
    .append("svg")                    //append the svg to the container
      .attr("viewBox", `0 0 ${viewW} ${viewH}`) // defines logical coords
      .attr("width", displayW)                   // actual rendered size
      .attr("height", displayH)                  // actual rendered size  //define how it shows on the page
      .style("border", "1px solid #ccc");        // add thw colour to the border

  // --- Scales (from T04-6) ---
  const xMax = d3.max(data, d => d.count); //converts counts (numbers) to bar widths.
  const xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, viewW]);

  const yScale = d3.scaleBand()  //converts brand names to vertical positions
    .domain(data.map(d => d.brand))   // change if your category column differs
    .range([0, viewH])
    .paddingInner(0.2)
    .paddingOuter(0.1);

  //Groups per Row (bars + labels together)
  const labelX = 100; // x position for all labels (to right of bar)

  const barAndLabel = svg
    .selectAll("g")  //group into g 
    .data(data) //call the size
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);  //move each group to its y position

  // --- Bar rectangle inside the group ---
  //Draw the Bar
  barAndLabel
    .append("rect")
      .attr("x", labelX)                     // bar starts at x = 100
      .attr("y", 0)
      .attr("width", d => xScale(d.count))   // scaled width fits the viewBox
      .attr("height", yScale.bandwidth())    // bar thickness from band scale
      .attr("fill", "steelblue");

  // --- Category text (left of bar, right-aligned at x=100) ---
  //let the brand just at the side of the bar
  barAndLabel
    .append("text")
      .text(d => d.brand)                    // change if your category column differs
      .attr("x", labelX)
      .attr("y", 15)                         // adjust to center in the band
      .attr("text-anchor", "end")            // right-align so text ends at x=100
      .style("font-family", "sans-serif")
      .style("font-size", "13px");

  // --- Value text (at the end of each bar) ---
  barAndLabel
    .append("text")
      .text(d => d.count)                    // numeric label
      .attr("x", d => labelX + xScale(d.count) + 4) // just past bar end adding 4 px for not stick with the bar
      .attr("y", 12)                         // adjust as needed
      .style("font-family", "sans-serif")
      .style("font-size", "13px");
};
