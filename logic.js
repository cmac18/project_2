  // Create a map object
var myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 4
});
// Adding tile layer
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  }
).addTo(myMap);


// Store our API endpoint inside queryUrl
var queryUrl = "https://corona.lmao.ninja/jhucsse";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
// Once we get a response, send the data.features object to the createFeatures function
createFeatures(data.features);
});

const url = "https://corona.lmao.ninja/jhucsse";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
console.log(data);
});

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Building Metadata
function buildMetadata(sample) {
  var MetaData = `/metadata/${sample}`;
  d3.json(MetaData).then(function(response) {
    var panelData = d3.select("#sample-metadata");
    panelData.html("");

    var data = Object.entries(response);
    data.forEach(function(item) {
    panelData.append("div").text(item);
   });
   })}




// David's Code area for creating a plot

// Store our API endpoint inside queryUrl

// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("https://corona.lmao.ninja/jhucsse").then((incomingData) => {
  function filterUSCoronaData(Corona) {
    return Corona.country == 'US';
  }

  // Use filter() to pass the function as its argument
  var USCoronaData = incomingData.filter(filterUSCoronaData);

  //  Check to make sure your are filtering your movies.
  console.log(USCoronaData);

  // Use the map method with the arrow function to return all the filtered Corona States.
  var states = USCoronaData.map(USCoronaStates =>  USCoronaStates.province);

  // Use the map method with the arrow function to return all the filtered Corona States.
  var cities = USCoronaData.map(USCoronaCities =>  USCoronaCities.city);

  // Use the map method with the arrow function to return all the filtered Corona Deaths for each City.
  var USCityDeaths = USCoronaData.map(USCoronaCityDeaths => USCoronaCityDeaths.stats.deaths);

  // Check the filtered USCityDeaths.
  console.log(USCityDeaths);

  // Check the filtered US States.
  console.log(states);

  // Create your trace.
  var trace = {
    x: cities,
    y: USCityDeaths,
    type: "bar"
  };

  // Create the data array for our plot
  var data = [trace];

  // Define the plot layout
  var layout = {
    title: "The # of Corona Deaths per City",
    xaxis: { title: "City" },
    yaxis: { title: "Deaths"}
  };

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", data, layout);




// Pie Chart
var trace1 = {
  labels: cities,
  values: USCityDeaths,
  type: 'pie',
  textinfo: "label+percent",
  textposition: 'inside',
  insidetextorientation: 'radial'
};

var data = [trace1];

var layout = {
  title: "'Number of Corona Deaths per City",
};

Plotly.newPlot("pie", data, layout);

});



