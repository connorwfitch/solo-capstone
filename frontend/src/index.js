// External modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Internal modules
import './index.css';
import './css/button.css';
import './css/form.css';
import './css/auth.css';
import './css/modalForm.css';
import App from './App';
import { ModalProvider } from "./context/Modal"
import configureStore from './store';
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

// Configure store
const store = configureStore();

// Protection when in production
if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);