
$(document).ready(function() {
	
	function setWeather(returned) {
						var dateTime= new Date((JSON.stringify(returned.dt))*1000);
						var getDay = dateTime.getDay();
						var dayArr= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
						var day = dayArr[getDay];
						$('.city').append(JSON.stringify(returned.name).replace(/\"/g, ''));
						$('.day').append(day);
						$('.temp').prepend(JSON.stringify(returned.main.temp))
					}

		//Get user location
		$.ajax({
			type: 'POST',
			url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAjDWh1DIiSZ74CUj9NHL_WeSP9_0Cw5lM',
       	 	dataType: 'JSON',
       	 	contentType: 'application/x-www-form-urlencoded',
      	 	success: function(data) {	
      	 		//Store latitude and longitude
      	 		var lat= data.location.lat;
      	 		var lng= data.location.lng;

      	 		//Get weather for given lat and lng
      	 		$.ajax({
					type: 'GET',
					url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&units=imperial&APPID=7c1cc301e8f332de9eb04c2e68e109d6',
					dataType: 'JSON',
					contentType: 'application/x-www-form-urlencoded',
					success: setWeather
				})
        	}
		})

	

	
});
//weather key 7c1cc301e8f332de9eb04c2e68e109d6

