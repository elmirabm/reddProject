
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Styles/App.css';
import {connect} from "react-redux";
import {fetchCategories,fetchData} from "../actions/action";//limitChange,categoryChange


 class Limit extends React.Component {

  componentDidMount(){
    this.props.fetchCategories();
  }

    render(){
        return(
            <div class="selector">
              
                <div class="row">
                  <div className="col-md-2 col-sm-2">
                    Category:
                  </div>
                  <div className="col-md-10 col-sm-10">
                    <select class="form-control" defaultValue = {this.props.category}  onChange= {(e) => this.props.fetchData(e.target.value,null,null,this.props.limit,0)}>
                    <option value="/r/All/" >All</option>
                    {this.props.categories.map(item=>(
                      <option value={item.data.url} >{item.data.title}</option>
                    ))}
                   

                        
                    </select>
                  </div>
                </div>                
            </div>
        );
}
}



const mapStateToProps = (state)=>{
  return{
   categories:state.reducer.categories,
   category: state.reducer.category,
   limit:state.reducer.limit
  }
};

  
  const mapDispatchToProps = (distpatch)=>{
    return{

      fetchData :(category,before,after,limit,page) =>{
        distpatch(fetchData(category,before,after,limit,page));
      },
      fetchCategories:()=>
      {
        distpatch(fetchCategories());
      }
    }
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(Limit);


 /*  
 <option value="All" selected>All</option>
                        <option value="News">News</option>
                        <option value="Funny">Funny</option>
                        <option value="Science">Science</option>
                        <option value="AskReddit">AskReddit</option>
 
 <div class="row">
                 <div className="col-md-2 col-sm-2">
                    Number in page:
                  </div>
                  <div className="col-md-10 col-sm-10">
                    <select class="form-control" defaultValue = {this.props.limit}  onChange= {(e) => this.props.fetchData(this.props.category,null,null,e.target.value,0,false)}>
                        <option value="3" >3</option>
                        <option value="25" selected >25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                  </div>
                </div> */

      //limitChange :(limit) =>{
       // distpatch(limitChange(limit));
      //},
      //categoryChange :(category) =>{
      //  distpatch(categoryChange(category));
      //},