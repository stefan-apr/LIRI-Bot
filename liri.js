require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
spotify = new Spotify(keys.spotify);

var axios = require('axios');

var moment = require('moment');

var cmd = process.argv[2];
var arg = process.argv[3];

// Parse user input and run the function they wanted if it exists.
console.log();
if(cmd !== "do-what-it-says" && cmd !== "commands") {
    var fixedCmd = cmd.replace(/-/g, '_');
    console.log(fixedCmd + "('" + arg + "')");
    try {
        eval(fixedCmd + "('" + arg + "')");
    } catch(err) {
        console.log("Sorry, I didn't understand your request. If you want a list of functions to use, try passing in 'commands' as your third argument.");
    }
} else if(cmd === "do-what-it-says") {
    do_what_it_says();
} else {
    help();
}

// Searches the Bands In Town Artist Events API using a band name passed in as a parameter. Searches for "System of a Down" if no band param was provided.
function concert_this(artist) {
    if(artist === "undefined") {
        artist = "System of a Down";
    }
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(function(response) {
        // console.log(response.data);
        artist = artist.charAt(0).toUpperCase() + artist.slice(1);
        console.log("Next concert to feature " + artist + ":");
        console.log();
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country);
        console.log(moment(response.data[0].venue.datetime).format("MM-DD-YYYY"));
    });
}

// Searches the Spotify API using a song name passed in as a parameter.
function spotify_this_song(song) {
    console.log("spotify-this-song fired");

}

// Searches the OMDB API using a movie title passed in as a parameter. Searches for "Mr. Nobody" if no param is provided.
function movie_this(movie) {
    var noMovie = false;
    if(movie === "undefined") {
        movie = "Mr. Nobody"
        noMovie = true;
    }
    var url = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
    axios.get(url).then(function(response) {
        // console.log(response.data);
        if(noMovie) {
            console.log("I hear Mr. Nobody is a pretty good film, you could try watching that! It's on Netflix!");
            console.log("http://www.imdb.com/title/tt0485947/");
            console.log()
        }
        movie = movie.charAt(0).toUpperCase() + movie.slice(1);
        console.log("Here's some data about the movie " + movie + ":");
        console.log()
        console.log("It was released in " + response.data.Year);
        console.log("It has an IMDB rating of " + response.data.imdbRating);
        console.log("It has a Rotten Tomatoes rating of " + response.data.Ratings[1].Value);
        console.log("Country in which it was produced: " + response.data.Country);
        console.log("Its primary language is " + response.data.Language);
        console.log("Plot summary:");
        console.log(response.data.Plot);
        console.log("Actors: " + response.data.Actors);
    });
}

function do_what_it_says() {
    console.log("do-what-it-says fired");

}

// Prints a list of available commands that LIRI can handle. TBD.
function help() {
    console.log("help fired");
}