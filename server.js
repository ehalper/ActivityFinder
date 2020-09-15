//Calculates the current date and time
var date = new Date();

//calculates hour
if (date.getHours().toString().length == 1) {
  hour = '0'+date.getHours();
} else {
  hour = date.getHours();
}
//calculates time of day (AM or PM)
if (date.getHours() >= 12) {
  timeOfDay = 'PM';
} else {
  timeOfDay = 'AM';
}

//concatenates hour and AM or PM
hourSpecific = (hour - 12) + timeOfDay;

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
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
      const morningOutdoorActivities = 
      ["Watch the sunrise.", "Go for a run.", 
      "Go on a hike.", "Go to a beach.", "Go to the park.", "Go for a bike ride.",
       "Do an outdoor workout.", "Do some yard work.", 
       "Plant some new flowers.", "Make your own lemonade stand.", 
        "Lay in a hammock.", "Go fishing.", "Read a book outside.", "Browse a magazine outside.", 
        "Do a crossword puzzle", "Listen to some music outside.", "Work on a friendship bracelet outside.", 
        "Play can jam.", "Do yoga outside.", "Meditate outside.", "Go for a boat ride.", 
        "Pick some fruit at an orchard.", "Bird watch and observe wildlife."];

        const dayOutdoorActivities = 
        ["Play soccer.", "Play tennis.", "Go for a run.", "Sunbathe.",
        "Go on a hike.", "Go on a picnic.", "Go to a beach.", "Play basketball.", 
        "Use chalk and draw on the pavement.", "Play soccer tennis.",
         "Go to the park.", "Go for a bike ride.", 
          "Create a scavenger hunt.", "Roller-skate or roler-blade.",
         "Start a garden.", "Have a photoshoot.",  
         "Do an outdoor workout.", "Have a water balloon fight.", "Play hopscotch.", 
         "Make popsicles or snow cones.", "Wash your cars.", "Do some yard work.", 
         "Plant some new flowers.", "Play kickball.", "Make your own lemonade stand.", 
          "Lay in a hammock.", "Go fishing.", "Tie-die.", 
         "Read a book outside.", "Browse a magazine outside.", "Do a crossword puzzle outside",
          "Listen to some music outside.", "Work on a friendship bracelet outside.", 
          "Play cornhole.", "Play can jam.", "Fly a kite.", "Do yoga outside.", 
         "Meditate outside.", "Go for a boat ride.", "Pick some fruit at an orchard.", 
          "Bird watch and observe wildlife."];

        const nightOutdoorActivities = 
          ["Watch the sunset.", "Go to the park.", "Go for a bike ride.", "Prepare for a bonfire.", 
          "Camp out in a tent.",  "Have a night photoshoot.", "Stargaze.", 
          "Lay in a hammock.", "Listen to some music outside.", "Meditate outside."];

        const morningIndoorActivities = 
          ["Cook some pancakes.", "Cook some waffes.", "Cook some breakfast crepes.",
          "Make yourself a home-made latte", "Make a gourmet breakfast",
          "Watch the news", "Listen to some new music.", 
          "Put on your favorite playlist.",  "Create a vision board.", "Try a new book.", "Cook something new.",
          "Bake something new.", "Cook your favorite meal.", "Bake your favorite sweet.", 
           "Clean your room.", "Clean your living space.", "Go through your closet and get rid of stuff.", 
           "Work on a puzzle.", "Do an indoor workout." ,
           "Go on and watch Tik Tok.", "Learn a new Tik Tok dance.", 
           "Listen to a podcast.", "Watch Youtube.", "Take a personality test.", "Journal.", 
           "Meditate.", "Do yoga.", "Try an online zumba video.",  "Go on Pinterest."];

        const dayIndoorActivities = 
        ["Prepare a gourmet lunch.", "Bake a dessert to eat after lunch.", "Paint.", "Draw.", 
          "Practice some caligraphy.", "Browse some online shopping.", "Do a crossword puzzle inside",
          "Take a nap.", "Learn how to sow.", "Learn how to knit.", "Learn how to crochet.", "Listen to some new music.", 
         "Put on your favorite playlist.", "Reminisce through some old pictures.", "Create a collage.",
        "Create a vision board.", "Create a new board game.", "Try a new book.", "Cook something new.",
          "Bake something new.", "Cook your favorite meal.", "Bake your favorite sweet.", 
          "Learn how to play a new instrument.", "Clean your room.", "Clean your living space.", 
           "Play your favorite videogame.", "Go through your closet and get rid of stuff.", "Play a board game.",
           "Work on a puzzle.", "Plan your next vacation.", "Learn a new language.", "Do an indoor workout." ,
            "Watch a sports game.", "Learn a new Tik Tok dance.", 
           "Learn all the countries and their capitals.", "Learn all the U.S. states and their capitals.",
          "Learn the locations of all the U.S. states.", "Learn the locations of all countries.", 
             "Listen to a podcast.", "Watch Youtube.", "Take a personality test.",  
            "Try an online zumba video.", "Start a new friendship bracelet.", "Go on Pinterest.",
           "Make origami."];

        const nightIndoorActivities = 
        ["Make some night time tea.", "Prepare a gourmet dinner.", 
          "Bake a dessert to eat after dinner.", "Browse some online shopping.",
         "Catch up on your favorite show.", "Try out that show you've been dying to see.",
         "Watch a new movie.", "Re-watch your favorite movie.", "Listen to some new music.", 
          "Put on your favorite playlist.", "Reminisce through some old pictures.", "Try a new book.", 
         "Cook something new.", "Bake something new.", "Cook your favorite meal.", 
          "Bake your favorite sweet.", "Clean your room.", "Clean your living space.", 
         "Play your favorite videogame.", "Go through your closet and get rid of stuff.", "Play a board game.",
          "Work on a puzzle.", "Watch a sports game.", "Go on and watch Tik Tok.", 
         "Listen to a podcast.", "Watch Youtube.", "Take a personality test.", "Journal.", 
          "Have a spa day (take a bath, use a face mask, paint your nails.)", "Meditate.", "Do yoga.", 
         "Go on Pinterest."]
                      
        //if there's rain/thunderstorm or is too cold, indoor activities:
        if (weather.weather[0].main == 'Rain' || weather.weather[0].main == 'Thunderstorm' 
            ||  weather.weather[0].main == 'Mist' || weather.main.temp < 55) {
         
            if (hourSpecific == '12PM' || hourSpecific == '1PM' || hourSpecific == '2PM' ||hourSpecific == '3PM' || hourSpecific == '4PM' 
              ||hourSpecific == '5PM' || hourSpecific == '6PM' || hourSpecific == '7PM') {
                  //day
                  const randomDayIndoorActivity = dayIndoorActivities[Math.floor(Math.random() * dayIndoorActivities.length)];
                  let weatherText = randomDayIndoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) and feels like ${weather.main.feels_like} °F in ${weather.name}.`;
                  res.render('index', {weather: weatherText, error: null});
            } else if (hourSpecific == '8PM' || hourSpecific == '9PM' || hourSpecific == '10PM' ||hourSpecific == '11PM' || hourSpecific == '12AM' 
              ||hourSpecific == '1AM' || hourSpecific == '2AM' || hourSpecific == '3AM' || hourSpecific == '4AM') {
                  //night
                  const randomNightIntdoorActivity = nightIndoorActivities[Math.floor(Math.random() * nightIndoorActivities.length)];
                  let weatherText = randomNightIndoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) and feels like ${weather.main.feels_like} °F in ${weather.name}.`;
                  res.render('index', {weather: weatherText, error: null});
            } else {
                  //morning
                  const randomMorningIndoorActivity = morningIndoorActivities[Math.floor(Math.random() * morningIndoorActivities.length)];
                   let weatherText = randomMorningIndoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) and feels like ${weather.main.feels_like} °F in ${weather.name}.`;
                   res.render('index', {weather: weatherText, error: null});
            }
       
            //no rain! (outdoor activities!):
          } else if (weather.main.temp >= 55 ) {
               if (hourSpecific == '12PM' || hourSpecific == '1PM' || hourSpecific == '2PM' ||hourSpecific == '3PM' || hourSpecific == '4PM' 
                  ||hourSpecific == '5PM' || hourSpecific == '6PM' || hourSpecific == '7PM') {
                      //day
                      const randomDayOutdoorActivity = dayOutdoorActivities[Math.floor(Math.random() * dayOutdoorActivities.length)];
                      let weatherText = randomDayOutdoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) and feels like ${weather.main.feels_like} °F in ${weather.name}.`;
                      res.render('index', {weather: weatherText, error: null});
                } else if (hourSpecific == '8PM' || hourSpecific == '9PM' || hourSpecific == '10PM' ||hourSpecific == '11PM' || hourSpecific == '12AM' 
                  ||hourSpecific == '1AM' || hourSpecific == '2AM' || hourSpecific == '3AM' || hourSpecific == '4AM') {
                      //night
                      const randomNightOutdoorActivity = nightOutdoorActivities[Math.floor(Math.random() * nightOutdoorActivities.length)];
                      let weatherText = randomNightOutdoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) and feels like ${weather.main.feels_like} °F in ${weather.name}.`;
                      res.render('index', {weather: weatherText, error: null});
                 } else {
                       //morning
                       const randomMorningOutdoorActivity = morningOutdoorActivities[Math.floor(Math.random() * morningOutdoorActivities.length)];  
                       let weatherText = randomMorningOutdoorActivity + ` It's ${weather.main.temp} °F (${weather.weather[0].main}) and feels like ${weather.main.feels_like} °F in ${weather.name}.`;
                       res.render('index', {weather: weatherText, error: null});
                 } 
              } 
          }
        }   
    });
  })

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})
  