import {types,initialState} from '../actions/types';

  const reducer = (state= initialState, action)=>{
    switch(action.type)
    {
        case types.SET_AVAILABLE_MORE:// "SET_AVAILABLE_MORE":
        var setAvailble = false;
            if(state.page0Top!="" && 
                (action.name!=state.page0Top)
            ){
                setAvailble=true;
            }
            state={
                ...state,
                availableMore:setAvailble
            }
        break;
        
        case types.LOAD_CATEGORIES://"LOAD_CATEGORIES":
            state={
                ...state,
                categories:action.payload,
                availableMore:false
            }
        break;
      
        case types.ADD_DATA://"ADD_DATA":
        var newAdded= action.payload.children.filter(i=>state.items.filter(c=>c.data.id===i.data.id).length===0);
        var diff = newAdded.length;// new added
        var scrollBy=0;
        //if 0 loaded : the before is expired - we need to laod again with null before
        if(action.payload.children.length>0){//this is new 
            if(newAdded.length>17){//19
                var A=newAdded.slice((newAdded.length-(25-7-action.top)),newAdded.length);
                var B=state.items.splice(0,25-A.length);
                scrollBy=A.length;
            }
            else {
                var needFormA= ((25-(action.top+7)>newAdded.length)?newAdded.length:(25-(action.top+7)));
                var A=newAdded.slice((newAdded.length-needFormA),newAdded.length);
                var B=state.items.splice(0,25-needFormA);
                scrollBy=A.length;
            }
            var newSet = [...new Set([...A, ...B])];
        
            state={
                ...state,
                items:newSet,
                after:action.payload.after,
                before:newSet[0].data.name,//action.payload.before,
                isLoaded: true,              
                addNew:false,
                doScroll:true,
                availableMore:(diff>A.length),
                page:action.page,
                scrollBy:scrollBy,
                reload:false,
                page0Top:newSet[0].data.name
            }
        }
        else
        {
            state={
                ...state,
                addNew:true,
                scrollBy:0,
                reload:false
            }
        }
        break;
        case types.SET_DATA://"SET_DATA":
       //previous , next call
        if(action.payload.children.length<25)
        {
            state={
                ...state,
                addNew:false,
                page:0,//we are still in page 0 , as we dont have enought data to load
                reload:(action.payload.children.length==0)//this before is expired and we need to relaod
                
            }
        }
        else
        {
            state={
                ...state,
                items:action.payload.children,
                after:action.payload.after,
                before:action.payload.children[0].data.name,//action.payload.before,
                page0Top:action.payload.children[0].data.name,
                isLoaded: true,
                time: state.time+1,
                category:action.category,
                addNew:false,
                doScroll:false,
                page:action.page,
                reload:false
            }
        }
        break;
        default:
            
        break;
    }
   
    return state;//ne state that app will use from now 
    };

 export default reducer ;

