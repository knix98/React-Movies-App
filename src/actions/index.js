//action types
export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";

//action creators
export const addMovies = (movies) => {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
};

export const addFavourite = (movie) => {
  return {
    type: ADD_FAVOURITE,
    movie: movie,
  };
};
