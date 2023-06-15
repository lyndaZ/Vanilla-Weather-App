function formatDate(timestamp){
 let date = new Date(timestamp);
 let hours = date.getHours();
 if (hours<10){
    hours = `0${hours}`;
 }
 let minutes= date.getMinutes();
 if (minutes<10){
    minutes = `0${minutes}`;
 }
 let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
 let day = days[date.getDay()];

 return`${day} ${hours}:${minutes}`;
}


function formatDay(timestamp){

    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

    return days[day];
}

function displayForecast(response) {

  let forecast =response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {

    if (index < 6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates){
    console.log(coordinates);
    
    let apiKey = "07a2b706ed187d0dc63c8d4b280d8b2c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response){

    console.log(response.data);

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    let cityElement= document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement=document.querySelector("#speed");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML= formatDate(response.data.dt*1000);
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    celsiusTemperature= response.data.main.temp;

    getForecast(response.data.coord);

}


function search(city){
let apiKey = "07a2b706ed187d0dc63c8d4b280d8b2c";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=07a2b706ed187d0dc63c8d4b280d8b2c&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    //remove active class from celcius link
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature*9)/5 + 32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event){
    event.preventDefault();
    //add active class to fahrenheit link 
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round(celsiusTemperature);
}


let celsiusTemperature =null;

let form =document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelciusTemperature);


search("New York");
