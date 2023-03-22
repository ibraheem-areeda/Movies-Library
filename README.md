# Movies-Library - 1.1


**Author Name**: ibraheem areeda

## WRRC
**version 1.0**

![](./WRRC.PNG)


**version 1.1**

![](./WRRC%20V2.PNG)

## Overview

## Getting Started
Assuming you’ve already installed Node.js, create a directory to hold your application, and make that your working directory.
1- $ mkdir myapp
   $ cd myapp

2- $ npm init

3- $ npm install express

4- $ npm install cors

5- $ npm install axios

6- $ npm install -g nodemon

7- $ nodemon server.js

8- create a API key from https://developers.themoviedb.org/3/getting-started/introduction
to use it in the requests

## Project Features

NOTE : ALL THE METHODS ARE (GET) METHODS

http://localhost:3006/favorite => Welcome to Favorite Page


http://localhost:3006/ => 

{
  "title": "Spider-Man: No Way Home",
  "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
}



./trending => respod with array of objects for trending movies

./search => respod with array of objects for movies with the key word entered by user

./LatestMoves => respod with array of objects for Latest Moves movies

./topRated => respod with array of objects for top Rated movies

insted of ./ it will be like this
("http://localhost:3006/THE RAOUT YOU WANT TO REQUEST")