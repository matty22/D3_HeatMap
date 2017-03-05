// HeatMap.js

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json');
xhr.onload = function() {
  if (xhr.status === 200) {
    var json = JSON.parse(xhr.response);
    console.log(json);

    // Instantiate variables
    var chartWidth = 800;
    var chartHeight = 500;
    

    // Append svg to page
    var svg = d3.select('#chartDiv')
                .append('svg')
                .attr('width', chartWidth)
                .attr('height', chartHeight)
                .attr('class', 'chartBackground')
  }
  else {
    // Handle error if xhr request fails
    console.log('Request failed. Returned status of ' + xhr.status);
  }
}
xhr.send();