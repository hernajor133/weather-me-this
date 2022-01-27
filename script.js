

var cityInputEl = document.querySelector("#cityName");
var cityFormEl = document.querySelector("#city-form");
var todaysSummary = document.querySelector("#todays-summary");
var todaysTemp = document.querySelector("#todays-temp");
var todaysWind = document.querySelector("#todays-wind");
var todaysHumidity = document.querySelector("#todays-humidity");
var todaysUV = document.querySelector("#todays-UV");
var todaysDateEl = document.querySelector("#todays-date");
var icon = document.querySelector("#icon");
var btnContainer = document.querySelector("#btn-div");
let history = JSON.parse(localStorage.getItem("search-history")) || [];
var clearBtn = document.querySelector("#clear-btn");
var cardContainer = document.querySelector("card-container");
console.log(history)


var today = moment();
todaysDateEl.textContent = (today.format("dddd, MMMM Do YYYY"));


function getWeather (cityName) {
    cardContainer.innerHTML = "";
    var APIkey = "256e015175e41b85d6b79c9fecee47d5";
    console.log(cityName);


    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIkey;

    fetch(requestUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data){
                console.log(data);

                var lat = data.coord.lat;
                var lon = data.coord.lon;
                console.log(lat);
                console.log(lon);
            })
        }
    })

}