import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Spinner } from './components/common';
import theme from './theme';

const client = new ApolloClient({
  uri: 'http://localhost:5050/graphql', //todo: get from env
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
