import React from 'react';
import {shallow,configure} from 'enzyme';
import {types,initialState} from '../actions/types.js'
import Adapter from 'enzyme-adapter-react-16';
import reducer from '../reducers/reducer.js';


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
            state.addNew= false;
            state.scrollBy=10;


            const actionNochildren = action;
            actionNochildren.payload.children=[];
            const newState=reducer(undefined,actionNochildren);
            expect(newState.addNew).toEqual(true);
            expect(newState.scrollBy).toEqual(0);
            expect(newState.reload).toEqual(false);
        });


        it('Test data with one item loaded that is already there , add new should be true', ()=>{            
            state.items = [{data:{id:0}}];
            state.addNew= false;
            state.scrollBy=10;
            const actionchildren = action;           
            const newState=reducer(undefined,actionchildren);
           
            expect(newState.addNew).toEqual(false);
            expect(newState.scrollBy).toEqual(0);
            expect(newState.reload).toEqual(false);
        });

        it('Test data with 2 item loaded, should scroll by 1', ()=>{            
            state.items = [{data:{id:0}}];
            state.addNew= false;
            state.scrollBy=10;
            const actionchildren = action;  
            actionchildren.payload.children = [{data:{id:1,name:"B"}},{data:{id:0,name:"C"}}]     
            actionchildren.payload.after = "C";
            const newState=reducer(undefined,actionchildren);
            
            expect(newState.addNew).toEqual(false);
            expect(newState.items.length).toEqual(2);
            expect(newState.reload).toEqual(false);
            expect(newState.page0Top).toEqual("B");
            expect(newState.scrollBy).toEqual(1);
            expect(newState.after).toEqual("C");
            expect(newState.before).toEqual("B");
        });



        it('Test data with 26 item loaded, should scroll by 7-there is 7  new ', ()=>{            
            state.items = [{data:{id:0}},{data:{id:1}},{data:{id:2}},{data:{id:3}},
                {data:{id:4}},{data:{id:5}},{data:{id:6}},{data:{id:7}},
                {data:{id:8}},{data:{id:9}},{data:{id:10}},{data:{id:11}},{data:{id:12}},
                {data:{id:13}},{data:{id:14}},{data:{id:15}},{data:{id:16}},{data:{id:17}},
                {data:{id:18}},{data:{id:19}},{data:{id:20}},{data:{id:21}},{data:{id:22}},
                {data:{id:23}},{data:{id:24}}];
            state.addNew= false;
            state.scrollBy=10;
            const actionchildren = action;  
            actionchildren.payload.children =  [
                {data:{id:39,name:"B"}},{data:{id:30}},{data:{id:31}},{data:{id:32}},
                {data:{id:33}},{data:{id:34}},{data:{id:35}},
                {data:{id:0}}
                ];     
            actionchildren.payload.after = "C";
            const newState=reducer(undefined,actionchildren);
            
            expect(newState.addNew).toEqual(false);
            expect(newState.items.length).toEqual(25);
            expect(newState.reload).toEqual(false);
            expect(newState.page0Top).toEqual("B");
            expect(newState.scrollBy).toEqual(7);
            expect(newState.after).toEqual("C");
            expect(newState.before).toEqual("B");
            expect(newState.items.filter(c=>c.data.id==24).length).toEqual(0);//to make sure the old records are deleted
            expect(newState.items.filter(c=>c.data.id==19).length).toEqual(0);
            expect(newState.items.filter(c=>c.data.id==18).length).toEqual(0);//last same
            expect(newState.items.filter(c=>c.data.id==17).length).toEqual(1);
            expect(newState.items.filter(c=>c.data.id==39).length).toEqual(1);
        });



        it('Test data with 3 item loaded, should scroll by 2-there is 2 new', ()=>{            
            state.items = [{data:{id:0}},{data:{id:1}},{data:{id:2}},{data:{id:3}},
                {data:{id:4}},{data:{id:5}},{data:{id:6}},{data:{id:7}},
                {data:{id:8}},{data:{id:9}},{data:{id:10}},{data:{id:11}},{data:{id:12}},
                {data:{id:13}},{data:{id:14}},{data:{id:15}},{data:{id:16}},{data:{id:17}},
                {data:{id:18}},{data:{id:19}},{data:{id:20}},{data:{id:21}},{data:{id:22}},
                {data:{id:23}},{data:{id:24}}];
            state.addNew= false;
            state.scrollBy=10;
            const actionchildren = action;  
            actionchildren.payload.children =  [
                {data:{id:39,name:"B"}},{data:{id:30}},
                {data:{id:0}}
                ];     
            actionchildren.payload.after = "C";
            const newState=reducer(undefined,actionchildren);
            
            expect(newState.addNew).toEqual(false);
            expect(newState.items.length).toEqual(25);
            expect(newState.reload).toEqual(false);
            expect(newState.page0Top).toEqual("B");
            expect(newState.scrollBy).toEqual(2);
            expect(newState.after).toEqual("C");
            expect(newState.before).toEqual("B");
            expect(newState.items.filter(c=>c.data.id==24).length).toEqual(0);//to make sure the old records are deleted
            expect(newState.items.filter(c=>c.data.id==23).length).toEqual(0);
            expect(newState.items.filter(c=>c.data.id==22).length).toEqual(1);
            expect(newState.items.filter(c=>c.data.id==21).length).toEqual(1);
            expect(newState.items.filter(c=>c.data.id==39).length).toEqual(1);
            expect(newState.items.filter(c=>c.data.id==30).length).toEqual(1);
        });




        ///test wit top - user is in the middle of page

        it('Test data with 2 item loaded-top is not 0 , should scroll by 1', ()=>{            
            state.items = [{data:{id:0}}];
            state.addNew= false;
            
            const actionchildren = action;  
            actionchildren.payload.children = [{data:{id:1,name:"B"}},{data:{id:0,name:"C"}}]     
            actionchildren.payload.after = "C";
            actionchildren.top = 2;
            const newState=reducer(undefined,actionchildren);
            
            expect(newState.addNew).toEqual(false);
            expect(newState.items.length).toEqual(2);
            expect(newState.reload).toEqual(false);
            expect(newState.page0Top).toEqual("B");
            expect(newState.scrollBy).toEqual(1);
            expect(newState.after).toEqual("C");
            expect(newState.before).toEqual("B");
        });


        it('Test data with 2 item loaded- scroll is down , should scroll by 0-nothing shold be added', ()=>{            
            state.items = [{data:{id:0,name:"A"}},{data:{id:1}},{data:{id:2}},{data:{id:3}},
                {data:{id:4}},{data:{id:5}},{data:{id:6}},{data:{id:7}},
                {data:{id:8}},{data:{id:9}},{data:{id:10}},{data:{id:11}},{data:{id:12}},
                {data:{id:13}},{data:{id:14}},{data:{id:15}},{data:{id:16}},{data:{id:17}},
                {data:{id:18}},{data:{id:19}},{data:{id:20}},{data:{id:21}},{data:{id:22}},
                {data:{id:23}},{data:{id:24}}];
            state.addNew= false;        
            const actionchildren = action;  
            actionchildren.top = 18;//scrollis already low
            actionchildren.payload.children = [{data:{id:25,name:"B"}},{data:{id:0,name:"A"}}]     
            actionchildren.payload.after = "C";
            const newState=reducer(undefined,actionchildren);
            
            expect(newState.addNew).toEqual(false);
            expect(newState.items.length).toEqual(25);
            expect(newState.reload).toEqual(false);
            expect(newState.page0Top).toEqual("A");
            expect(newState.scrollBy).toEqual(0);
            expect(newState.after).toEqual("C");
            expect(newState.before).toEqual("A");
        });



        it('Test data with 26 item loaded, should scroll by 4-there is 7  new -scroll is middle', ()=>{            
            state.items = [{data:{id:0}},{data:{id:1}},{data:{id:2}},{data:{id:3}},
                {data:{id:4}},{data:{id:5}},{data:{id:6}},{data:{id:7}},
                {data:{id:8}},{data:{id:9}},{data:{id:10}},{data:{id:11}},{data:{id:12}},
                {data:{id:13}},{data:{id:14}},{data:{id:15}},{data:{id:16}},{data:{id:17}},
                {data:{id:18}},{data:{id:19}},{data:{id:20}},{data:{id:21}},{data:{id:22}},
                {data:{id:23}},{data:{id:24}}];
            state.addNew= false;
            const actionchildren = action;  
            actionchildren.top = 14;//scroll is is in middle
            actionchildren.payload.children =  [
                {data:{id:39,name:"B"}},{data:{id:30}},{data:{id:31}},{data:{id:32,name:"L"}},
                {data:{id:33}},{data:{id:34}},{data:{id:35}},
                {data:{id:0}}
                ];     
            actionchildren.payload.after = "C";
            const newState=reducer(undefined,actionchildren);
            
            expect(newState.addNew).toEqual(false);
            expect(newState.items.length).toEqual(25);
            expect(newState.reload).toEqual(false);
            expect(newState.page0Top).toEqual("L");
            expect(newState.scrollBy).toEqual(4);
            expect(newState.after).toEqual("C");
           expect(newState.before).toEqual("L");
            expect(newState.items.filter(c=>c.data.id==24).length).toEqual(0);//to make sure the old records are deleted
            expect(newState.items.filter(c=>c.data.id==20).length).toEqual(1);
            expect(newState.items.filter(c=>c.data.id==21).length).toEqual(0);//last same
            expect(newState.items.filter(c=>c.data.id==32).length).toEqual(1);//added - new top
            expect(newState.items.filter(c=>c.data.id==35).length).toEqual(1);//added 
            expect(newState.items.filter(c=>c.data.id==31).length).toEqual(0);//no more room for this
        });



    
    });


