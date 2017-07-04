import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Container from './containers/container';
import configureStore from './store/store';

//index.htmlの<div id>に関するものの定義(今回は content のみ)

const store = configureStore();
const contentEl = document.getElementById('content');

ReactDOM.render(
    <Provider store={store}>
        <Container />
    </Provider>,
    contentEl
);
