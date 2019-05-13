import moxios from 'moxios';
import {testStore,testStore_withpage0Top} from './utils';
import {initialState} from '../actions/types';
import {fetchCategories,fetchLastFeed,fetchData} from '../actions/action';


describe ('Fetch Action integration test',()=>{


    beforeEach(()=>{
        moxios.install();
    });

    afterEach(()=>{
        moxios.uninstall();
    });


    test('load categories -store is updated' , () =>{
        const children = ['A','B','F'];
        const expextedState=initialState;
        expextedState.categories=children;

            const store = testStore();
            moxios.wait(()=>{
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status:200,
                    response:{data:{children:children}
                    }
                });
            })

            return store.dispatch(fetchCategories())
            .then(()=>{
                const newState = store.getState();
                expect(newState.categories).toBe(children);
                expect(newState.availableMore).toBe(false);
            });

    });



    test('fetchLastFeed  -store is updated' , () =>{
        const children = [{data:{name:"A"}}];
        const expextedState=initialState;

            const store = testStore();
            moxios.wait(()=>{
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status:200,
                    response:{data:{children:children}
                    }
                });
            })

            return store.dispatch(fetchLastFeed())
            .then(()=>{
                const newState = store.getState();
                expect(newState.availableMore).toBe(false);
            });

    });


//fetch data
test('fetch data -store is updated - lengh loaded is less thatn 25' , () =>{
    const children = [{data:{name:"A"}},{data:{name:"B"}}];
        const store = testStore();
        moxios.wait(()=>{
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response:{data:{children:[{data:{name:"A"}},{data:{name:"B"}}]},after:"B"
                }
            });
        })

        return store.dispatch(fetchData())
        .then(()=>{
            const newState = store.getState();
            expect(newState.items.length).toBe(0);
        });

});


//fetch data
test('fetch data -store is updated - lengh loaded is less thatn 25' , () =>{
    const children = 
    [{data:{id:0,name:"FirstChild"}},{data:{id:1}},{data:{id:2}},{data:{id:3}},
        {data:{id:4}},{data:{id:5}},{data:{id:6}},{data:{id:7}},
        {data:{id:8}},{data:{id:9}},{data:{id:10}},{data:{id:11}},{data:{id:12}},
        {data:{id:13}},{data:{id:14}},{data:{id:15}},{data:{id:16}},{data:{id:17}},
        {data:{id:18}},{data:{id:19}},{data:{id:20}},{data:{id:21}},{data:{id:22}},
        {data:{id:23}},{data:{id:24}}];
        const store = testStore();
        moxios.wait(()=>{
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response:{data:{children:children},after:"B"
                }
            });
        })

        return store.dispatch(fetchData())
        .then(()=>{
            const newState = store.getState();
            expect(newState.items.length).toBe(25);
            expect(newState.before).toBe('FirstChild');
        });

});



});
