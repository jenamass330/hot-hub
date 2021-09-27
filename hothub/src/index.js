import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider} from "@auth0/auth0-react"

ReactDOM.render(
  <Auth0Provider
  domain="dev-xf5xd66u.us.auth0.com"
  clientID="N1L5ybIv2MbfKrgqMFIULKD23biKql12"
  redirectUri={window.location.origin}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>,
  document.getElementById('root')
);