// External modules
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Internal modules
import './index.css';
import App from './App';
import configureStore from './store';

// Creating root
const reactContainer = document.getElementById('root');
const root = createRoot(reactContainer);

// Configure store
const store = configureStore();

// Protection when in production
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);