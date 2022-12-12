import { useEffect, useState } from "react";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies } from "../actions";

function App(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //when store updated, then we run this code...
    props.store.subscribe(() => {
      console.log("STORE UPDATED");
      console.log(props.store.getState().list);
      const { list } = props.store.getState();
      setMovies(list);
    });

    //dispatching the action to add the movies to the store
    props.store.dispatch(addMovies(data));
  }, []);

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
          {movies.map((movie, index) => {
            return <MovieCard movie={movie} key={`movie-${index}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
