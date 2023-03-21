const express = require('express')
const app = express()
var cors = require('cors')
const axios = require('axios');
const port = 3004
const data = require("./data/data.json")

app.use(cors())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




const handel404 = (req, res) => {
    res.status(404).send('Not Found')
}

const fhandler = (req, res) => {
    res.send('Welcome to Favorite Page')
}


const homeHandler = (req , res) => {
    const allPropMovie = new  movie (data.title, data.genre_ids, data.original_language, data.original_title,
        data.poster_path, data.video, data.vote_average, data.overview, data.release_date, data.vote_count,
        data.id, data.adult, data.backdrop_path, data.popularity, data.media_type);
        
        const reqPropMovie = {}
        reqPropMovie.title = allPropMovie.title
        reqPropMovie.poster_path = allPropMovie.poster_path
        reqPropMovie.overview = allPropMovie.overview
        
        
        res.json(reqPropMovie)
    }



app.get ('/favorite', fhandler)


app.get('/', homeHandler)

app.get( "*" , handel404)










    
    
    
    function movie(title, genre_ids, original_language, original_title,
        poster_path, video, vote_average, overview, release_date, vote_count,
        id, adult, backdrop_path, popularity, media_type) {
    
        this.title = title;
        this.genre_ids = genre_ids;
        this.original_language = original_language;
        this.original_title = original_title;
        this.poster_path = poster_path;
        this.video = video;
        this.vote_average = vote_average;
        this.overview = overview;
        this.release_date = release_date;
        this.vote_count = vote_count;
        this.id = id;
        this.adult = adult;
        this.backdrop_path = backdrop_path;
        this.popularity = popularity;
        this.media_type = media_type;
    }
    
    
    


