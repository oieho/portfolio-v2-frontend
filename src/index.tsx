import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, BrowserRouter } from 'react-router-dom';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reportWebVitals from './reportWebVitals';
import { setAccessToken, checkMyInfo } from './modules/auth';
import client from './lib/api/client';
import Cookies from 'js-cookie';
import * as api from './lib/api/auth';
import { HelmetProvider } from 'react-helmet-async';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    // adding the saga middleware here
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});
const useAppDispatch = () => store.dispatch;

function loadUser() {
  try {
    const savedToken = Cookies.get('accessToken');
    const savedRefreshToken = Cookies.get('refreshToken');
    client.defaults.headers.common.authorization = `Bearer ${savedToken}`;
    client.defaults.headers.common.refreshauthorization = `Bearer ${savedRefreshToken}`;

    store.dispatch(checkMyInfo());
    api.refresh();
    if (!savedToken) {
      return null;
    }

    store.dispatch(setAccessToken(savedToken));
  } catch (e) {
    console.log(e);
  }
}
loadUser();
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { useAppDispatch };
