import React from 'react';
import {render} from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
import {Provider} from "react-redux";



render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);
serviceWorker.unregister();



