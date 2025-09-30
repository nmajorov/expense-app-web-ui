import { createBrowserHistory } from 'history';
import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
} from 'redux';
import createRootReducer from '../reducers/index.ts';
import { thunk } from 'npm:redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from 'redux-persist';

// defaults to localStorage for web and AsyncStorage for react-native
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();

declare const window;
const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const persistConfig = {
    key: 'primary',
    storage: storage,
    whitelist: ['loginState'],
};


const configureStore = (preloadedState?: any) => {
    // configure middlewares
    const middlewares = [thunk, routerMiddleware(history)];
    // compose enhancers

    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    // persist reducers
    const persistentReducer = persistReducer(
        persistConfig,
        createRootReducer(history)
    );

    return createStore(persistentReducer, preloadedState, enhancer);
};

// pass an optional param to rehydrate state on app start
export const store = configureStore();
export const persistor = persistStore(store);
