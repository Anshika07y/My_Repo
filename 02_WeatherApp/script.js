document.addEventListener("DOMContentLoaded" ,() => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "d86b8cebdc0145b366ebfd992ce62040";

    

    getWeatherBtn.addEventListener("click" , async()=>{
       const city = cityInput.value.trim();
       if(!city) return;
       try {
         const weatherData = await fetchWeatherData(city);
         displayWeatherData(weatherData);
       } catch (error) {
         showError();
       }


    })
    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        const response =await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE" ,response);

        if (!response.ok) {
            throw new Error("City Not Found");
        }
       const data =  await response.json();
       return data;
        
        
    }

    function displayWeatherData(data) {
        const {name , main , weather} = data
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

        //unlock the display
        weatherInfo.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        
    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove("hidden");
    }

})