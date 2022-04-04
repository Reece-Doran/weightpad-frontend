import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material/';
import { theme } from "./config/theme/theme"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

ReactDOM.render(
  
  <React.StrictMode>
    {/* <div>
    <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
  </div> */}
    <ThemeProvider theme={theme}>
      <Provider store = {store}>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
          <App />
        </PersistGate>  
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
