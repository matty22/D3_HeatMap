// HeatMap.js

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json');
xhr.onload = function() {
  if (xhr.status === 200) {
    var dataset = JSON.parse(xhr.response);
    console.log(dataset);

    // Instantiate variables
    var chartWidth = 789;
    var chartHeight = 420;
    

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
       .attr('x', function(d, i) { return (d.year - 1753) * 3})
       .attr('y', function(d) { return d.month * 35 - 35; })
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
           return '#ffff65';
         } else if (d.variance > 1.0 && d.variance < 3.0) {
           // Temps between 1 and 3 degrees above average are colored pale orange
           return '#ffac14';
         } else if (d.variance > 3.0) {
           // Temps above 3 degrees above normal are colored dark orange
           return '#c78000';
         }
        })
       .attr('class', 'box')
       .append('title')
       .text(function(d) { return d.month + " " + d.year });

  }
  else {
    // Handle error if xhr request fails
    console.log('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send();