const express = require("express");
const { User, QueryLog } = require("../models/userModel");

const router = express.Router();

router.post("/api/user", async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);

    const user = new User(userData);
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ error: "Error saving user" });
  }
});

router.post("/api/weather", async (req, res) => {
  try {
    const { location, temp, humidity, weatherCondition, userId } = req.body;

    const temperatureWithSymbol = `${temp}°C`;

    const humidityWithSymbol = `${humidity}%`;

    const queryLog = new QueryLog({
      userId: userId,
      query: location,
      response: JSON.stringify({
        temp: temperatureWithSymbol,
        humidity: humidityWithSymbol,
        weatherCondition: weatherCondition,
      }),
    });

    const savedQueryLog = await queryLog.save();

    res.status(200).json(savedQueryLog);
  } catch (err) {
    console.error("Error saving query log:", err);
    res.status(500).json({ error: "Error saving query log" });
  }
});

module.exports = router;
