let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temprature = document.getElementById('temprature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.getElementById('form');
let main = document.querySelector('main');

const apiKey = 'f4145a6bc3ab86c4b7a84fef32f33c70'; // your valid API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (valueSearch.value !== '') {
    searchWeather();
  }
});

const searchWeather = () => {
  const cityName = valueSearch.value.trim();
  const url = `${baseUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const countryCode = data.sys.country.toLowerCase();
        const flagImg = city.querySelector('#countryFlag');
        flagImg.src = `https://flagcdn.com/w40/${countryCode}.png`; // 40px flag from FlagCDN
        // flagImg.alt = data.sys.country;
        city.querySelector('figcaption').innerText = data.name;
        temprature.querySelector('figcaption span').innerText = Math.round(data.main.temp);
        description.innerText = data.weather[0].description;
        clouds.innerText = data.clouds.all + '%';
        humidity.innerText = data.main.humidity + '%';
        pressure.innerText = data.main.pressure + ' hPa';
        temprature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        main.classList.remove('error');
      } else {
        main.classList.add('error');
        setTimeout(() => {
          main.classList.remove('error');
        }, 1000);
      }
      valueSearch.value = '';
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      main.classList.add('error');
      setTimeout(() => {
        main.classList.remove('error');
      }, 1000);
    });
};
