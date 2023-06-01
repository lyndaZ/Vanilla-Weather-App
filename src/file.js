function displayTemperature(response){
    
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

    

}





let apiKey = "07a2b706ed187d0dc63c8d4b280d8b2c";
let apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&appid=07a2b706ed187d0dc63c8d4b280d8b2c&units=metric`;



axios.get(apiUrl).then(displayTemperature);