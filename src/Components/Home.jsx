import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import WeatherCard from "./WeatherCard";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const [tempInfo, setTempInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const getWeatherInfo = async () => {
        if (!searchValue.trim()) {
            setErrorMessage("Please enter a valid city name.");
            setTempInfo(null);
            return;
        }

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ebbaa900cf061f7fc1974860aab00272`;

            let res = await fetch(url);
            let data = await res.json();

            if (data.cod === 200) {
                setTempInfo(data);
                setErrorMessage("");
            } else {
                setTempInfo(null);
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.log("Error fetching weather data:", error);
            setErrorMessage("Something went wrong. Please try again later.");
            setTempInfo(null);
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);

    const handleLogout = () => {
        setCurrentUser(null);
        navigate("/");
    };

    return (
        <>
            <div>
                <div className="">
                    <nav className="navbar">
                        <div className="navbar-brand">Weather App</div>
                        <div className="navbar-info">
                            {currentUser ? (
                                <>
                                    <span className="user-info">
                                        Logged in as: <strong>{currentUser.userName}</strong>
                                    </span>
                                    <button className="logout-button" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <span>Please log in</span>
                            )}
                        </div>
                    </nav>
                </div>
                <div className="wrap">
                    <div className="search">
                        <input
                            type="search"
                            placeholder="Search..."
                            autoFocus
                            id="search"
                            className="searchTerm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />

                        <button
                            className="searchButton"
                            type="button"
                            onClick={getWeatherInfo}>
                            Search
                        </button>
                    </div>
                </div>
                {errorMessage ? (
                    <div className="notFound">{errorMessage}</div>
                ) : (
                    tempInfo && <WeatherCard tempInfo={tempInfo} />
                )}
            </div>
        </>
    );
};

export default Home;
