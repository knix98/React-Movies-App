import React from "react";
import { connect } from "react-redux";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    // const { store } = this.props;

    // //we are subscribing to the store inside App component after the App mounts(componentDidMount)
    // //so this way, whenever any changes occur to the state inside store, subscribe function will execute
    // //which will re-render(forceUpdate) the whole App component(hence everything will be re-rendered)
    // store.subscribe(() => {
    //   this.forceUpdate();
    // });

    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if (index !== -1) return true;
    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(setShowFavourites(val));
  };

  render() {
    const { movies } = this.props; //state : { movies: {}, search: {} }
    const { list, favourites, showFavourites } = movies;

    //deciding whether to show all movies list or only favourites movies
    //depending upon the value of 'showFavourites' inside state in store
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => {
                this.onChangeTab(false);
              }}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => {
                this.onChangeTab(true);
              }}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {/* index parameter is provided by the map function itself */}
            {displayMovies.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={`movie-${index}`}
                  dispatch={this.props.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              );
            })}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// //created the AppWrapper for <App> component so that, we could use store(coming from StoreContext.Consumer) inside <App>
// //because we want to use store in componentDidMount also, but StoreContext.Consumer can only be used inside render() and hence not inside componentDidMount
// class AppWrapper extends React.Component {
//   render() {
//     return (
//       //using the StoreContext thru StoreContext.Consumer
//       //StoreContext.Consumer expects a callback funcn in it, and react internally will give the 'value' prop of StoreContext.Provider as argument to this funcn
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

//this function would internally get(by react-redux) the 'state' object from store as argument
//from this function return an object containing all the objects that you want as props in the connected Component
function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}

//passing the callback and the Component that we want to connect to the store
const connectedComponent = connect(mapStateToProps)(App);
export default connectedComponent;
