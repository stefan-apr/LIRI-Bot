# LIRI-Bot

This program is a text interpreter that queries a number of different APIs for various pieces of information based on the user's commands.
It is developed in JavaScript with Node.js.

The LIRI bot is currently able to accept five different commands. They are as follows:


node liri.js concert-this 'arg'
Prints information about the next concert that will feature the band passed in as an argument. If no argument is provided, searches a band the developer likes. Queries the Bands In Town API for this information.

node liri.js spotify-this-song 'arg'
Prints information about the song passed in as an argument. If no argument is provided, searches a song the developer likes. Queries the Spotify API for this information.

node liri.js movie-this 'arg'
Prints information about the movie passed in as an argument. If no argument is provided, searches a movie the developer likes. Queries the OMDB API for this information.

node liri.js do-what-it-says
Reads 'random.txt' and evaluates whatever command is written there, if possible. If the contents of random.txt are not readable by the program, the user is given an error message. Random.txt should contain a command written like so:

movie_this,"Forrest Gump"


node liri.js commands
Prints a list of LIRI's commands, their syntax, and their functions.

© Stefan Apreutesei
March 4, 2019