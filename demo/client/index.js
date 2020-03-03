//Essential React and component imports
import React from 'react';
import { render } from 'react-dom';
//Browser router attaches the react component to the corresponding router
//import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'

//Attach the App component to the main element and render
render(
    <App />,
    document.getElementById('main'),
);