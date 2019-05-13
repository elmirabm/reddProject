import React from 'react';
import {shallow,configure} from 'enzyme';
import {types,initialState} from '../actions/types.js'
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../reducers/reducer.js';


configure({ adapter: new Adapter() });

describe("Test LOAD_CATEGORIES" ,()=>{

    
       

        it('should pass change the availble more', ()=>{
            const state = initialState;
            state.availableMore = true;
            const newState= reducer(undefined,{
                type:types.LOAD_CATEGORIES,
                payload:[]
            });
            expect(newState.availableMore).toEqual(false);
            expect(newState.categories).toEqual([]);
        });

       
        it('should pass change the list', ()=>{
            const state = initialState;           
            const newState= reducer(undefined,{
                type:types.LOAD_CATEGORIES,
                payload:["A","B","C"]
            });
            expect(newState.availableMore).toEqual(false);
            expect(newState.categories).toEqual(["A","B","C"]);
        });

    })
