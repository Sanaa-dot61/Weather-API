const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const input = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");

function searchWeather()  {
    const APIKey = "1de8876972bd1a69dc3332b45c1c5bd3";      // Key of open weather map
    const city = document.querySelector(".search-box input").value;
    if (city == "") return;
    
    fetch (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    ).then((response) => response.json()).then((json) => {
        if(json.cod =="404") {                              // if unfound city
            container.style.height = "400px";
            weatherBox.classList.remove("active");
            weatherDetails.classList.remove("active");
            error.classList.add("active");
            return;
        }
        else {                                              // if found
            container.style.height = "550px";
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");
            error.classList.remove("active");
        }
        // update the data
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const weatherIcon = document.querySelector('.weather-box i');
        // update the icon of cloud
        switch (weatherIcon) {
            case 'clear':
                weatherIcon.className = 'bx bxs-sun';
                break;
            case 'clouds':
                weatherIcon.className = 'bx bxs-cloud';
                break;
            case 'rain':
                weatherIcon.className = 'bx bxs-cloud-rain';
                break;
            case 'snow':
                weatherIcon.className = 'bx bxs-snowflake';
                break;
            case 'thunderstorm':
                weatherIcon.className = 'bx bxs-cloud-lightning';
                break;
            case 'drizzle':
                weatherIcon.className = 'bx bxs-cloud-drizzle';
                break;
            case 'mist':
            case 'haze':
            case 'fog':
                weatherIcon.className = 'bx bxs-fog';
                break;
            default:
                weatherIcon.className = 'bx bxs-cloud';
                break;
        }
        // update the text
        temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;
    });
};
search.addEventListener("click", searchWeather);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWeather();
    }
});