import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { createBrowserHistory } from "history";
import reducers from "./reducers";

export const history = createBrowserHistory();

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["auth"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducers);

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  // middleware.push(logger);
}
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(pReducer, {}, composedEnhancers);
let persistor = persistStore(store);
export default { store, persistor };
