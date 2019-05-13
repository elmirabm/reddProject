import logger from "redux-logger"
import{createStore, combineReducers, applyMiddleware} from "redux";
import reducer from "./reducers/reducer"
import thunk from "redux-thunk";

export const middlewares=[thunk];

export default  createStore(
    combineReducers({reducer}),//can assing multiple reducer if needed
    applyMiddleware(...middlewares)//thunk to handle async fetch calls //logger,
  );

  /*const myLogger=(store)=>(next) =>(action) =>{
    console.log("Logged Action : ",action);
    next(action);
  };
  */