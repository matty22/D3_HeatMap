// HeatMap.js

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json');
xhr.onload = function() {
  if (xhr.status === 200) {
    var dataset = JSON.parse(xhr.response);
    console.log(dataset);

    // Instantiate variables
    var chartWidth = 900;
    var chartHeight = 500;
    

    // Append svg to page
    var svg = d3.select('#chartDiv')
                .append('svg')
                .attr('width', chartWidth)
                .attr('height', chartHeight)
                .attr('class', 'chartBackground')

    // Append rects to svg
    svg.selectAll('rect')
       .data(dataset.monthlyVariance)
       .enter()
       .append('rect')
       .attr('x', function(d, i) { return d.year - 1753 + 5 ; })
       .attr('y', function(d) { return d.month * 30 - 30; })
       .attr('width', '4px')
       .attr('height', '30px')
       .attr('fill', 'black')
       .attr('stroke', 'black')
       .append('title')
       .text(function(d) { return d.month + " " + d.year });

  }
  else {
    // Handle error if xhr request fails
    console.log('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send();