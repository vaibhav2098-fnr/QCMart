import { createStore, applyMiddleware } from 'redux';
const createSagaMiddleware = require('redux-saga').default;
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // You can whitelist or blacklist reducers
  whitelist: [''],
  // blacklist: ['someTransientReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  // Create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  
  // Mount it on the Store with persisted reducer
  const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware)
  );

  // Then run the saga
  sagaMiddleware.run(rootSaga);

  // Persist the store
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
