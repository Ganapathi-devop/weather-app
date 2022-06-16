$(document).ready(function getLocation() {
    if (navigator.geolocation) {
            
        navigator.geolocation.getCurrentPosition(setApi);
    } else {
        window.alert("Geolocation is not supported by this browser.");
    }
});

function unixToTime(unix_timestamp){
    var localTime = moment.unix(unix_timestamp);
    localTime = localTime.format("HH:mm:ss");
    return localTime;
}

function averaging(arr) {
    var sum = 0;
    arr.forEach(function(num) { sum += num });
    var averagedArr = Math.round(sum / arr.length);
    console.log(averagedArr);
    return averagedArr;
}
function weatherUnit_desc(weather_unit){
    console.log(weather_unit + "temperature")

    // describe the weather condition like clear sky
    var weather_desc = [
        'Clear sky', 'Mainly clear, partly cloudy, and overcast',
        'Fog and depositing rime fog', 'Drizzle: Light, moderate, and dense intensity',
        'Freezing Drizzle: Light and dense intensity',
        'Rain: Slight, moderate and heavy intensity',
        'Freezing Rain: Light and heavy intensity',
        'Snow fall: Slight, moderate, and heavy intensity',
        'Snow grains',
        'Rain showers: Slight, moderate, and violent',
        'Snow showers slight and heavy',
        'Thunderstorm: Slight or moderate',
        'hunderstorm with slight and heavy hail'
    ];
    // img file that store corresponding weather widget for weather desce
    var weather_widget;
    console.log(weather_desc[3]);
    switch(weather_unit){
        case weather_unit = 0:
            $("#weather-desc").html(weather_desc[0]);
        weather_widget
        break;
        case weather_unit <= 3:
            $("#weather-desc").html(weather_desc[1]);
            weather_widget
            break;
        case weather_unit > 3:
            if(weather_unit <= 48 && weather_unit > 3){
                $("#weather-desc").html(weather_desc[2]);
                break;
            }else if(weather_unit<= 55 && weather_unit > 50){
                $("#weather-desc").html(weather_desc[3]);
                break;
            }else if(weather_unit <= 57 && weather_unit > 55){
                $("#weather-desc").html(weather_desc[4]);
                break;
            }else if(weather_unit <= 65 && weather_unit > 60){
                $("#weather-desc").html(weather_desc[5]);
                break;
            }else if(weather_unit <= 67 && weather_unit >65){
                $("#weather-desc").html(weather_desc[6]);
                break;
            }else if(weather_unit <= 75 && weather_unit > 70){
                $("#weather-desc").html(weather_desc[7]);
                break;
            }else if(weather_unit == 77 && weather_unit > 75){
                $("#weather-desc").html(weather_desc[8]);
                break;
            }else if(weather_unit <= 82 && weather_unit > 79){
                $("#weather-desc").html(weather_desc[9]);
                break;
            }else if(weather_unit <= 86 && weather_unit > 84){
                $("#weather-desc").html(weather_desc[10]);
                break;
            }else if(weather_unit == 95 && weather_unit > 86){
                $("#weather-desc").html(weather_desc[11]);
                break;
            }else if(weather_unit <= 95 && weather_unit > 95){
                $("#weather-desc").html(weather_desc[12]);
                break;
            };
        break;
      }    
}

function setApi(position){
    
    const weatherApi_url = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max,windgusts_10m_max&current_weather=true&timeformat=unixtime&timezone=Asia%2FBangkok`;
    async function getweatherData(url){
        const response = await fetch(url);
        var data = await response.json();
        console.log(data);
        const weatherData = data;
        var sunrise = weatherData.daily.sunrise[weatherData.daily.sunrise.length -1 ];
        $("#sunriseTime").html(unixToTime(sunrise));
        let sunset = weatherData.daily.sunset[weatherData.daily.sunset.length -1];
        $("#sunsetTime").html(unixToTime(sunset));
        let temp_2m_max = weatherData.daily.temperature_2m_max;
        $("#max-temp").html(averaging(temp_2m_max) + " °C");
        let temp_2m_min = weatherData.daily.temperature_2m_min;
        console.log(temp_2m_min + "hello")
        $("#min-temp").html(averaging(temp_2m_min) + " °C")
    }
    getweatherData(weatherApi_url);
}

