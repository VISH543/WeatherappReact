import { useEffect, useState } from "react";
import './app.css';

function App() {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Ballia");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9874c795da33890b6e3ab81507512c0a`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      fetchApi();
    }, 500);

    setTypingTimeout(timeout);
  }, [search]);

  return (
    <>

      <div className="box" >
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <div className="search" style={{marginTop : "200px" , marginLeft:"500px"}}>
          <input
            type="search"
            className="input-field"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />

          {!city ? (
            <p className="errormsg"> <h2>No Data Found</h2></p>
          ) : (
            <div>
              <div className="info">
                <h2 className="location">
                  <i className="fa-solid fa-temperature-high">{search}</i>
                </h2>
                <h3 className="temperature">{city.temp} °C</h3>
                <h3 className="min-max">Min : {city.temp_min} °C   ||   Max : {city.temp_max} °C</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
