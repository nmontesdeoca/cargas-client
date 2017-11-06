import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import App from './components/App';
import './css/index.css';

const store = createStore(reducers);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
