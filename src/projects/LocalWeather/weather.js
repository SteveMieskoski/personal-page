$(document).ready(function () {

    getWeather();

    $.ajaxSetup({
        type: 'GET',
        success: function (data) {
            var imageSrc = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            console.log(data);
            $('.city-name').text(data.name);
            $('.image').append('<img class="current-icon" src=' + imageSrc + '>');
            $('.attach').text(data.weather[0].description);
            $('.temperature').text(data.main.temp);
        },
        cache: false
    });


    $('.C').click(function () {
        getWeather('C')
    });

    $('.F').click(function () {
        getWeather('F')
    });


    function getWeather() {
        $('.current-icon').remove();
        $('.unit-sym').remove();
        if (arguments[0] === 'C') {
            $.get('http://ip-api.com/json', function (locData) {
                $('.units').append('<span class="unit-sym">&#8451;</span>');
                console.log(locData); // todo remove debug item
                $.ajax({url: "http://api.openweathermap.org/data/2.5/weather?lat=" + locData.lat + "&lon=" + locData.lon + "&units=metric&APPID=f04beec1f47b8dbb3c205fddd2185805"});
            });
        } else if (arguments[0] === 'F') {
            $('.units').append('<span class="unit-sym">&#8457;</span>');
            $.get('http://ip-api.com/json', function (locData) {
                $.ajax({url: "http://api.openweathermap.org/data/2.5/weather?lat=" + locData.lat + "&lon=" + locData.lon + "&units=imperial&APPID=f04beec1f47b8dbb3c205fddd2185805"});
            });
        } else {
            $.get('http://ip-api.com/json', function (locData) {
                $('.units').append('<span class="unit-sym">&#8451;</span>');
                $.ajax({url: "http://api.openweathermap.org/data/2.5/weather?lat=" + locData.lat + "&lon=" + locData.lon + "&units=metric&APPID=f04beec1f47b8dbb3c205fddd2185805"});
            });
        }
    }


});


//  f04beec1f47b8dbb3c205fddd2185805

//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=1111111111
/*
 {"coord":
 {"lon":145.77,"lat":-16.92},
 "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
 "base":"cmc stations",
 "main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
 "wind":{"speed":5.1,"deg":150},
 "clouds":{"all":75},
 "rain":{"3h":3},
 "dt":1435658272,
 "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
 "id":2172797,
 "name":"Cairns",
 "cod":200}


 */

/*
 ☁	9729	2601	 	CLOUD
 ☂	9730	2602	 	UMBRELLA
 ☔	9748	2614	 	UMBRELLA WITH RAIN DROPS
 ⛅	9925	26C5	 	SUN BEHIND CLOUD
 ⛈	9928	26C8	 	THUNDER CLOUD AND RAIN
 ℃	8451	2103	 	DEGREE CELSIUS
 ℉	8457	2109	 	DEGREE FAHRENHEIT
 */


var codes = {
    200: 'thunderstorm with light rain',
    201: 'thunderstorm with rain',
    202: 'thunderstorm with heavy rain',
    210: 'light thunderstorm',
    211: 'thunderstorm',
    212: 'heavy thunderstorm',
    221: 'ragged thunderstorm',
    230: 'thunderstorm with light drizzle',
    231: 'thunderstorm with drizzle',
    232: 'thunderstorm with heavy drizzle',

    300: 'light intensity drizzle',
    301: 'drizzle',
    302: 'heavy intensity drizzle',
    310: 'light intensity drizzle rain',
    311: 'drizzle rain',
    312: 'heavy intensity drizzle rain',
    313: 'shower rain and drizzle',
    314: 'heavy shower rain and drizzle',
    321: 'shower drizzle',

    500: 'light rain',
    501: 'moderate rain',
    502: 'heavy intensity rain',
    503: 'very heavy rain',
    504: 'extreme rain',
    511: 'freezing rain',
    520: 'light intensity shower rain',
    521: 'shower rain',
    522: 'heavy intensity shower rain',
    531: 'ragged shower rain',

    600: 'light snow',
    601: 'snow',
    602: 'heavy snow',
    611: 'sleet',
    612: 'shower sleet',
    615: 'light rain and snow',
    616: 'rain and snow',
    620: 'light shower snow',
    621: 'shower snow',
    622: 'heavy shower snow',

    701: 'mist',
    711: 'smoke',
    721: 'haze',
    731: 'sand, dust whirls',
    741: 'fog',
    751: 'sand',
    761: 'dust',
    762: 'volcanic ash',
    771: 'squalls',
    781: 'tornado',

    800: 'clear sky',

    801: 'few clouds',
    802: 'scattered clouds',
    803: 'broken clouds',
    804: 'overcast clouds',

    900: 'tornado',
    901: 'tropical storm',
    902: 'hurricane',
    903: 'cold',
    904: 'hot',
    905: 'windy',
    906: 'hail',

    951: 'calm',
    952: 'light breeze',
    953: 'gentle breeze',
    954: 'moderate breeze',
    955: 'fresh breeze',
    956: 'strong breeze',
    957: 'high wind, near gale',
    958: 'gale',
    959: 'severe gale',
    960: 'storm',
    961: 'violent storm',
    962: 'hurricane'
};