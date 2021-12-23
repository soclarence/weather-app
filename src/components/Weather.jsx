import React, { useState } from 'react';
import Welcome from '../assets/Welcome.png'
// import ClearSky from '../assets/ClearSky.png'
// import FewClouds from '../assets/FewClouds.png'
// import Mist from '../assets/Mist.png'

const api = {
    key: "e4ab7a9a1bdc079756fc521bf013c8eb",
    base: "https://api.openweathermap.org/data/2.5/"
}

function Weather() {

    const[query, setQuery] = useState("");
    const[weather, setWeather] = useState({});

    const search = evt => {
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result)
                setQuery("");
                console.log(result);
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

    

    

    return(
        <div>
            <main>
                <div>
                    <input 
                        type="text" 
                        className='search-bar'
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (
                <div>
                <div>
                    <div>{weather.name}, {weather.sys.country}</div>
                    <div> {dateBuilder(new Date())} </div>
                </div>
                <div>
                    <div>
                        {Math.round(weather.main.temp)}°c
                    </div>
                    <div>
                        {weather.weather[0].main}
                    </div>
                </div>
                </div>
                ): ("")}
            </main>
            <div className="condition">
                <img className='image'
                src={ Welcome }
                alt="Weather condition" />
            </div>
        </div>
    )
}

export default Weather;