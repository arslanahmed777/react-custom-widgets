import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./RootReducer";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./RootSaga";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(RootReducer, compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
sagaMiddleware.run(rootSaga);
export default store;
