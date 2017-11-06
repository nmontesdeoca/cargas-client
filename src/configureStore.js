import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(reducers, persistedState);

    store.subscribe(
        throttle(() => {
            saveState(store.getState());
        }, 1000)
    );

    return store;
};

export default configureStore;
