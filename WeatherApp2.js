const express = require('express');
const { write } = require('fs');
const hbs = require('hbs');
const app = express();
const port = 2000;
const path = require('path');
const requests = require('requests');

const TemplatePath = path.join(__dirname, "Templates/views");
const PartialPath = path.join(__dirname, "Templates/partials");

app.use(express.static(__dirname + "/Templates"));
app.set("view engine", "hbs");
app.set("views", TemplatePath);

hbs.registerPartials(PartialPath);

app.get("/", (req, res) => {

    var d;
    //making api connection and calling data from api
    requests(`https://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=metric&appid=3c61e5586ff2eeb04575bbaf7c13863e`)
        .on("data", (chunk) => {
            var obj = JSON.parse(chunk);
            var arrObj = [obj];
  console.log(arrObj);
            console.log(`City Name is ${arrObj[0].name} and Temperature is ${arrObj[0].main.temp }`);
        })
        .on("end", (err) => {
            if (err)
                console.log("Some Errror occured = ", err);
            res.end();
        });

        //calling file with dynamic data
    res.render("WeatherApp2.hbs", {
        data: "patiala"
    });
})
app.get("/about", (req, res) => {
    res.render("about.hbs", {
        data: "About"
    });
})
app.get("*", (req, res) => {
    res.render("404Error.hbs", {
        data: "is not available.."
    });
});




app.listen(port, () => {
    console.log("working on " + port);
})