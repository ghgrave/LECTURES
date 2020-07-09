import React, {useState} from 'react';
import './App.css';



function App() {
  const [rows, setRows] = useState("");

  const performSearch = (searchTerm) =>{
    const url = `https://api.themoviedb.org/3/search/movie?api_key=4de3f13a4cdd05831b95a97d3b3e2da6&query=${searchTerm}`;
    fetch(url)
    .then(response => {return response.json()})
    .then(searchResults => {
        let movies = searchResults.results;
        var movieRows = [];
        movies.forEach((movie) => {
            let posterImage = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
            const movieRow = <div key={movie.id}>
                                <h1>{movie.title}</h1>
                                <img alt="poster" src={posterImage}></img>
                                <p>{movie.overview}</p>
                                
                            </div>
          movieRows.push(movieRow)
        })
        setRows(movieRows);
    })
    .catch(error => {
        console.error('Error coming from API:   ', error)
    })
  
  }
  
  const searchChangeHandler = (event) => {
    performSearch(event.target.value);
  }


  return (
    <div>
      <h1>Movie Search</h1>
      <input id="inputField"
            onChange={searchChangeHandler} 
            placeholder="Enter your movie">
      </input>
      {rows}
    </div>
  );
}

export default App;
