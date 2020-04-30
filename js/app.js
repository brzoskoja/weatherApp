import { getCoordinatesForCity, getMyCoordinates, getWeatherForCoordinates, updateWeather, citiesArray } from "./apiHandling.js"
export {changeWeather}
const addCityButton = document.getElementById("add-city");
const deleteButton = document.querySelector(".btn--close");
const firstWeatherModule = document.getElementsByClassName("module__weather")[0];
const searchBar = document.getElementById("search");
const body = document.querySelector("body");

initAll();
getMyCoordinates()
    .then((myCoordinates) => getWeatherForCoordinates(myCoordinates))
    .then((weather) => updateWeather(firstWeatherModule, weather))
    .catch((error) => console.log(error));

function initAll() {
    //
    addCityButton.addEventListener("click", () => {
        let search = document.getElementsByClassName("module__form")[0]
            .toggleAttribute("hidden");
    });
    document.getElementById("search-close").addEventListener("click", () => {
        let search = document.getElementsByClassName("module__form")[0]
            .toggleAttribute("hidden");
    });
    searchBar.addEventListener("keyup", function () {
        proposeCity(this.value);
    })
    document.getElementById("newWeather").addEventListener("click", (event) => {
        event.preventDefault()
        newWeather(searchBar.value);
        searchBar.value = "";
    });
}

function proposeCity(typed) {
    let matches = citiesArray.filter((element) => {
        return element.toLowerCase().indexOf(typed.toLowerCase()) !== -1;
    });
    let suggestions = document.querySelector(".suggestions")
    suggestions.innerHTML = "";
    matches.forEach((element) => {
        let node = document.createElement("LI");
        node.innerText = element;
        suggestions.appendChild(node);
        node.addEventListener("click", function () {
            searchBar.value = this.innerText;
            suggestions.innerHTML = "";
        })
    });
}

function newWeather(city) {
    body.classList.toggle("loading");
    getCoordinatesForCity(city)
    .then((myCoordinates) => getWeatherForCoordinates(myCoordinates))
    .then((weather) => {
        let newWeatherModule = firstWeatherModule.cloneNode(true);
        document.getElementById("app").appendChild(newWeatherModule);
        return updateWeather(newWeatherModule, weather);
    })
    .catch((error) => console.log(error))
    .then(body.classList.toggle("loading"));
}

function changeWeather(city, weatherModule) {
    body.classList.toggle("loading");
    getCoordinatesForCity(city)
    .then((myCoordinates) => getWeatherForCoordinates(myCoordinates))
    .then((weather) => {    
        return updateWeather(weatherModule, weather);
    })
    .catch((error) => console.log(error))
    .then(body.classList.toggle("loading"));
}