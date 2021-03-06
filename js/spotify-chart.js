var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
};

$(document).ready(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  var songs = tracks;
  return songs;
}

function extractPopularity(tracks) {
  return $.map(tracks,function(track, index) { return track.popularity; })
}

function extractNames(tracks) {
  return $.map(tracks,function(track, index) { return track.name; });
}

function chartData(labels, inputData) {
  dataSetProperties["data"] = inputData; 
  var newData = {
    labels: labels,
    datasets: [ dataSetProperties ]
  };
  return newData;
  
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    method: "GET",
    dataType: "JSON",
    success: function(response) {
      callback(response);
    }
  });
}

function success(parsedJSON) {
  var songs = extractTop10Tracks(parsedJSON);
  var names = extractNames(songs.tracks);
  var popularity = extractPopularity(songs.tracks);
  var data = chartData(names, popularity);
  var ctx = $("#spotify-chart").get(0).getContext("2d");
  var myNewChart = new Chart(ctx);
  new Chart(ctx).Bar(data);

  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
