import React from "react";
// import { data } from "../data";
import { handleSearchSelected, handleMovieSearch } from "../actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(handleSearchSelected(movie.Title));
    this.setState({
      searchText: "",
    });
  };

  handleSearch = () => {
    const { searchText } = this.state;
    this.props.dispatch(handleMovieSearch(searchText));
  };

  handleEnterKey = (e) => {
    if (e.key === "Enter") {
      const { searchText } = this.state;
      this.props.dispatch(handleMovieSearch(searchText));
    }
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { result: movies, showSearchResults } = this.props.search;
    return (
      <div className="nav">
        <div className="search-container">
          <input
            value={this.state.searchText}
            onChange={this.handleChange}
            onKeyDown={this.handleEnterKey}
          />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>

          {showSearchResults && (
            <div className="search-results">
              {movies.map((movie, index) => (
                <div className="search-result" key={`search-result-${index}`}>
                  <img src={movie.Poster} alt="search-pic" />
                  <div className="movie-info">
                    <span>{movie.Title}</span>
                    <button onClick={() => this.handleAddToMovies(movie)}>
                      Add to Movies
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
