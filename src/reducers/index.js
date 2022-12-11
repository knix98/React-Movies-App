//state is the current state inside the store, default value has been set to empty array
export default function movies(state = [], action) {
  if (action.type === "ADD_MOVIES") {
    return action.movies;
  }
  return state; //return the current state only, if no new state created
}
