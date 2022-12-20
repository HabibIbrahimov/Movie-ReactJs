import React from 'react';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
class App extends React.Component {
  state = {
    movies: [],

    searchQuery: '',
  };

  async componentDidMount() {
    const baseURL = 'http://localhost:3002/movies';
    const response = await fetch(baseURL);
    const data = await response.json();
    this.setState({ movies: data });
  }

  deleteMovie = async (movie) => {
    const baseURL = `http://localhost:3002/movies/${movie.id}`;
    await fetch(baseURL, {
      method: 'Delete',
    });
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  searchMovie = (event) => {
    //console.log(event.target.value)
    this.setState({ searchQuery: event.target.value });
  };

  addMovie = async (movie) => {
    const baseURL1 = 'http://localhost:3002/movies/';
    await fetch(baseURL1, {
      method: 'Post',
    });

    const newMovieLists = this.state.movies.concat([movie]);
    this.setState((state) => ({
      movies: newMovieLists,
    }));
  };

  render() {
    let filteredMovies = this.state.movies.filter((movie) => {
      return (
        movie.name
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <SearchBar searchMovieProp={this.searchMovie} />
          </div>
        </div>

        <MovieList movies={filteredMovies} deleteMovieProp={this.deleteMovie} />
        <AddMovie
          onAddMovie={(movie) => {
            this.addMovie(movie);
          }}
        />
      </div>
    );
  }
}

export default App;
