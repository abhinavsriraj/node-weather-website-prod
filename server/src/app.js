const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewspath)
hbs.registerPartials(partialspath)
app.use(cors())


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhinav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhinav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        contact: 'srirajabhinav@gmail.com',
        name: 'Abhinav'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'please provide address'
        })
    } else {
        const address = req.query.address
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    Weather_location: location,
                    forecast: forecastData,
                    Searched_address: req.query.address
                })
            })
        })
    }
})

app.get('/weatherAtCurrentLocation', (req, res) => {
   
    const latitude = req.query.latitude
    const longitude = req.query.longitude
    
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        res.send({
            forecast: forecastData,
            Searched_address: req.query.address
        })
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'provide search query'
        })
    } else {
        console.log(req.query.search)
        res.send({
            products: 'these are the products'
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errormessage: 'help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'ab',
        errormessage: '404 - not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})