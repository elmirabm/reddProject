import {applyMiddleware,createStore} from 'redux';
import reducer from '../reducers/reducer.js';
import store from '../store.js';
import thunk from "redux-thunk";
import {types,initialState} from '../actions/types.js'


export const findByTestAtrr= (component,attr) =>{
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

export const testStore = (initialState) =>{
    const  createStoreWithMiddleware = applyMiddleware(...thunk)(createStore);
    return createStoreWithMiddleware;
};


export const newState= reducer(undefined,{
    type:types.ADD_DATA,
    top:2,
    page:0,
    payload: {
        children:[
            {
                data:{
                    id:0,
                    name:"",
                    thumbnail:"",
                    url:"",
                    title:""

                }
            }
        ]
    }
});
