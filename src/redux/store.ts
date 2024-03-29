import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore,
} from 'redux-persist';
import authReducer from './reducers/authReducer';
import {baseApi} from './services/baseApi';
import selectedCompanyReducer from './reducers/selectedCompanyReducer';
import selectedProjectReducer from './reducers/selectedProjectReducer';
import selectedPointReducer from './reducers/selectedPointReducer';

const reducers = combineReducers({
    auth: authReducer,
    selectedCompany: selectedCompanyReducer,
    selectedProject: selectedProjectReducer,
    selectedPoint: selectedPointReducer,
    [baseApi.reducerPath]: baseApi.reducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    blacklist: [baseApi.reducerPath],
    storage,
};

const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
