$(document).ready(function getLocation() {
    if (navigator.geolocation) {
            
        navigator.geolocation.getCurrentPosition(setApi);
    } else {
        window.alert("Geolocation is not supported by this browser.");
    }
});

// function to convert unix date and time format to 24 hr local tme
function unixToTime(unix_timestamp){
    var localTime = moment.unix(unix_timestamp);
    localTime = localTime.format("HH:mm:ss");
    return localTime;
}

function averaging(arr) {
    var sum = 0;
    arr.forEach(function(num) { sum += num });
    var averagedArr = Math.round(sum / arr.length);
    return averagedArr;
}
function weatherUnit_desc(weather_unit){

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
    var weather_widget = {

        0: "/resources/clearday.svg",
        1: "/resources/cloudy.svg",
        2: "/resources/cloudysnowing.svg",
        3: "/resources/foggy.svg",
        4: "/resources/partlycloud.svg",
        5: "/resources/raining.svg",
        6: "/resources/severesnow.svg",
        7: "/resources/thunderstome.svg"
    };
    if(weather_unit == 0){
        $("#weather-desc").html(weather_desc[0]);
        $("#img-weather-widget").attr("src", weather_widget[0]);
    }else if(weather_unit > 0 && weather_unit <= 3){
        $("#weather-desc").html(weather_desc[1]);
        $("#img-weather-widget").attr("src", weather_widget[4]);
    }else if(weather_unit <= 48 && weather_unit > 3){
        $("#weather-desc").html(weather_desc[2]);
        $("#img-weather-widget").attr("src", weather_widget[3]);
                
                
    }else if(weather_unit<= 55 && weather_unit > 50){
        $("#weather-desc").html(weather_desc[3]); 
        $("#img-weather-widget").attr("src", weather_widget[3]);                               
    }else if(weather_unit <= 57 && weather_unit > 55){
        $("#weather-desc").html(weather_desc[4]); 
        $("#img-weather-widget").attr("src", weather_widget[3]);               
    }else if(weather_unit <= 65 && weather_unit > 60){
        $("#weather-desc").html(weather_desc[5]);    
        $("#img-weather-widget").attr("src", weather_widget[5]);            
    }else if(weather_unit <= 67 && weather_unit >65){
        $("#weather-desc").html(weather_desc[6]);    
        $("#img-weather-widget").attr("src", weather_widget[5]);            
    }else if(weather_unit <= 75 && weather_unit > 70){
        $("#weather-desc").html(weather_desc[7]);       
        $("#img-weather-widget").attr("src", weather_widget[2]);         
    }else if(weather_unit == 77 && weather_unit > 75){
        $("#weather-desc").html(weather_desc[8]);            
        $("#img-weather-widget").attr("src", weather_widget[6]);    
    }else if(weather_unit <= 82 && weather_unit > 79){
        $("#weather-desc").html(weather_desc[9]);      
        $("#img-weather-widget").attr("src", weather_widget[5]);          
    }else if(weather_unit <= 86 && weather_unit > 84){
        $("#weather-desc").html(weather_desc[10]);  
        $("#img-weather-widget").attr("src", weather_widget[2]);                      
    }else if(weather_unit == 95 && weather_unit > 86){
    
        $("#weather-desc").html(weather_desc[11]);                
        $("#img-weather-widget").attr("src", weather_widget[7]);
    }else if(weather_unit <= 95 && weather_unit > 95){
        $("#weather-desc").html(weather_desc[12]);              
        $("#img-weather-widget").attr("src", weather_widget[7]);  
    };
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
        $("#min-temp").html(averaging(temp_2m_min) + " °C");
        let weather_code = weatherData.current_weather.weathercode;
        weatherUnit_desc(weather_code);
    }
    getweatherData(weatherApi_url);
    $(".searchSide-btn").click(() => {
        async function getLocationData(url){
            const response = await fetch(url);
            var loc_data = await response.json();
            console.log(loc_data);
            let searched_latitude = loc_data.data[0].latitude;
            let searched_longitude = loc_data.data[0].longitude;
            const searched_url = `https://api.open-meteo.com/v1/forecast?latitude=${searched_latitude}&longitude=${searched_longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode,cloudcover_low,cloudcover_high&current_weather=true&timeformat=unixtime&timezone=Asia%2FBangkok`;
            getweatherData(searched_url);
        };
        const input_city = $("#input-search").val();
        console.log(typeof(input_city));
        const location_api = `http://api.positionstack.com/v1/forward?access_key=3e2cfd5a7e75d33753c3f9423e1cecc8&query=${input_city}`;
        getLocationData(location_api);
        
    });
}

