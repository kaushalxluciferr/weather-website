const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherbox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", () => {
    const apikey = "51c1238969a1d3fe2ea2eb7ee9aca9e2";
    const city = document.querySelector(".search-box input").value;
    if (city === "") {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "clear.avif";
                    break;
                case "Rain":
                    image.src = "3.avif";
                    break;
                case "Snow":
                    image.src = "snow.webp";
                    break;
                case "Clouds": 
                    image.src = "cloud.avif";
                    break;
                case "Mist":
                    image.src = "mist.png";
                    break;
                case "Haze":
                    image.src = "haze.jpeg";
                    break;
                default:
                    image.src = "cloud.avif";
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°c</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed}Km/h`;

            weatherbox.style.display = "";
            weatherDetails.style.display = "";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('City not found');
        });
});
