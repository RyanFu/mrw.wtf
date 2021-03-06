import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";
import devToolsEnhancer from 'remote-redux-devtools';
import reducers from './reducers';
import * as config from '../config';

export default () => {
  let applied = applyMiddleware(thunk);

  if (config.DEBUG) {
    applied = compose(applied, devToolsEnhancer({realtime: true}));
  }

  const store = createStore(reducers, undefined, applied);
  if (!config.DEBUG) {
    persistStore(store, {storage: AsyncStorage});
  }

  return store;
};
