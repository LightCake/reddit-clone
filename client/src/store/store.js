import ReduxThunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import reducer from "../reducers";

const configureStore = (preloadedState = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(ReduxThunk))
  );
};

export default configureStore;
