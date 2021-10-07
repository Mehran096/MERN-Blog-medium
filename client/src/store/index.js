import{createStore, applyMiddleware, combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from './reducers/AuthReducer';
import {PostReducer, FetchReducers, FetchReducer, UpdatePostReducer, UpdateImageReducer} from './reducers/PostReducer';
 import { ProfileNameUpdated } from './reducers/ProfileReducer';
const rootReducers = combineReducers({
    AuthReducer,
    PostReducer, 
    FetchReducers,
    FetchReducer,
    UpdatePostReducer,
    UpdateImageReducer,
    ProfileNameUpdated

});

const middleWares = [thunkMiddleware]
const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleWares))
)

export default store;