import {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
} from "../actions";

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false, //since initially we will be showing the movies tab and not the favourites tab
};

//state is the current state(state before executing the action) inside the store
//default value has been given for the case if the state has not yet been made inside the store(that is, their is no state named 'movies' inside the store initially)
export function movies(state = initialMoviesState, action) {
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
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );

      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    default:
      return state;
  }
}

const initialSearchState = {
  result: {},
};

export function search(state = initialSearchState, action) {
  return state;
}

const initialRootState = {
  movies: initialMoviesState,
  search: initialSearchState,
};

export default function rootReducer(state = initialRootState, action) {
  return {
    //by calling movies(state, action), wud return the updated movies state here
    //and similarly search(state, action) wud return the updated search state here
    //and then our rootReducer wud pass this updated state object to the store
    movies: movies(state.movies, action),
    search: search(state.search, action),
  };
}
