
import React,{Component} from 'react';
import {connect} from "react-redux";
import {fetchCategories,fetchData} from "../actions/action";

class Pagination extends React.Component {

    render(){
    return(
        <div class="d-flex justify-content-around">
            <nav aria-label="Page navigation">
                <ul class="pagination">
                <li class={(this.props.availableMore)?"page-item":"page-item invisible"}>
                    <a class="page-link"  onClick={()=>this.callFirstPage()} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        Most Recent
                    </a>
                </li>
                <li class={(this.props.before!=null)?"page-item":"page-item disabled"}>
                    <a class="page-link" onClick={()=>this.callPreviousPage()} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    Previous
                    </a>
                </li>
                
                <li class="page-item">
                    <a class="page-link" onClick={()=>this.callNextPage()} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    Next
                    </a>
                </li>
                </ul>
            </nav>
        </div>
    );
    }
    callPreviousPage(){
        this.props.fetchData(this.props.category,this.props.before,null,this.props.limit,-1);
        window.scrollTo(0,0);
     }
   
     callNextPage(){
      this.props.fetchData(this.props.category,null,this.props.after,this.props.limit,1);
      window.scrollTo(0,0);
     } 

     callFirstPage(){
        this.props.fetchData(this.props.category,null,null,this.props.limit,0);
        window.scrollTo(0,0);
      }

}


const mapStateToProps = (state)=>{
    return{
        availableMore :state.reducer.availableMore,
        limit :state.reducer.limit,
        before:state.reducer.before,
        after:state.reducer.after,
        category:state.reducer.category
        
    }
  };
  
    
    const mapDispatchToProps = (distpatch)=>{
      return{
        fetchData :(category,before,after,limit,page) =>{
            distpatch(fetchData(category,before,after,limit,page));
          }
      }
    };
    
  export default connect(mapStateToProps,mapDispatchToProps)(Pagination);