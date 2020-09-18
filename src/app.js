const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Hey! Help Page',
        title: 'Help',
        name: 'Andrew'
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error: 'No address found'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData 
            })
        })
    })
    
    console.log(req.query.address)
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'No search query found'
        })
    }
    
    console.log(req.query.search)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Andrew'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Andrew'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//app.get('', (req,res) => {
//    res.send("<h1>Hello express</h1>")
//})

//app.get('/help', (req,res) => {
////    res.send({
////        name: 'Andrew',
////        age: 27
////    })
//    res.send([{
//        name: 'Andrew'
//    }, {
//        name: 'Sarah'
//    }])
//})
//
//app.get('/about', (req,res) => {
//    res.send("<h1>About Page</h1>")
//})

