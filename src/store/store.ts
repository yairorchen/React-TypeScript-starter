import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { itemReducer } from './reducers/item.reducer'
import { userReducer } from './reducers/user.reducer'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    itemModule: itemReducer,
    userModule: userReducer

})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
