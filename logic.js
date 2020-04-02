///////////////////////////// Bar Chart and Pie Chart Section ////////////////////// 

// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("https://corona.lmao.ninja/states").then((incomingData) => {
  function filterUSCoronaData(Corona) {
    return Corona.deaths > 0;
  }

  // Use filter() to pass the function as its argument
  var USCoronaData = incomingData.filter(filterUSCoronaData);

  //  Check to make sure we are filtering.
  console.log(USCoronaData);

  // Use the map method with the arrow function to return all the filtered Corona States.
  var states = USCoronaData.map(USCoronaStates =>  USCoronaStates.state);

  // Use the map method with the arrow function to return all the filtered Corona Deaths for each State.
  var USStateDeaths = USCoronaData.map(USCoronaStateDeaths => USCoronaStateDeaths.deaths);

  // Check the filtered USS tate Deaths.
  console.log(USStateDeaths);

  // Check the filtered US States.
  console.log(states);

  // Create the traces
  var trace = {
    x: states,
    y: USStateDeaths,
    type: "bar",
    marker: {
      color: 'rgba(217, 30, 24, 1)',
      line: {
        color: 'rgba(217, 30, 24, 1)',
        width: 5
        }
      }
    };

  // Create the data array for our plot
  var data = [trace];

  // Define the plot layout
  var layout = {
    title: "Number of Corona Deaths per State",
    xaxis: { title: "" },
    yaxis: { title: "Deaths"}
  };

  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot('bar', data, layout);


  // Pie Chart
  var trace1 = {
    labels: states,
    values: USStateDeaths,
    type: 'pie',
    textinfo: "label+percent",
    textposition: 'inside',
    insidetextorientation: 'radial',
    showlegend: false,
  };

  var data = [trace1];

  var layout = {
    title: "Corona Deaths per State",
  };

  Plotly.newPlot("pie", data, layout);

  });

///////////////////////////// END OF Bar Chart and Pie Chart Section ////////////////////// 

  const url = "https://corona.lmao.ninja/jhucsse";
  var geojson;
  
  // Fetch the JSON data and console log it
  d3.json(url).then(function(data) {
  console.log("Data",data);
  
   var confirmedMarker = [];
   var deathMarker = [];
   var recoveredMarker = [];
   //set marker for confirmed
   for (var i = 0; i < data.length; i++) {
       confirmedMarker.push(
        L.circle([data[i].coordinates.latitude,data[i].coordinates.longitude], {
            stroke: false,
            fillOpacity: 0.50,
            color: "yellow",
            fillColor: "yellow",
            radius:data[i].stats.confirmed
        })
       ); 
        //set marker for deaths
        deathMarker.push(
        L.circle([data[i].coordinates.latitude,data[i].coordinates.longitude], {
            stroke: false,
            fillOpacity: 1.0,
            color: "red",
            fillColor: "red",
            radius:data[i].stats.deaths
        })
       ); 
      
        //set marker for recovered
        recoveredMarker.push(
        L.circle([data[i].coordinates.latitude,data[i].coordinates.longitude], {
             stroke: false,
             fillOpacity: 1.0,
             color: "green",
             fillColor: "green",
             radius:data[i].stats.recovered
        })
       );
    }
        
    // create base layer
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
     {
      attribution:
        'Map data &copy;<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 100,
        id: "mapbox.dark",
        accessToken: API_KEY
      }
    );
  
    // Create layer groups 
    var confirmed = L.layerGroup(confirmedMarker);
    var deaths = L.layerGroup(deathMarker);
    var recovered = L.layerGroup(recoveredMarker);
    // Create a baseMaps object to contain the streetmap
    var baseMaps = {
      "Street Map": streetmap
    };
  // Create an overlayMaps object here to contain the virus stat layers
    var overlayMaps = {
      "Confirmed": confirmed,
      "Deaths": deaths,
      "Recovered": recovered
    };
  //Modify the map
    var map = L.map("map", {
      center: [39.8283, -98.5795],
      zoom: 4,
      layers: [streetmap, confirmed, deaths, recovered]
    });
  // Create a layer control, containing our baseMaps and overlayMaps, and add them to the map
    L.control
      .layers(baseMaps, overlayMaps, {
        collapsed: false
    })
   .addTo(map);
})

