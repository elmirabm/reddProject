export const types ={
    LOAD_CATEGORIES : 'LOAD_CATEGORIES',
    ADD_DATA:'ADD_DATA',
    SET_DATA:'SET_DATA',
    SET_AVAILABLE_MORE:'SET_AVAILABLE_MORE'

}


export const initialState = {
    isLoaded :false,//first time loading
    items:[],//all posts in current page
    category:"/r/All/",//the subredit category on current load
    limit:25, //number of items we load
    intervalTime:60000,//interval reload time
    before:null,//child[0]
    after:null,//last child
    availableMore:false,//if we have more feeds availble that didint fit in current page
    addNew:false,//the Current before/after are expired so we need to load latest data
    page:0,//page we are in =>0 is a page we continue reload unless we are at the buttom of the page/ -1 newer feeds / 1 older feeds
    categories:[],
    scrollBy:0,//how many new record added to the page and we need to scroll
    reload:false,//the before is expired and we need to call page 0 /latest data
    page0Top:""//we keep the newest record loaded , to make sure we know when we have more 
    
  };



