import { ADD_MOVIES, ADD_FAVOURITE } from "../actions";

const initialMoviesState = {
  list: [],
  favourites: [],
};

//state is the current state(state before executing the action) inside the store
//default value has been given for the case if the state has not yet been made inside the store(that is, their is no state named 'movies' inside the store initially)
export default function movies(state = initialMoviesState, action) {
  // if (action.type === ADD_MOVIES) {
  //   return {
  //     ...state,
  //     list: action.movies,
  //   };
  // }
  // return state; //return the current state only, if no new state created

  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_FAVOURITE:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    default:
      return state;
  }
}
