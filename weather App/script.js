const apikey = "";
const apiUrl="";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city +  `&appid=${apikey}`);
    var data = await response.json();

    console. log(data);

   
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.around (data.main.temp) + "0c" ;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.main.wind.speed + "km/h";

}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})



