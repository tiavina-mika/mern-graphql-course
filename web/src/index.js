import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-common";
import * as serviceWorker from './serviceWorker';
import Routes from './routes';

const client = new ApolloClient({
    uri: 'http://localhost:4006/graphql',
    request: (operation) => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: { authorization: token ? `Bearer ${token}` : '' }
        })
    },
    resolvers: {},
    connectToDevTools: true
});


const App = () => <Routes />;

ReactDOM.render(
    <ApolloProvider client={client} >
        <App />
    </ApolloProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
