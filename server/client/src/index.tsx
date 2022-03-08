import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import store from './Redux/store/store';

import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
