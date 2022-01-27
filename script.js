

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