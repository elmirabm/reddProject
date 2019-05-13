
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Styles/App.css';
import Moment from 'react-moment';


export const Subreddit  =(props) =>
{   
    
    return(
    
    <div id="subreddit" class="container sub vertical-align: bottom border">  
              
              <div class="row">
                <div class="col-2">
                    <img  src={props.data.thumbnail} alt="new"  style={{width: '100px', height: '100px'}}/> 

                </div>
                <div className="col-10">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <a href={props.data.url} class="badge badge-light">{(props.data.url.length>30)?(props.data.url.slice(0, 29)+"..."):props.data.url}</a>
                            </div>
                        </div>
                   
                        <div class="row titlerow">
                            <div class="col-12 align-self-center">
                                <h6>
                                <a href={"https://www.reddit.com/"+props.data.permalink} class=" badge-light">
                                {(props.data.title.length>200)?(props.data.title.slice(0, 199)+"..."):props.data.title}
                                </a>
                                </h6>
                            </div>
                        </div>
                

                        <div class="row">
                            <div class="col-6 ">
                                <a href={"https://www.reddit.com//user/"+props.data.author} class="badge-light"> 
                                <img  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGHrHb3o7rXscb1kSKDGeSKYjLf3DUnCr8C_ycH_xCE4ijdAdz8w"} alt="new"  style={{width: '15px', height: '15 px'}}/> 
                            
                                {props.data.author}</a>
                            </div>
                            <div class="col-2 ">
                            
                                <a href={"https://www.reddit.com//r/"+props.category+"/comments/"+props.data.id} class="badge badge-light">
                                <img  src={"https://png.pngtree.com/svg/20170608/ba314d7b9e.svg"} alt="new"  style={{width: '15px', height: '15 px'}}/> 
                                Comments</a> 
                            </div>            
                            <div class="col-4 ">
                            <img  src={"https://cdn2.iconfinder.com/data/icons/pittogrammi/142/10-512.png"} alt="new"  style={{width: '15px', height: '15 px'}}/> 
                                <Moment unix tz="Canada/Eastern" format="MMMM Do YYYY, h:mm:ss a" class="badge badge-light">{props.data.created_utc}</Moment>
                            </div>
                        </div>
                    </div>

                </div>
                

            </div>
            
        
    </div>
  
    );        
}