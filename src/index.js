import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import SubPage from './components/SubPage';
//import { Provider } from 'react-redux';
//import { store } from './redux/config/configStore';
//import axios from 'axios';
// import Youtube from './service/youtube';
// const httpClient = axios.create({
//   baseURL: 'https://www.googleapis.com.youtube/v3',
//   params: { key: process.env.DEVELOPER_KEY }
// });
// const youtube = new Youtube(httpClient);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<Provider>
  <App />
  //</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
