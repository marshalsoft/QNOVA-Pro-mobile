import {createStore, combineReducers} from 'redux';
import AppReducer from './reducer';
const rootReducer = combineReducers({
  Reducer:AppReducer
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
