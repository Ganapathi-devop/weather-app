$(document).ready(function getLocation() {
    if (navigator.geolocation) {
            
        navigator.geolocation.getCurrentPosition(setApi);
    } else {
        window.alert("Geolocation is not supported by this browser.");
    }
});

function unixToTime(sunrise, sunset){
    var sunriseTime = new Date(sunrise).toLocaleTimeString("en-US");
    var sunsetTime = new Date(sunset).toLocaleTimeString("en-US");
    $("#sunriseTime").html(sunriseTime);
    $("#sunsetTime").html(sunsetTime);
}

function setApi(position){
    
    const weatherApi_url = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max&current_weather=true&timeformat=unixtime&timezone=Asia%2FBangkok`;
    async function getweatherData(url){
        const response = await fetch(url);
        var data = await response.json();
        console.log(data);
        const weatherData = data;
        var sunrise = weatherData.daily.sunrise[weatherData.daily.sunrise.length -1 ];
        var sunset = weatherData.daily.sunset[weatherData.daily.sunset.length -1];
        console.log(sunset);
        unixToTime(sunrise, sunset);
    }
    getweatherData(weatherApi_url);
}

