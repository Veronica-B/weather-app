const request = require('request');
const express = require('express');
const app = express();
require('dotenv').config()
const bodyParser = require('body-parser');
let apiKey = process.env.APIKEY;
// let city = 'Rome';
// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index')
})
app.post('/', (req, res) => {
    let city = req.body.city;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
request(url, function(err, response, body){
    if(err){
        res.render('index', {weather : null, error : 'Error, please try again'})
    }
    else{
        let weather = JSON.parse(body)
        if(weather.main == undefined) {
            res.render('index', {weather : null, error : 'Error, please try again'})
        } else{
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`
            res.render('index', {weather: weatherText, error:null})
        }
    }
})
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`This server is running on ${port}`)
})