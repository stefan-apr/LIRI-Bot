require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require('axios');

var moment = require('moment');

var fs = require('fs');

var cmd = process.argv[2];
var arg = process.argv[3];

// Parse user input and run the function they wanted if it exists.
console.log();
if(cmd !== "do-what-it-says" && cmd !== "commands") {
    var fixedCmd = cmd.replace(/-/g, '_');
    try {
        eval(fixedCmd + "('" + arg + "')");
    } catch(err) {
        console.log("Sorry, I didn't understand your request. If you want a list of functions to use, try passing in 'commands' as your third argument.");
    }
} else if(cmd === "do-what-it-says") {
    do_what_it_says();
} else {
    commands();
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

// Searches the Spotify API using a song name passed in as a parameter. Searches "Run to the Hills" if no param is provided.
function spotify_this_song(song) {
    var noSong = false;
    if(song === "undefined") {
        song = "Fear of the Dark"
        noSong = true;
    }
    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(err, data) {
        if(err) {
            console.log("An error occurred: " + err);
            return;
        } 
        //console.log(data.tracks.items[0]);
        if(noSong) {
            console.log("I like Iron Maiden, so since you didn't specify a song, we'll look at one of theirs.");
            console.log();
        }
        console.log("Here's some data about the song " + song + ":");
        console.log("The artist is: " + data.tracks.items[0].album.artists[0].name);
        console.log("The album the song is on is: " + data.tracks.items[0].album.name);
        console.log("Here's a preview link to the song: " + data.tracks.items[0].preview_url);
        noSong = false;
    });
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
        noMovie = false;
    });
}

// Executes another function of the bot based on information read from random.txt.
function do_what_it_says() {
    var content;
    fs.readFile("./random.txt", "utf-8", function(error, data) {
        if(error) {
            throw error;
        }
        content = data;
        var split = content.split(",");
        if(split[0] !== "do-what-it-says") {
            split[0] = split[0].replace(/-/g, '_');
            split[1] = split[1].replace(/"/g, '')
        } else {
            return;
        }
        try {
            eval(split[0] + "('" + split[1] + "')");
        } catch(err) {
            console.log("Sorry, I didn't understand your request. If you want a list of functions to use, try passing in 'commands' as your third argument.");
        }
    });
}

// Prints a list of available commands that LIRI can handle.
function commands() {
    console.log("Here's a list of available commands, their syntax, and their functions:");
    console.log();
    console.log("node liri.js concert-this 'arg'");
    console.log("Prints information about the next concert that will feature the band passed in as an argument. If no argument is provided, searches a band the developer likes.");
    console.log();
    console.log("node liri.js spotify-this-song 'arg'");
    console.log("Prints information about the song passed in as an argument. If no argument is provided, searches a song the developer likes.");
    console.log();
    console.log("node liri.js movie-this 'arg'");
    console.log("Prints information about the movie passed in as an argument. If no argument is provided, searches a movie the developer likes.");
    console.log();
    console.log("node liri.js do-what-it-says");
    console.log("Reads 'random.txt' and evaluates whatever command is written there, if possible.");    
    console.log();
    console.log("node liri.js commands");
    console.log("Prints a list of LIRI's commands, their syntax, and their functions.");
}