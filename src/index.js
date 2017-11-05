import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import App from './components/App';
import './css/index.css';

const store = createStore(reducers);

const AppWithTheme = () => (
    <MuiThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
);

ReactDOM.render(<AppWithTheme />, document.getElementById('root'));
registerServiceWorker();
