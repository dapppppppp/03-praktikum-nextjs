import React, { useState, useEffect } from "react";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return; 

    const fetchWeather = async () => {
      try {
        const response = await fetch(`/api/weather?city=${city}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data cuaca. Periksa nama kota!");
        }
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div>
      <h1>Data Cuaca</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Masukkan Kota"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && weather.main ? (
        <div>
          <p>Kota: {weather.name}</p>
          <p>Suhu: {weather.main?.temp}°C</p>
          <p>Cuaca: {weather.weather?.[0]?.description}</p>
        </div>
      ) : (
        city && !error && <p>Loading...</p>
      )}
    </div>
  );
}