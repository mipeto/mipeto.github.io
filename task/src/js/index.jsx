'use strict'
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux'; 
import reducers from './reducers';
import App from './components/App.jsx'

const store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.querySelector("#root"));
	
import '../css/reset.css';
import '../css/main.css'; 