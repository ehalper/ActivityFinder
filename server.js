

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '001b0f58045147663b1ea518d34d88b4';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {

  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`






  request(url, function (err, response, body) {
    if(err){
    
      res.render('index', {weather: null, error: 'Error, please try again'});
     
    } else {

      let weather = JSON.parse(body)
     
      
      if(weather.main == undefined){
        
        res.render('index', {weather: null, error: 'Error, please try again'});
        
        //no errors getting weather
      } else {
//displays activity depending on temperature

        const indoorActivities = ["Paint.", "Draw.", "Practice some caligraphy.", "Browse some online shopping.",
                         "Catch up on your favorite show.", "Try out that show you've been dying to see.",
                          "Watch a new movie.", "Re-watch your favorite movie.", "Take a nap.", "Learn how to sow.",
                           "Learn how to knit.", "Learn how to crochet.", "Listen to some new music.", 
                           "Put on your favorite playlist.", "Reminisce through some old pictures.", "Create a collage.",
                          "Create a vision board.", "Create a new board game.", "Try a new book.", "Cook something new.",
                          "Bake something new.", "Cook your favorite meal.", "Bake your favorite sweet.", 
                          "Learn how to play a new instrument.", "Clean your room.", "Clean where you live.", 
                          "Play your favorite videogame.", "Go through your closet and get rid of stuff.", "Play a board game.",
                          "Work on a puzzle.", "Plan your next vacation.", "Learn a new language.", "Do an indoor workout." ,
                          "Watch a sports game.", "Go on and watch Tik Tok.", "Learn a new Tik Tok dance.", 
                          "Learn all the countries and their capitals.", "Learn all the U.S. states and their capitals.",
                           "Learn the locations of all the U.S. states.", "Learn the locations of all countries.", 
                           "Listen to a podcast.", "Watch Youtube.", "Take a personality test.", "Journal.", 
                          "Have a spa day (take a bath, use a face mask, paint your nails.)", "Meditate.", "Do yoga.", 
                           "Try an online zumba video.", "Start a new friendship bracelet.", "Go on Pinterest.",
                          "Make origami."];
        const randomIndoorActivity = indoorActivities[Math.floor(Math.random() * indoorActivities.length)];

        const outdoorActivities = ["Play soccer.", "Play tennis.", "Go for a run.", "Sunbathe.",
                         "Go on a hike.", "Go on a picnic.", "Go to a beach.", "Play basketball.", 
                         "Use chalk and draw on the pavement.", "Play soccer tennis.",
                           "Go to the park.", "Go for a bike ride.", "Prepare for a bonfire.", 
                           "Camp out in your yard.", "Create a scavenger hunt.", "Roller-skate or roler-blade.",
                          "Start a garden.", "Have a photoshoot.", "Stargaze when it gets dark.", 
                          "Do an outdoor workout.", "Have a water balloon fight.", "Play hopscotch.", 
                          "Make popsicles or snow cones.", "Wash your cars.", "Do some yard work.", 
                          "Plant some new flowers.", "Play kickball.", "Make your own lemonade stand.", 
                          "Look for shapes in the clouds.", "Lay in a hammock.", "Go fishing.", "Tie-die.", 
                          "Play tag.", "Read a book outside.", "Browse a magazine outside.",
                           "Listen to some music outside.", "Work on a friendship bracelet outside.", 
                           "Play cornhole.", "Play can jam.", "Fly a kite.", "Do yoga outside.", 
                          "Meditate outside.", "Go for a boat ride.", "Pick some fruit at an orchard.", 
                           "Bird watch and observe wildlife."];
        const randomOutdoorActivity = outdoorActivities[Math.floor(Math.random() * outdoorActivities.length)];

        //if there's rain/thunderstorm or is too cold, indoor activities:
        if (weather.weather[0].main == 'Rain' || weather.weather[0].main == 'Thunderstorm' ||  weather.weather[0].main == 'Mist' || weather.main.temp < 55){
          let weatherText = randomIndoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
       
          //no rain! (outdoor activities!)
        } else if (weather.main.temp >= 55) {
         
                let weatherText = randomOutdoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
               
              

      
                  
                
        
         

        }
      }  
    }
   
  });

})






app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
