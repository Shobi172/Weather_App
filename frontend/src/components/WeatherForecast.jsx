import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import instance from "../axios";

function WeatherForecast() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const API_KEY = "8f655f0074ed6a154e0bbd0db47b3d60";

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        const { temp, humidity } = response.data.main;
        const weatherCondition = response.data.weather[0].description;

        setWeatherData({ temp, humidity, weatherCondition });
        setErrorMessage("");

        instance
          .post("/api/weather", {
            location,
            temp,
            humidity,
            weatherCondition,
            userId,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("City not found");
        setWeatherData(null);
      });
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="gray.100"
    >
      <Box
        backgroundColor="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
        width="400px"
      >
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Weather Forecast
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <Button mt={4} colorScheme="blue" type="submit" width="100%">
            Get Weather
          </Button>
        </form>
        {errorMessage && (
          <Text color="red" textAlign="center">
            {errorMessage}
          </Text>
        )}
        {weatherData && (
          <Box mt={4}>
            <Heading as="h3" size="md" mb={2}>
              Weather Forecast for {location}
            </Heading>
            <Text>Temperature: {weatherData.temp}°C</Text>
            <Text>Humidity: {weatherData.humidity}%</Text>
            <Text>Weather Condition: {weatherData.weatherCondition}</Text>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default WeatherForecast;
