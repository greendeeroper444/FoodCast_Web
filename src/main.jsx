import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './redux/Store.js';
import './App.css';

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
