import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Weather() {
  const [hide, setHide] = useState(false)
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({});
  const API_KEY = "0d815dba51f535ff2242dcc139b1f1ff"

  const GetWeather = (StateName) => {
    if (!StateName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + StateName + "&appid=" + API_KEY
    axios.get(apiURL).then((res) => {
      console.log("surce", res.data)
      setData(res.data)
    }).catch((error) => {
      alert("error", error.message)
    })

  }
  useEffect(() => {
    GetWeather("Delhi");
  }, []);
  // Search City for 
  const handleSearch = (e) => {
    e.preventDefault();
    GetWeather(inputCity);
  }

  // handle change function 
  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
    if (e.target.value.trim() === "") {
      setHide(false);
    } else {
      setHide(true);
    }
  };


  return (
    <div className="background">

      <div className="col-md-12">
        <div className="wetherBg">
          <h1 className="heading">Live_Weather</h1>
          <div className="d-grid gap-3 col-4 mt4">
            <form onSubmit={handleSearch}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Any City Name"
                  name="inputCity"
                  value={inputCity}
                  onChange={handleChangeInput}
                  style={{ marginRight: "10px" }}
                />
                {hide ? (
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                ) : null}
              </div>
            </form>

          </div>
        </div>
        <div className="col-md-12 text-center mt-5 ">

          <div className="shadow rounded wetherResultBox">
            <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

            <h5 className="weathorCity">
              {data.name}
            </h5><br />
            {/* <p>Max-Tem   {data.main.temp_max}</p>
          <p>Min-Tem   {data.main.temp_min}</p> */}
            <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>

      </div>
    </div>
  )
}
export default Weather