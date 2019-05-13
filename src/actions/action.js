import {types} from './types.js';
import axios from 'axios';

//call reddit api url to get categories list
export const  fetchCategories=() =>async(dispatch)=>
{
    var link = 'https://api.reddit.com/subreddits/popular?limit=100';  
    await axios.get(link)
    .then(res =>{
        dispatch({
            type:types.LOAD_CATEGORIES,//"LOAD_CATEGORIES",
                payload:res.data.data.children     
        })
    })
}




//call reddit api url , to get last data
export const  fetchMoreData=(category,before,limit,top) =>async(dispatch)=>
{
    var link = 'https://api.reddit.com'+category+'new?limit='+(limit+1);//no need count here 
    if(before!=null)
    {
        link = link+'&count='+(limit+1)+'&before='+before;//loadNext <<
    }
    await axios.get(link)
    .then(res =>{
        dispatch({
            type:types.ADD_DATA,//"ADD_DATA",
            payload:res.data.data,            
            top:top,
            page:0    
        })
    })
}



//call reddit api url to get the most recent  25 record 
//call reddit api url to get next . and previouse page's records- if we have before and after
export const  fetchData=(category,before,after,limit,page) =>async(dispatch)=>
{
      
    var link = 'https://api.reddit.com'+category+'new?limit='+limit;//no need count here 

    if(before!=null){
        link = link+'&count='+limit+'&before='+before;//loadNext <<
    }
    if(after!=null){
        link = link+'&count='+limit+'&after='+after;//loadPrevious >>
    }
    await axios.get(link)
    .then(res =>{
        dispatch({
            type:types.SET_DATA,//"SET_DATA",
                payload:res.data.data,            
                page:page,
                category:category   
        })
    })
}



//load if we have any more new record
export const  fetchLastFeed=(category) =>async(dispatch)=>
{
      
    var link = 'https://api.reddit.com'+category+'new?limit='+1;
    await axios.get(link)
    .then(res =>{
        dispatch({
            type:types.SET_AVAILABLE_MORE,//"SET_AVAILABLE_MORE",
            name:res.data.data.children[0].data.name     
        })
    })
}





//update category 
export function categoryChange(category)
{
    return{
        type:"CATEGORY_CHANGE",
        payload : category
    }
}


