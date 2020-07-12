//Import the core and npm modules
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Create an app using express
const app = express()

//Create the path directories for the static files and views
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Set up the handler and views
app.set('views', viewsPath)
app.set('view engine', 'hbs')

hbs.registerPartials(partialsPath)
//Use the static files.
app.use(express.static(publicDir))

app.get('', (req,res) => {
  res.render('index', {
    title : 'Weather App',
    name : 'Mangalam Krishnan'
  })
})
app.get('/about',(req,res) => {
  res.render('about', {
    title : 'About Myself',
    name : 'Mangalam Krishnan'
  })
})
app.get('/help',(req,res) => {
  res.render('help', {
    title : 'Help',
    msg : 'Contact us to help you with any issues',
    name : 'Mangalam Krishnan'
  })
})
app.get('/help/*',(req,res) => {
  res.render('404', {
    title : '404',
    name : 'Mangalam Krishnan',
    errorMessage : 'Help article not found'
  })
})
app.get('/weather',(req,res)=> {
  if(!req.query.address) {
    return res.send({
      error : 'You must provide an address to search'
    })
  }
  geocode(req.query.address, (error,{lattitude,longitude,place_name:location}={}) => {
    if(error) {
     return res.send({error})
    }
    forecast(longitude,lattitude,(error,forecastData) => {
      if(error) {
        return res.send({error})
      }
      res.send({
        forecast : forecastData,
        location,
        address : req.query.address
      })
    })
  })

})
app.get('*',(req,res) => {
  res.render('404',{
    title : '404',
    name : 'Mangalam Krishnan',
    errorMessage : 'Page Not found'
  })
})
app.listen(3000,() => {
  console.log('server started')
})