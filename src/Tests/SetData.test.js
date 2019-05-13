import React from 'react';
import {shallow,configure} from 'enzyme';
import {types,initialState} from '../actions/types.js'
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../reducers/reducer.js';


configure({ adapter: new Adapter() });


describe("Test reducer load DATA" ,()=>{

    let action ;
    let state ;
    beforeEach(()=>{
        action = {
            type:types.SET_DATA,            
            top:0,
            page:0,
            payload: {
                children:[{
                        data:{
                            id:0,
                            name:"",
                            thumbnail:"",
                            url:"",
                            title:""
    
                        }
                    }
                ],after:""
            }
        },
        state = initialState
    });
    
        it('Test No data loaded , addKnew should be true', ()=>{            
            state.items = [];
            state.addNew= true;
            state.reducer=false;
            const actionNochildren = action;
            actionNochildren.payload.children=[];
            const newState=reducer(undefined,actionNochildren);
            expect(newState.addNew).toEqual(false);
            expect(newState.page).toEqual(0);
            expect(newState.reload).toEqual(true);
        });


        it('Test data new items', ()=>{            
            state.items = [];
            const actionchildren = action;
            actionchildren.payload.children =  [{data:{id:0,name:"A"}},{data:{id:1}},{data:{id:2}},{data:{id:3}},
                    {data:{id:4}},{data:{id:5}},{data:{id:6}},{data:{id:7}},
                    {data:{id:8}},{data:{id:9}},{data:{id:10}},{data:{id:11}},{data:{id:12}},
                    {data:{id:13}},{data:{id:14}},{data:{id:15}},{data:{id:16}},{data:{id:17}},
                    {data:{id:18}},{data:{id:19}},{data:{id:20}},{data:{id:21}},{data:{id:22}},
                    {data:{id:23}},{data:{id:24}}];
            
        
            const newState=reducer(undefined,actionchildren);
           
            expect(newState.items.length).toEqual(25);
            expect(newState.page0Top).toEqual("A");
            expect(newState.reload).toEqual(false);
        });

       



    
    });


