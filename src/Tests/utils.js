import {applyMiddleware,createStore} from 'redux';
import reducer from '../reducers/reducer.js';
import{middlewares} from '../store.js';
import thunk from "redux-thunk";
import {types} from '../actions/types.js';
import initialState from '../actions/types.js';


export const findByTestAtrr= (component,attr) =>{
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}


export const testStore = (initialState) =>{
    const  createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(reducer,initialState);
};


///////
export const initialState_test_withTop0 = {
    isLoaded :false,
    items:[],
    category:"/r/All/",
    limit:25, 
    intervalTime:30000,
    before:null,
    after:null,
    availableMore:false,
    addNew:false,
    page:0,
    categories:[],
    scrollBy:0,
    reload:false,
    page0Top:"A"
    
  };

export const testStore_withpage0Top = (initialState_test_withTop0) =>{
    const  createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(reducer,initialState_test_withTop0);
};
/////////



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
