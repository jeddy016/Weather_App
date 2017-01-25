function displayWeather(info) {
  var icon= JSON.stringify(info.weather[0].icon).replace(/\"/g, '');
  temp = Math.round(JSON.stringify(info.main.temp));
  
  $('.city').append(JSON.stringify(info.name).replace(/\"/g, ''));
  $('.condition').append(JSON.stringify(info.weather[0].description).replace(/\"/g,''));
  $('.temp').prepend(temp + '\xB0 F');
    
  //Set weather icon
    switch (icon) {
      case '01d':
        $('.weather-icon').addClass('fa-sun-o');
        break;
      case '01n':
        $('.weather-icon').addClass('fa-moon-o');
        break;
      case '02d':
      case '02n':  
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        $('.weather-icon').addClass('fa-cloud');
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        $('.weather-icon').addClass('fa-tint');
        break;
      case '11d':
      case '11n':
        $('.weather-icon').addClass('fa-bolt');
        break;
      case '13d':
      case '13n':
        $('.weather-icon').addClass('fa-snowflake-o');
        break;
      case '50d':
      case '50n':
        $('.weather-icon').addClass('fa-barcode');
        break;
      default:
        $('.weather-icon').addClass('fa-thermometer-three-quarters');
     }
	}

function weather() {
    //Get Location
    $.ajax({
			type: 'POST',
			url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAjDWh1DIiSZ74CUj9NHL_WeSP9_0Cw5lM',
       	 	dataType: 'JSON',
          cache: false,
       	 	contentType: 'application/x-www-form-urlencoded',
      	 	success: function(data) {	
      	 		var lat= data.location.lat;
      	 		var lng= data.location.lng;
      	//Get Weather Info
        $.ajax({
					type: 'GET',
					url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=imperial&APPID=7c1cc301e8f332de9eb04c2e68e109d6',
					dataType: 'JSON',
          cache: false,
					contentType: 'application/x-www-form-urlencoded',
					timeout: 4000,
					success: displayWeather
			 })
      }
		})
  }

$(document).ready(function() {
	
	weather();
  

  $('.btn').click(function(){
    function setCelcius(){
        var cel = Math.round((temp - 32) * 5/9);
        return cel + "° C";
        };
      function setFahrenheit(){
         return temp + "° F";
        };
    $('.temp').toggleClass('celcius');
    $('.temp').toggleClass('fahrenheit');

    if ($('.temp').hasClass('fahrenheit')) {
      $('.temp').text(setCelcius());
       return;
     };
      $('.temp').text(setFahrenheit());
   });
  });
