//action types
export const ADD_MOVIES = "ADD_MOVIES";

//action creators
export const addMovies = (movies) => {
  return {
    type: ADD_MOVIES,
    movies: movies,
  };
};
