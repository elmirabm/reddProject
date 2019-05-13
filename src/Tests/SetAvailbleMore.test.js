import React from 'react';
import {shallow,configure} from 'enzyme';
import {types,initialState} from '../actions/types.js'
import Pagination from '../Components/Pagination.js'
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../reducers/reducer.js';


configure({ adapter: new Adapter() });

describe("Test reducer Set Available More" ,()=>{

    describe("reducer Set Available More" ,()=>{
        it('should return default state', ()=>{
            const newState= reducer(undefined,{});
            expect(newState).toEqual(initialState);
        });
    
        it('should return same  state_NOTopSet', ()=>{
            const newState= reducer(undefined,{
                type:types.SET_AVAILABLE_MORE,
                name:"newTop"
            });
            expect(newState).toEqual(initialState);
        });

        it('should return false - different top record', ()=>{
            const state = initialState;
            state.page0Top = "A";
            const newState= reducer(undefined,{
                type:types.SET_AVAILABLE_MORE,
                name:"B"
            });
            expect(newState.availableMore).toEqual(true);
        });

        it('should return false - same top record', ()=>{
            const state = initialState;
            state.page0Top = "A";
            const newState= reducer(undefined,{
                type:types.SET_AVAILABLE_MORE,
                name:"A"
            });
            expect(newState.availableMore).toEqual(false);
        });

    
    });

        /////
        
       /* describe("Test reducer Set Available UI check" ,()=>{

            const setUp = (props={
                callFirstPage:()=>{},
                callNextPage:()=>{},
                callPreviousPage:()=>{}
            })=>{
                const component = shallow(<Pagination {...props}/>);
                return component;
            }


            it('should see the button', ()=>{
                
                let component= setUp(); 
                const state = initialState;
                state.page0Top = "A";
                const newState= reducer(undefined,{
                    type:types.SET_AVAILABLE_MORE,
                    name:"B"
                });
                expect(newState.availableMore).toEqual(false);
                const wrapper = component.find(`.page-item`);
                console.log(component);
                expect(wrapper.length).toBe(1);

            
            });


        })*/




    })
