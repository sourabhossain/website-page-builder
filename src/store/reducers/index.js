import { combineReducers } from 'redux';

import { dropReducer } from './dropReducer';

export default combineReducers({
    dropElementState: dropReducer,
})
