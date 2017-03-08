// HeatMap.js

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json');
xhr.onload = function() {
  if (xhr.status === 200) {
    var dataset = JSON.parse(xhr.response);
    console.log(dataset);

    // Instantiate variables
    var chartWidth = 819;
    var chartHeight = 450;
    var chartPadding = 30;

    // Set up xScale
    var xScale = d3.scaleLinear()
                   .domain([1753, d3.max(dataset.monthlyVariance, function(d) { return d.year; })])
                   .range([chartPadding, chartWidth - chartPadding]);
    
    // Set up yScale
    var yScale = d3.scaleLinear()
                   .domain([1, 12])
                   .range([chartPadding, chartHeight - chartPadding]);
    
     // Set up xAxis
    var xAxis = d3.axisTop(xScale);

    // Set up yAxis
    var yAxis = d3.axisLeft(yScale);

    // Setup tooltip div
    var tooltip = d3.select('body')
                    .append('div')
                    .attr('class', 'tooltipStyles')

    // Append svg to page
    var svg = d3.select('#chartDiv')
                .append('svg')
                .attr('width', chartWidth)
                .attr('height', chartHeight);

    // Append rects to svg
    svg.selectAll('rect')
       .data(dataset.monthlyVariance)
       .enter()
       .append('rect')
       .attr('x', function(d) { return xScale(d.year)})
       .attr('y', function(d) { return yScale(d.month)})
       .attr('width', '3px')
       .attr('height', '35px')
       .attr('fill', function(d) {
         if (d.variance < -3.0) {
            // Temps 3 degrees below average are colored blue
           return '#00bfff'
         } else if (d.variance > -3.0 && d.variance < -1.0) {
           // Temps between 1 and 3 degrees below average are colored pale green
           return '#abfcab';
         } else if (d.variance >= -1.0 && d.variance < -0.5) {
           // Temps between -1 and -0.5 degrees below average are colored darker green
           return '#61f961';
         } else if (d.variance > -0.5 && d.variance < 0.5) {
           // Temps close to average are colored pale yellow
           return '#ffffb1';
         } else if (d.variance > 0.5 && d.variance <= 1.0) {
           // Temps between 0.5 and 1 degree above average are colored darker yellow
           return '#ffff19';
         } else if (d.variance > 1.0 && d.variance < 3.0) {
           // Temps between 1 and 3 degrees above average are colored pale orange
           return '#ffac14';
         } else if (d.variance > 3.0) {
           // Temps above 3 degrees above average are colored dark orange
           return '#c78000';
         }
        })
       .attr('class', 'box')
       .on('mouseover', function(d) {
                       tooltip.transition().style('display', 'block')
                       tooltip.html(d.month + ", " + d.year + "<br>Temp variation: " + d.variance )
                              .style('left', '1000px')
                              .style('top', '500px')
                              .style('z-index', 2)
                    })
                    .on('mouseout', function(d) { 
                        tooltip.transition().style('display', 'none')
                    })


      //Append x axis to svg
      svg.append('g')
          .attr('transform', 'translate(0,' + (chartPadding) + ')')
          .call(xAxis);

      // Append y axis to svg
      svg.append('g')
          .attr('transform', 'translate(' + chartPadding + ',15)')
          .call(yAxis);

  }
  else {
    // Handle error if xhr request fails
    console.log('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send();