import React, { useState } from 'react';
// import Welcome from '../assets/Welcome.png'
// import ClearSky from '../assets/ClearSky.png'
// import Rain from '../assets/Rain.png'
// import ThunderStorm from '../assets/ThunderStorm.png'
// import Snow from '../assets/Snow.png'

const api = {
    key: "e4ab7a9a1bdc079756fc521bf013c8eb",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {

    const[query, setQuery] = useState("");
    const[weather, setWeather] = useState({});

    let weatherImage;

    const search = evt => {
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setQuery("");
                console.log(weatherImage);
            });
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()]
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    
    if(typeof weather.main != "undefined"){
        if(weather.weather[0].main === "Clouds"){
            let ClearSky = <img src={require("../assets/ClearSky.png")} alt="header" />
            weatherImage = ClearSky
        }else if(weather.weather[0].main === "Thunderstorm"){
            let ThunderStorm = <img src={require("../assets/ThunderStorm.png")} alt="header" />
            weatherImage = ThunderStorm
        }else if(weather.weather[0].main === "Drizzle"){
            let Rain = <img src={require("../assets/Rain.png")} alt="header" />
            weatherImage = Rain
        }else if(weather.weather[0].main === "Rain"){
            let Rain = <img src={require("../assets/Rain.png")} alt="header" />
            weatherImage = Rain
        }else if(weather.weather[0].main === "Snow"){
            let Snow = <img src={require("../assets/Snow.png")} alt="header" />
            weatherImage = Snow
        }else{
            let Welcome = <img src={require("../assets/welcome.png")} alt="header" />
            weatherImage = Welcome
        }
    }else{
        let Welcome = <img src={require("../assets/welcome.png")} alt="header" />
            weatherImage = Welcome
    }

    

    

    return(
        <div className='weather-container'>
            <div className='information'>
                <div>
                    <input 
                        type="text" 
                        className='search-bar'
                        placeholder="Search city..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <div>
                    <div className='information-container'>
                    <p className='location'>
                    {weather.name}, {weather.sys.country}
                    </p>
                    <h1 className='degree'>
                    {Math.round(weather.main.temp)}°c
                    </h1>
                    <div className='divider'></div>
                    <p className='weather-condition'>
                    {weather.weather[0].main}
                    </p>
                    <div className='divider'></div>
                    </div>
                </div>
                ): ("")}
            <div className="condition-image">
                {weatherImage}
            </div>
            <div>
                <p>{dateBuilder(new Date())}</p>
            </div>
            </div>
        </div>
    )
}

export default Weather;