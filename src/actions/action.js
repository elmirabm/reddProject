import {types} from './types.js'

//call reddit api url to get categories list
export function loadCategories()
{
    var link = 'https://api.reddit.com/subreddits/popular?limit=100';  
    return dispatch=>{
        fetch(link)
          .then(res =>res.json()).then(json=>{
            dispatch({
                type:types.LOAD_CATEGORIES,//"LOAD_CATEGORIES",
                payload:json.data.children         
                
            });
          })
    }
}


//call reddit api url , to get last data
export function loadDataAdd(category,before,limit,top)
{
    
    var link = 'https://api.reddit.com'+category+'new?limit='+(limit+1);//no need count here 
    if(before!=null)
    {
        link = link+'&count='+(limit+1)+'&before='+before;//loadNext <<
    }

    return dispatch=>{
        fetch(link)
          .then(res =>res.json()).then(json=>{
            dispatch({
                type:types.ADD_DATA,//"ADD_DATA",
                payload:json.data,            
                top:top,
                page:0
            });
          })
    }
}


//call reddit api url to get the most recent  25 record 
//call reddit api url to get next . and previouse page's records- if we have before and after
export function loadData(category,before,after,limit,page)
{
    
    var link = 'https://api.reddit.com'+category+'new?limit='+limit;//no need count here 

    if(before!=null)
    {
        link = link+'&count='+limit+'&before='+before;//loadNext <<
    }
    if(after!=null)
    {
        link = link+'&count='+limit+'&after='+after;//loadPrevious >>
    }
    return dispatch=>{
        fetch(link)
          .then(res =>res.json()).then(json=>{
            dispatch({
                type:types.SET_DATA,//"SET_DATA",
                payload:json.data,            
                page:page,
                category:category
            });
          })
    }
}
export function loadAvailbleMore(category)
{    
    var link = 'https://api.reddit.com'+category+'new?limit='+1;//no need count here 
    
    return dispatch=>{
        fetch(link)
          .then(res =>res.json()).then(json=>{
            dispatch({
                type:types.SET_AVAILABLE_MORE,//"SET_AVAILABLE_MORE",
                name:json.data.children[0].data.name     
                
            });
          })
    }
}




export function categoryChange(category)
{
    return{
        type:"CATEGORY_CHANGE",
        payload : category
    }
}


