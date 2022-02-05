

var cityInputEl = document.querySelector("#cityInput");
var cityFormEl = document.querySelector("#cityForm");
var todaySummary = document.querySelector("#today-summary");
var todayTemp = document.querySelector("#today-temp");
var todayWind = document.querySelector("#today-wind");
var todayHumidity = document.querySelector("#today-humidity");
var todayUV = document.querySelector("#today-uv");
var todaysDateEl = document.querySelector("#todays-date");
var icon = document.querySelector("#icon");
var btnContainer = document.querySelector("#btn-div");
let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
var clearBtn = document.querySelector("#clear-btn");
var cardContainer = document.querySelector("#card-container");
console.log(history)


var today = moment();
todaysDateEl.textContent = (today.format("dddd, MMMM Do YYYY"));


function getWeather(cityName) {
  cardContainer.innerHTML = "";
  var APIkey = "e69abf49c665e7d51ec1a125be4d461d";
  console.log(cityName);


  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;

  fetch(requestUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);

          var lat = data.coord.lat;
          var lon = data.coord.lon;
          console.log(lat);
          console.log(lon);


          todaysDateEl.textContent = today.format("dddd, MMMM Do YYYY") + " in " + data.name;
          todaySummary.textContent = "Summary: Currently, " + data.name + " is experiencing " + data.weather[0].description + ".";
          todayTemp.textContent = "Temperature: " + Math.floor((data.main.temp - 273.15) * 1.8 + 32) + "°F";
          var icon1 = data.weather[0].icon;
          icon.innerHTML = `<img src="./img/${icon1}.png" style= 'height:10rem'/>`;
          todayWind.textContent = "Wind: " + Math.floor(data.wind.speed * 2.237) + "mph";
          todayHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';



          var uvAPI = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&appid=" + APIkey + "&cnt=1";

          fetch(uvAPI)
            .then(function (response) {
              if (response.ok) {
                response.json().then(function (data) {
                  console.log(data);

                  

                  todayUV.textContent = "UV Index: " + data.daily[0].uvi;
                  if (data.daily[1].uvi < 2) {
                    todayUV.classList.add("bg-success");
                  } else if (data.daily[0].uvi >= 3 && data.current.uvi < 7) {
                    todayUV.classList.add("bg-warning");
                  } else if (data.daily[0].uvi >= 8) {
                    todayUV.classList.add("bg-danger");
                  }


                  for (let index = 0; index < 5; index++) {


                    var cardEl = document.createElement('div');
                    cardEl.className = "col bg-primary text-white rounded mx-2 mb-3 pb-2";
                    cardContainer.append(cardEl);

                    var cardDate = document.createElement('h5');
                    cardDate.className = "mt-3 mb-0";
                    let tomorrow = moment().add([index], 'days');
                    cardDate.textContent = (tomorrow.format("L"));

                    var cardIcon = document.createElement('div');
                    cardIcon.classList.add("m-2")
                    var forecastIcon = data.daily[index].weather[0].icon;
                    cardIcon.innerHTML = `<img src="./img/${forecastIcon}.png" style= 'height:4rem'/>`;

                    var cardTemp = document.createElement('p');
                    cardTemp.classList.add("card-text");
                    cardTemp.textContent = "Temp: " + Math.floor((data.daily[index].temp.day - 273.15) * 1.8 + 32) + "°F";

                    var cardWind = document.createElement('p');
                    cardWind.classList.add("card-text");
                    cardWind.textContent = "Wind: " + Math.floor(data.daily[index].wind_speed * 2.237) + "mph";

                    var cardHumidity = document.createElement('p');
                    cardHumidity.classList.add("card-text");
                    cardHumidity.textContent = "Wind: " + data.daily[index].humidity + "%";

                    cardEl.append(cardDate, cardIcon, cardTemp, cardWind, cardHumidity);
                  }

                })
              }
            })
        })
      }



    });
  }

  var historyButtons = document.getElementsByClassName('hist-btn');
  var numButtons = historyButtons.length;
  console.log(numButtons);


  function renderSearchHistBtns() {
    btnContainer.innerHTML = "";
    for (let i = 0; i < history.length; i++) {
      const historyBtn = document.createElement("button");
      historyBtn.setAttribute("type", history[i]);
      historyBtn.setAttribute("readonly", true);
      historyBtn.setAttribute("class", "btn text-white btn-primary");
      historyBtn.textContent = history[i];
      historyBtn.setAttribute("value", history[i]);
      historyBtn.addEventListener("click", function () {
        todayUV.classList.remove("bg-success");
        todayUV.classList.remove("bg-danger");
        todayUV.classList.remove("bg-warning");
      })
      btnContainer.append(historyBtn);
    }
  }



  renderSearchHistBtns();
  if (history.length > 0) {
    getWeather(history[history.length - 1]);
  }

  clearBtn.addEventListener("click", function () {
    localStorage.removeItem("searchHistory");

    history = [];
    console.log(history);
    renderSearchHistBtns();
  })



  function handleForm(event) { event.preventDefault(); };

  cityFormEl.addEventListener("submit", cityFunction);


  function cityFunction(event) {
    event.preventDefault();
    console.log("Hey")
    var searchCity = cityInputEl.value.trim();
    getWeather(searchCity);
    history.push(searchCity);
    localStorage.setItem("searchHistory", JSON.stringify(history));
    renderSearchHistBtns();
  }
