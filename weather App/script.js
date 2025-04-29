const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');
const errorDiv = document.getElementById('error');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();

  if (city === "") {
    showError('Please enter a city name.');
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const url = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      showWeather(data);
    })
    .catch(error => {
      showError(error.message);
    });
}

function showWeather(data) {
  errorDiv.classList.add('hidden');
  weatherInfo.classList.remove('hidden');

  cityName.textContent = ${data.name}, ${data.sys.country};
  temperature.textContent = Temperature: ${data.main.temp}°C;
  condition.textContent = Condition: ${data.weather[0].description};
  humidity.textContent = Humidity: ${data.main.humidity}%;
}

function showError(message) {
  weatherInfo.classList.add('hidden');
  errorDiv.classList.remove('hidden');
  errorDiv.textContent = message;
}


