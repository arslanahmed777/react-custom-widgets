import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import RootReducer from "./RootReducer";
import { rootSaga } from "./RootSaga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  sagaMiddleware,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export const store = createStore(RootReducer, compose(...middlewares));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
const pstore = { store, persistor };
export default pstore;
