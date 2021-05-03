// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

// API KEY: 2f1a3b3ccb124c4eb8e53936210205

window.addEventListener('DOMContentLoaded', async function () {
  // Get a reference to the "get weather" button
  let submitButton = document.querySelector(`button`)

  // When the "get weather" button is clicked:
  submitButton.addEventListener(`click`, async function (event) {


    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)

    // - Get the user-entered location from the element's value
    let location = locationInput.value

    // - Check to see if the user entered anything; if so:
    let daysInput = document.querySelector(`#days`)
    let days = daysInput.value

    // - Check to see if the user entered anything; if so:
    if (location.length > 0) {

      //clear out the page if there's anything remaining from previous searches
      document.querySelector(`.forecast`).innerHTML = ``
      document.querySelector(`.current`).innerHTML = ``

      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=2f1a3b3ccb124c4eb8e53936210205&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let currentWeather = json.current
      let forecastWeather = json.forecast.forecastday

      // get a reference for current weather condition reference
      let currentWeatherInput = document.querySelector(`.current`)

      // display the current weather condition
      currentWeatherInput.insertAdjacentHTML(`beforeend`, `
    <div class="text-center space-y-2">
    <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
    <div class="font-bold">
      <img src="https:${currentWeather.condition.icon}" class="inline-block">
      <span class="temperature"\>${currentWeather.temp_f}</span>° 
      and
      <span class="conditions">${currentWeather.text}</span>
    </div>
  </div>
    `)

      // Adding an if stategment to provide a forecast only if the number of days is provided by user
      if (days.length > 0) {

        //get a reference for forecast weatehr condition
        let forecastWeatherInput = document.querySelector(`.forecast`)

        // display a number of days of teh forecast
        forecastWeatherInput.insertAdjacentHTML(`beforeend`, `
    <div class="text-center space-y-8">
    <div class="font-bold text-3xl">${days} Day Forecast</div>
    `)

        //create a for loop for teh number of days that the user has requested
        for (i = 0; i < days; i++) {

          let forecastInfo = forecastWeather[i]

          //display the forecast for teh needed days
          forecastWeatherInput.insertAdjacentHTML(`beforeend`, `
      <div>
        <img src="https:${forecastInfo.day.condition.icon}" class="mx-auto">
        <h1 class="text-center text-2xl text-bold text-gray-500">${forecastInfo.date}</h1>
        <h2 class="text-center text-xl">High ${forecastInfo.day.maxtemp_f}° – Low ${forecastInfo.day.mintemp_f}°</h2>
        <p class="text-center text-gray-500">${forecastInfo.day.condition.text}</h1>
      </div>
      `)


        }
      }
    }
  })

})
