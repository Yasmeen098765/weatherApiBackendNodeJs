const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))



app.set('view engine', 'hbs');
const viewsDirectory = path.join(__dirname, '../temp1/views')
app.set('views', viewsDirectory);


const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            // shorthand property error:error
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                country: req.query.address,
                latitude: data.latitude,
                longitude: data.longitude,
                Temperature_C: forecastData.temp_c + "°C it is ",
                weather_condition: forecastData.weather_condition,
            })
        })
    })
})


app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


