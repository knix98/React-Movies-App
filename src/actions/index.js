//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_SEARCH_RESULT = "ADD_SEARCH_RESULT";
export const ADD_MOVIE_TO_LIST = "ADD_MOVIE_TO_LIST";

//action creators
export const addMovies = (movies) => {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
};

export const addFavourite = (movie) => {
  return {
    type: ADD_TO_FAVOURITES,
    movie: movie,
  };
};

export const removeFromFavourites = (movie) => {
  return {
    type: REMOVE_FROM_FAVOURITES,
    movie,
  };
};

export const setShowFavourites = (val) => {
  return {
    type: SET_SHOW_FAVOURITES,
    val,
  };
};

export const addMovieToList = (movie) => {
  return {
    type: ADD_MOVIE_TO_LIST,
    movie,
  };
};

export const handleSearchSelected = (movie) => {
  //making API request to search by movie title
  const url = `http://www.omdbapi.com/?apikey=480eee18&t=${movie}`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((movie) => {
        console.log("selected movie", movie);

        //dispatch an action
        dispatch(addMovieToList(movie));
      });
  };
};

export const handleMovieSearch = (movie) => {
  //making API request to search by search
  const url = `http://www.omdbapi.com/?apikey=480eee18&s=${movie}`;

  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((movies) => {
        console.log("movie", movies);

        //dispatch an action
        dispatch(addMovieSearchResult(movies.Search));
      });
  };
};

export const addMovieSearchResult = (movies) => {
  return {
    type: ADD_SEARCH_RESULT,
    movies,
  };
};
