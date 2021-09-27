import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider} from "@auth0/auth0-react"

const clientID = 'N1L5ybIv2MbfKrgqMFIULKD23biKql12'

ReactDOM.render(
  // <React.StrictMode>
  <Auth0Provider
  domain="dev-xf5xd66u.us.auth0.com"
  clientID = {clientID}
  redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);