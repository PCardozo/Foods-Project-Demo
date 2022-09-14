import { createStore, applyMiddleware,compose } from 'redux';
import reducer from '../reducers/index'
import thunk from 'redux-thunk'


/*const store = createStore(
    reducer,applyMiddleware(thunk),
    )*/

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
        applyMiddleware(thunk)
      ));    
export default store;