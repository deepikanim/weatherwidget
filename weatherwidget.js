$(document).ready(function() { 

  getCurrent();

  getForecast();

  $('#current').click(function() {
      if($("#forecast1Detail").is(':visible'))
      {
        $('#forecast1Detail').slideToggle("fast");
      }

      if($("#forecast2Detail").is(':visible'))
      {
        $('#forecast2Detail').slideToggle("fast");
      }

      if($("#forecast3Detail").is(':visible'))
      {
        $('#forecast3Detail').slideToggle("fast");
      }

      $('#currentDetail').slideToggle("fast");
      
  });

  $('#forecast1').click(function() {
      $('#forecast1Detail').slideToggle("fast");
  });

  $('#forecast2').click(function() {
              $('#forecast2Detail').slideToggle("fast");
  });

  $('#forecast3').click(function() {
              $('#forecast3Detail').slideToggle("fast");
  });
 
  
});

function getDateAndDay(input){
 var index = input.indexOf(":") - 2;
 return input.substring(0, index);
};


function getCurrent(){
  $.ajax({
    url: "http://api.wunderground.com/api/74554a607cf75ec5/conditions/q/tx/austin.json", 
    dataType : "jsonp",
    success: function(data){

      var dateAndDay = getDateAndDay(data.current_observation.local_time_rfc822);      
      var html = '';
      html += '<h2>'+dateAndDay+'</h2>';      
      html += '<img src='+data.current_observation.icon_url+'></img>';
      html += '<ul><li>Current: '+data.current_observation.temperature_string
      html += '<p class="currently"> Climate: '+data.current_observation.weather+'</p></li></ul>';

      $("#current").html(html);

      var currentDetail = '';
      currentDetail += '<div  class="weatherbox"><h2>Detail - '+dateAndDay+'</h2>'; 
      currentDetail += '<p class="currently">Current Temperature: '+data.current_observation.temperature_string;
      currentDetail += '<p class="currently">Heat Index: '+data.current_observation.heat_index_string+'</p>';
      currentDetail += '<p class="currently">Climate: '+data.current_observation.weather+'</p>';
      currentDetail += '<p class="currently">Wind Speed: '+data.current_observation.wind_string+'</p>';
      currentDetail += '<p class="currently">Dew Point: '+data.current_observation.dewpoint_string+'</p>';
      currentDetail += '<p class="currently">Humidity: '+data.current_observation.relative_humidity+'</p></div>';

      $("#currentDetail").html(currentDetail);
    },
    error: function(error) {
        $("#weather").html('<p>'+error+'</p>');
    }
  });
}

function getForecast()
{
  $.ajax({
    url: "http://api.wunderground.com/api/74554a607cf75ec5/forecast/q/tx/austin.json", 
    dataType : "jsonp",
    success: function(data){

      var forecastArray = data.forecast.simpleforecast.forecastday;  

      for(var i=1;i<forecastArray.length;i++) {

        var dateAndDay = forecastArray[i].date.weekday+', '+forecastArray[i].date.monthname+' '+forecastArray[i].date.day;
        var html1 = '';
        html1 += '<h2>'+dateAndDay+'</h2>'; 
        html1 += '<img src='+forecastArray[i].icon_url+'></ing>';   
        html1 += '<ul><li>High: '+forecastArray[i].high.fahrenheit+', Low: '+forecastArray[i].low.fahrenheit
        html1 += '<p class="currently"> Climate: '+forecastArray[i].conditions+'</p></li></ul>';

        $("#forecast"+i).html(html1);

        var forecastDetail = '';
        forecastDetail += '<div class="weatherbox"><h2>Detail - '+dateAndDay+'</h2>'; 
        forecastDetail += '<p class="currently">High: '+forecastArray[i].high.fahrenheit+', Low: '+forecastArray[i].low.fahrenheit;
        forecastDetail += '<p class="currently">Climate: '+forecastArray[i].conditions+'</p>';
        forecastDetail += '<p class="currently">Conditions: '+forecastArray[i].fcttext+'</p>';
        forecastDetail += '<p class="currently">Avg wind speed: '+forecastArray[i].avewind.mph+' mph</p>';
        forecastDetail += '<p class="currently">Humidity: '+forecastArray[i].avehumidity+'%</p></div>';

        $("#forecast"+i+"Detail").html(forecastDetail);
      }
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}