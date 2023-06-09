let data;

const getWeather = async () => {
  let city = document.querySelector("input").value;

  if (!city) return;

  let url1 = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${apiKey}&q=${city}`;
  let url2 = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${apiKey}&q=${city}`;

  let {
    name,
    dt,
    main: { temp, humidity },
    weather: [{ icon }],
    wind: { speed },
  } = await (await fetch(url1)).json();

  current.innerHTML = `
        <h1>${name} (${new Date(
    dt * 1000
  ).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png"></h1>
        <h3>Temp: ${temp}°F</h3>
        <h3>Wind Speed: ${speed} MPH</h3>
        <h3>Humidity: ${humidity} %</h3>
    `;

  let { list } = await (await fetch(url2)).json();
  data = list;

  for (let i = 4; i < list.length; i = i + 8) {
    let {
      dt,
      main: { temp, humidity },
      weather: [{ icon }],
      wind: { speed },
    } = list[i];

    forecast.innerHTML += `
    <div class="card">
        <h3> (${new Date(dt * 1000).toDateString()}) </h3>
            <img src="https://openweathermap.org/img/w/${icon}.png">
        <h5>Temp: ${temp}°F</h5>
        <h5>Wind Speed: ${speed} MPH</h5>
        <h5>Humidity: ${humidity} %</h5>
    </div>
  `;
  }
};

getWeather();
