import { useEffect, useState } from "react";

const WeatherCard = ({ tempInfo }) => {
    const [weatherState, setWeatherState] = useState("");
    const [weatherInfo, setWeatherInfo] = useState({});
    const { temp, humidity, pressure } = tempInfo?.main;
    const { main: weatherMood } = tempInfo?.weather[0];
    const { name } = tempInfo;
    const { speed } = tempInfo.wind;
    const { country, sunset } = tempInfo?.sys;

    useEffect(() => {
        setWeatherInfo({
            temp,
            humidity,
            pressure,
            weatherMood,
            name,
            speed,
            country,
            sunset,
        })
    }, [tempInfo])


    useEffect(() => {
        if (weatherInfo.weatherMood) {
            switch (weatherInfo.weatherMood) {
                case "Clouds":
                    setWeatherState("wi-day-cloudy");
                    break;
                case "Haze":
                    setWeatherState("wi-fog");
                    break;
                case "Clear":
                    setWeatherState("wi-day-sunny");
                    break;
                case "Mist":
                    setWeatherState("wi-dust");
                    break;
                case "Rain":
                    setWeatherState("wi-rain");
                    break;

                default:
                    setWeatherState("wi-day-sunny");
                    break;
            }
        }
    }, [weatherInfo.weatherMood]);

    // converting the seconds into time
    let sec = weatherInfo.sunset;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`;
    return (
        <>
            <article className="widget">
                <div className="weatherIcon">
                    <i className={`wi ${weatherState}`}></i>
                </div>

                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{weatherInfo.temp}&deg;</span>
                    </div>

                    <div className="description">
                        <div className="weatherCondition">{weatherInfo.weatherMood}</div>
                        <div className="place">
                            {weatherInfo.name}, {weatherInfo.country}
                        </div>
                    </div>
                </div>

                <div className="date"> {new Date().toLocaleString()} </div>

                {/* our 4column section  */}
                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-sunset"}></i>
                            </p>
                            <p className="extra-info-leftSide">
                                {timeStr} PM <br />
                                Sunset
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-humidity"}></i>
                            </p>
                            <p className="extra-info-leftSide">
                                {weatherInfo.humidity} <br />
                                Humidity
                            </p>
                        </div>
                    </div>

                    <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-rain"}></i>
                            </p>
                            <p className="extra-info-leftSide">
                                {weatherInfo.pressure} <br />
                                Pressure
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-strong-wind"}></i>
                            </p>
                            <p className="extra-info-leftSide">
                                {weatherInfo.speed} <br />
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default WeatherCard;