const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("css"));
app.use(express.static("public"));

const request = require('request');

//routes
app.get("/", async function(req, res){
    
 let parsedData = await getImages();
 
 console.dir("parsedData: " + parsedData); //displays content of the object
    
 res.render("index", {"images":parsedData});

            
}); //root route


app.get("/results", async function(req, res){
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    
    let orie = req.query.orientation;
    
    let parsedData = await getImages();

    res.render("results", {"images":parsedData});
    
});//results route


//Returns all data from the Pixabay API as JSON format
function getImagess(keyword, orientation){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=' + keyword
        + '&orientation=' + orientation,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}


function getImages(){
    
    
    return new Promise( function(resolve, reject){
        request('https://api.nasa.gov/planetary/earth/assets?lon=100.75&lat=1.5&date=2020-04-01&dim=0.15&api_key=l1gzVpZhiMT8HTOAp6hbolyk8AgfjqvTKQZdxlLa',
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}





https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.15&api_key=DEMO_KEY

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
})
