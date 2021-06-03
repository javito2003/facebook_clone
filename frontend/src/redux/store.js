import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import apiUserReducer, {getUser} from './apiUserDucks';
import notifReducer, { getNotifications } from './notifDucks';
import userReducer,{getUserLocal} from './userDucks'

const rootReducer = combineReducers({
    user: userReducer,
    notifications: notifReducer,
    userDB: apiUserReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    getUserLocal()(store.dispatch)
    getNotifications()(store.dispatch)
    getUser()(store.dispatch)
    return store
}