import React from 'react';
import {shallow,configure} from 'enzyme';
import {types,initialState} from '../actions/types.js'
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../reducers/reducer.js';


configure({ adapter: new Adapter() });


configure({ adapter: new Adapter() });

describe("Test reducer Set ADD DATA" ,()=>{

    let action ;
    let state ;
    beforeEach(()=>{
        action = {
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
        },
        state = initialState
    });
    
        it('Test No data loaded , addKnew should be true', ()=>{            
            state.items = [];
            state.addNew= false;
            state.scrollBy=10;


            const actionNochildren = action;
            actionNochildren.payload.children=[];
            const newState=reducer(undefined,actionNochildren);
            console.log(actionNochildren.payload.children.length);
            expect(newState.addNew).toEqual(true);
            expect(newState.scrollBy).toEqual(0);
            expect(newState.reload).toEqual(false);
        });


        it('Test No data loaded , addKnew should be true', ()=>{            
            state.items = [];
            state.addNew= false;
            state.scrollBy=10;
            

            const actionNochildren = action;
            actionNochildren.payload.children=[];
            const newState=reducer(undefined,actionNochildren);
            console.log(actionNochildren.payload.children.length);
            expect(newState.addNew).toEqual(true);
            expect(newState.scrollBy).toEqual(0);
            expect(newState.reload).toEqual(false);
        });

    
    });


