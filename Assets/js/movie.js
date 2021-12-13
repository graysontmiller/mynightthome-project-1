//API Key for the movie DB
var movieKey = "d4a209b34d618c9571d82786a8f1c751";
var movieGenres;
var myStorage = window.sessionStorage;


//generators an array of movie genres to later sort through 
let generateGenreString = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + movieKey + "&language=en-US";
fetch(generateGenreString)
    .then(Response => Response.json()).then((data) => {
        movieGenres = data.genres;
    }).catch((err) => {
        console.log(err);
    });


var searchGenre = function (userGenre) {
    let movieString = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieKey + "&with_genres=" + userGenre;
    
    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            data = data.results;

            for (i = 0; i <= 5; i++) {            
                // let movie = {
                //     "Title": data[i].title,
                //     "Image": "https://image.tmdb.org/t/p/original" + data[i].poster_path,
                //     "ID": data[i].id
                // }

                let movieImg = document.getElementById("image" + i);
                let movieTitle = document.getElementById("title" + i);
                movieImg.setAttribute("value", data[i].id)
                movieImg.setAttribute("src", "https://image.tmdb.org/t/p/original" + data[i].poster_path);
                movieTitle.innerHTML = data[i].title;
            }
        }).catch((err) => {
            console.log(err);
        });
};

var displayMovie = function(movieID){
    let titleString = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + movieKey;
    fetch(titleString)
    .then(Response => Response.json()).then((data) => {
        console.log(data);
        let image = document.getElementById("image");
        $("#title").text(data.title);
        image.setAttribute("src", "https://image.tmdb.org/t/p/original" + data.poster_path)
    }).catch((err) => {
        console.log(err);
    });
}

$(".option").on("click", function(){
    let userGenre = $(this).val();

    for (let genre in movieGenres) {
        if (movieGenres[genre].name == userGenre) {
            sessionStorage.setItem("GenreID", movieGenres[genre].id);
        }
    }
});

$(".button").on("click", function(){
    let myValue = $(this).val();
    console.log(myValue);
});

$(".card").on("click", () => {
    let myValue = this.event.target;
    myValue = myValue.getAttribute("value");
    sessionStorage.setItem("MovieID", myValue);
});
