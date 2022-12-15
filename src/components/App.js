import React from "react";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies } from "../actions";

class App extends React.Component {
  // useEffect(() => {
  //   //when store updated, then we run this code...
  //   props.store.subscribe(() => {
  //     console.log("STORE UPDATED");
  //     console.log(props.store.getState());
  //     // const { list } = props.store.getState();
  //     // setMovies(list);
  //   });

  //   //dispatching the action to add the movies to the store
  //   props.store.dispatch(addMovies(data));
  // }, []);

  componentDidMount() {
    const { store } = this.props;

    //we are subscribing to the store inside App component after the App mounts(componentDidMount)
    //so this way, whenever any changes occur to the state inside store, subscribe function will execute
    //which will re-render(forceUpdate) the whole App component(hence everything will be re-rendered)
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    });

    store.dispatch(addMovies(data));

    console.log("STATE", this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();

    const index = favourites.indexOf(movie);

    if (index !== -1) return true;
    return false;
  };

  // const { list } = props.store.getState();

  render() {
    const { list } = this.props.store.getState();
    console.log("RENDER");
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
            {/* index parameter is provided by the map function itself */}
            {list.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={`movie-${index}`}
                  dispatch={this.props.store.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
