import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../Styles/App.css';


export const Logo  =(props) =>
{   
    return(
        <div id="logo" className="row" data-test="logoTest">
                <div className="col-4"></div>
                <div className="col-4">
                    <img className="img-thumbnail"  src="https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Reddit_logo_new.svg/250px-Reddit_logo_new.svg.png" /> 
                </div> 
                </div>
        );        
}

