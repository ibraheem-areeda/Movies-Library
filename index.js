require('dotenv').config()
const express = require('express')
const app = express()
var cors = require('cors')
const axios = require('axios');
const port =process.env.PORT
const data = require("./data/data.json");
const { request } = require('express');
app.use(cors())
const bodyParser = require('body-parser')
const apiKey = process.env.theAPIkey
const url=process.env.url 
const { Client } = require('pg')
const client = new Client(url)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());









// connect server with DB
client.connect().then(() => {

    app.listen(port, () => {
        console.log(`Server is listening ${port}`);
    });
})





function allMovieshandler(req,res) {
    let sql = `SELECT * FROM moviestable;`

    client.query(sql)
    .then( (result)=>{
        res.send(result.rows)
    })
    .catch(error => { console.error('error') })

}


// functions

function addMovieHandler (req ,res) {
    // console.log(req.body);
    let {title,release_date,poster_path,comment} = req.body
    let sql = `INSERT INTO moviesTable (title, release_date, poster_path,comment)
    VALUES ( $1, $2 ,$3, $4) RETURNING * ;`
    let values=[title,release_date,poster_path,comment] //id added
    
    client.query(sql,values)
    .then((result)=>{
        console.log(result.rows);
        res.status(201).send(result.rows)
    })
    .catch(error => { console.error('error') })
    
}


function updateHandler(req,res) {
    let movieId = req.params.movieId
    
    let {title,release_date,poster_path,comment} = req.body
    let sql = `UPDATE moviestable SET  title=$1, release_date=$2, poster_path=$3,
     comment=$4 WHERE id=$5 RETURNING * ;`
    let values = [title,release_date,poster_path,comment,movieId] 
    client.query(sql,values)
    .then((result)=>{
        console.log(result);
        res.status(202).send(result.rows)
    })
    .catch(error => { console.error('error') })

}

function deleteHandler(req,res) {
    let movieId = req.params.movieId
    
    
        
    let sql = `DELETE FROM moviestable WHERE id=$1 ;`
    let values = [movieId] 
    client.query(sql,values)
    .then((result)=>{
        console.log(result);
        res.status(204).send("deleted")
    })
    .catch(error => { console.error('error') })

}

function oneMovieHandler(req,res) {
    console.log("ok");
    let movieId = req.params.movieId
    let sql = `SELECT * FROM moviestable WHERE id = $1;`
    let values = [movieId] 
    client.query(sql,values)
    .then((result)=>{
        console.log(result);
        res.status(200).send(result.rows)
    })
    .catch(error => { console.error('error') })

}











const handel404 = (req, res) => {
    res.status(404).send('Not Found')
}

const fhandler = (req, res) => {
    res.send('Welcome to Favorite Page')
}


const homeHandler = (req, res) => {
    const allPropMovie = new movie(data.title, data.genre_ids, data.original_language, data.original_title,
        data.poster_path, data.video, data.vote_average, data.overview, data.release_date, data.vote_count,
        data.id, data.adult, data.backdrop_path, data.popularity, data.media_type);
        
        const reqPropMovie = {}
        reqPropMovie.title = allPropMovie.title
        reqPropMovie.poster_path = allPropMovie.poster_path
        reqPropMovie.overview = allPropMovie.overview
        
        
        res.json(reqPropMovie)
    }
    
    
    const urlForTrending = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
    function trendingHandler(req, res) {
        const request = axios.get(urlForTrending)
        request
        
        .then(result => {
            
            
            
            let redata = result.data.results.map(
                
                function constrct(data) { return new Short(data.id, data.title, data.release_date, data.poster_path, data.overview) }
            )
            
            
            res.json(redata)
        })

        .catch(error => { console.error('error') })
}


let movieName = "batman"
const urlForSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}`
const searchHandler = (req, res) => {
    const request = axios.get(urlForSearch)
    request
    .then(result => {
        
        let searchResult = result.data.results.map(

                function shconstrct(data) { return new Short(data.id, data.title, data.release_date, data.poster_path, data.overview) }
                )
                
                
                res.json(searchResult)
                
                
                
            })
            
            
            .catch(error => { console.error('error') })
        }
        
        
        const urlForLatestMoves = `https://api.themoviedb.org/3/movie/latest?api_key=${apiKey}&language=en-US`
        
        function LatestMovesHandler (req, res) {
            
            const request = axios.get(urlForLatestMoves)
            request
            .then(result => {
                
                console.log(result.data);
            
                let LatestMoves = 
                
                new Short(result.data.id,result.data.title, result.data.release_date, result.data.poster_path, result.data.overview ) 
                
                
                res.json(LatestMoves)
                
            } )
        .catch(error => { console.error('error') })


}

const urlForTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
function topRatedHandler (req,res) {
    const request = axios.get(urlForTopRated)
    request
    .then( result => {
        
        // console.log(result.data.results);
        let ForTopRatedData = result.data.results.map( function TopRatedDataFunction(data) {
            return  new Short(data.id, data.title, data.release_date, data.poster_path, data.overview, data.vote_average)
        }
        
    )
    
    
    
    
    
    
    res.json(ForTopRatedData)
    
    
}
)
    
.catch(error=>console.log("error"))


}




// routes

app.get('/allMovies' , allMovieshandler)

app.post('/addmovie' , addMovieHandler)

app.get('/favorite', fhandler)


app.get('/', homeHandler)

app.get("/trending", trendingHandler)

app.get("/search", searchHandler)

app.get("/LatestMoves", LatestMovesHandler)

app.get("/topRated", topRatedHandler)

app.put("/UPDATE/:movieId" , updateHandler) //1

app.delete("/DELETE/:movieId" , deleteHandler) //2

app.get( "/getMovie/:movieId" , oneMovieHandler) // 3

app.get("*", handel404)






//constrctor function

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



function Short(id, title, release_date, poster_path, overview,vote_average,release_date) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    this.vote_average = vote_average;
    this.release_date = release_date;
}