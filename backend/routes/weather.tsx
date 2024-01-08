import express, {Request, Response} from 'express';
import fetch from 'node-fetch';
import City from '..'
var router = express.Router();

const City = require('../models/cities');

const OWM_API_KEY = '153be68d1a9792c59bf97e9aab6212d6';

router.post('/', (req: Request, res: Response) => {
	// Check if the city has not already been added
	City.findOne({ cityName: { $regex: new RegExp(req.body.cityName, 'i') } }).then(dbData => {
		if (dbData === null) {
			// Request OpenWeatherMap API for weather data
			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&appid=${OWM_API_KEY}&units=metric`)
				.then(response => response.json())
				.then(apiData => {
					// Creates new document with weather data
					const newCity = new City({
						cityName: req.body.cityName,
						main: apiData.weather[0].main,
						description: apiData.weather[0].description,
						tempMin: apiData.main.temp_min,
						tempMax: apiData.main.temp_max,
					});

					// Finally save in database
					newCity.save().then(newDoc => {
						res.json({ result: true, weather: newDoc });
					});
				});
		} else {
			// City already exists in database
			res.json({ result: false, error: 'City already saved' });
		}
	});
});

router.get('/', (req, res) => {
	City.find().then(data => {
		res.json({ weather: data });
	});
});

router.get("/:cityName", (req: Request, res) => {
  City.findOne({
    cityName: { $regex: new RegExp(req.params.cityName, "i") },
  }).then(data => {
    if (data) {
      res.json({ result: true, weather: data });
    } else {
      res.json({ result: false, error: "City not found" });
    }
  });
});

export default router

// 1.terminer la convertion jsx ave tsx 
// 2.tester dans thunderRequest le bon fonctionnement
// 3.vérifier les intitulé du temps pour les images requises