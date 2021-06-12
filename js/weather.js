const weather = document.querySelector(".js-weather");
const API_KEY ="f50e53fa7d4bc8587811be7b7344f6d3";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const nowWeather = json.weather[0].main
        weather.innerText = `
        Temp : ${temperature}℃
        Location : ${place}
        Today : ${nowWeather}`
    });
}

function saveCoords(coordsObj){
localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoError(){
    console.log("cant find location");
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
 loadCoords();
}

init();