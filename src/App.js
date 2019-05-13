import React from 'react';

import 'moment-timezone';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';
import {Logo} from './Components/Logo.js';
import Pagination from "./Components/Pagination.js";
import {Subreddit} from "./Components/Subreddit.js";
import {connect} from "react-redux";
import {fetchData,fetchMoreData,fetchLastFeed} from "./actions/action";
import Limit from "./Components/Limit.js";


class App extends React.Component {

  interval;
  top;
  before;

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll,true);
    this.callFirstPage();
    this.intervalControl(true);
    this.startIntervalMoreAvailble();
  }

  render(){
    if(!this.props.isLoaded){
      return <div><Logo/> loading ....</div>
    }
    else{
      if(this.props.reload){
        this.callFirstPage()
      }
      if(this.props.addNew){
        this.callMore(null);
      }
      this.setScroll();
      this.calculateBeforeAfter();
      this.intervalControl(this.props.page==0);
        
      return (
        <div className="container">
          <Logo/>          
          <Limit/>
          <Pagination />           
          {this.props.items.map(item =>(
            <Subreddit data={item.data} category={this.props.category}/> 
            ))}           
           <Pagination />          
        </div>
      );
    }
  }

  startInterval(){
    this.interval=setInterval(()=>{
      this.callMore(this.before);
    },this.props.intervalTime);
  }

  startIntervalMoreAvailble(){
    var interval=setInterval(()=>{
      this.props.fetchLastFeed(this.props.category);
    },5000);
  }

  intervalControl(turnOn){// we just turn it on for page 0
    if(turnOn)
    {
     if((this.interval==null) ||(this.interval==undefined)){
       this.startInterval();
     }
    }
    else{
     clearInterval(this.interval);
     this.interval=null;
    }    
  }
  setScroll(){
    if((!this.props.doScroll) || (this.props.scrollBy==0) ){return;}
      window.scrollTo(0, (
        (window.scrollY)
        +((this.props.scrollBy)*140)));
  }

  calculateBeforeAfter()
  {
      var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
     
      var realMax = limit -window.innerHeight;
      var currentTopRecY = (window.scrollY-140)/140;
      this.top=Math.floor(currentTopRecY);
      var down = Math.ceil(currentTopRecY+6);
      if(this.top<0){ 
        this.top=0;
      }

      if(down>23){

        down =24
        this. intervalControl(false);
      }
      else{
        this. intervalControl(this.props.page==0);
      }
      if(this.props.items.length<25){
        return;
      } 
      this.before=this.props.items[this.top+1].data.name;
  }

  handleScroll = () => {
    this.calculateBeforeAfter();
 };
  callFirstPage(){
    this.props.fetchData(this.props.category,null,null,this.props.limit,0);
    window.scrollTo(0,0);
  }

  callMore(before){
    this.props.fetchMoreData(this.props.category,before,this.props.limit,this.top);
  }
 
 
}
const mapStateToProps = (state)=>{
  return{
    isLoaded:state.reducer.isLoaded,
    items:state.reducer.items,
    category:state.reducer.category,
    intervalTime :state.reducer.intervalTime,
    limit :state.reducer.limit,
    before:state.reducer.before,
    after:state.reducer.after,   
    addNew : state.reducer.addNew,
    doScroll:state.reducer.doScroll,
    page:state.reducer.page,
    scrollBy:state.reducer.scrollBy,
    reload:state.reducer.reload

  }
};

const mapDispatchToProps = (distpatch)=>{
  return{
    fetchData :(category,before,after,limit,page) =>{
      distpatch(fetchData(category,before,after,limit,page));
    },
    fetchMoreData:(category,before,limit,top)=>{
      distpatch(fetchMoreData(category,before,limit,top));
    },
    fetchLastFeed:(category)=>{
      distpatch(fetchLastFeed(category));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);





