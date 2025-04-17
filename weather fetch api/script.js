document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const cityName = data.name;

            document.getElementById('weatherResult').innerHTML = 
                <h2>Weather in ${cityName}</h2>
                <p>${weatherDescription}</p>
                <p>Temperature: ${temperature} °C</p>
            ;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = <p>${error.message}</p>;
        });
});