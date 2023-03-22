const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoCode = require('./utils/getGeoCode')
const getForecast = require('./utils/getForecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set up static
app.use(express.static(publicDirectoryPath))

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.get('', (req,res)=>{

    res.render('index',{
        title:'Weather',
        author:'Yiknok',
        message:'Get forecast from your location'
    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About',
        author:'Yiknok',
        message:'Created by Daniil Pavlenko as small pet-project while learning Express possibilities'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        author:'Yiknok',
        message:'Just input your location in form on Home page and get back forecast for your location'
    })
})
//app.com/weather
app.get('/weather', (req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"Error!!! Address not provided!"
        })
    }

    getGeoCode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(!req.query.address){
          return res.send({
            error:'Please provide an adress like query string'
          })
        }
        if(error){
          return res.send({error})
        }
      
        getForecast(latitude,longitude, (error, {temperature,feelsLike} = {}) => {
          if(error){
            return res.send({error})
          }
          res.send({
            location,
            message:`it's ${temperature}, but it feels like ${feelsLike}`
          })
          })
      })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title:'Error 404',
        author:'Yiknok',
        message:'Help article not found'

    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title:'Error 404',
        author:'Yiknok',
        message:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('server start!')
})