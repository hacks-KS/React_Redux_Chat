import {createStore,  applyMiddleware} from 'redux';
import commentReducer from '../reducers/reducer'
import {createLogger} from 'redux-logger';

//reduxのlogを残してくれるようなstoreの作成

export default function configureStore() {
  const logger = createLogger({logger:console});
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
  const store = createStoreWithMiddleware(commentReducer);
  return store;
}
