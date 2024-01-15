import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

const apiKey = "fcbc95c7933d8c85b26c5b19efe7fb3d";
const cityName = "Magland";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

export function Meteo() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      });
  }, []);

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return require("../assets/image/Clear.png");
      case "Clouds":
        return require("../assets/image/Clouds.png");
      case "Rain":
        return require("../assets/image/Rain.png");
      case "Snow":
        return require("../assets/image/Snow.png");
      default:
        return require("../assets/image/Clear.png");
    }
  };

  //https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Magland </Text>
      {weatherData && (
        <View>
          <Text>{weatherData.weather[0].description}</Text>
          <Image
            style={styles.weatherIcon}
            source={getWeatherIcon(weatherData.weather[0].main)}
          />
          <Text>temp {weatherData.main.temp}°C</Text>
        </View>
      )}
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFFF",
    borderRadius: 20,
  },
  title: {
    textAlign: "center",
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
});
