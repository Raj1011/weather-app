const path = require("path");
const express = require("express");
const hbs = require('hbs');
var app = express();

const geocode =  require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define path for path config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req,res)=>{
    res.render('index', {
        title: "Weather",
        name: "Raj"
    });
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: "About Me",
        name: "Raj"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: "Help App",
        name: "Raj"
    })
})

app.get("/weather", (req, res)=>{
    const address = req.query.address
    if(!address){
       return res.send({
            error: "You must have provide address."
        })
    }
    geocode(address, (error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error});
        }
     
         forecast(latitude,longitude, (error,forecastData)=>{
             if(error){
                return res.send({error});
             }
             res.send({
                address: location,
                forecastData: forecastData
             });
            //  console.log(chalk.green.inverse(location));
            //  console.log(chalk.blue(forecastData));
         });
         
     });
});


app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must have to provide search term."
        })
    }
    res.send({
        products: [] 
    });
});
app.get('/help/*', (req,res)=>{
    res.render('page-not-found',{
        title: "404 Page",
        errorMessage: "Page not found.",
        name: "Raj"
    });
})
app.get('*',(req,res)=>{
    res.render('page-not-found',{
        title: "404 Page",
        errorMessage: "Help article not found.",
        name: "Raj"
    });
})


app.listen(3000, ()=>{
    console.log("app is listening at 3000.");
});