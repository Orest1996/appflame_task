import {combineReducers} from 'redux';
import {usersReducer} from './users';

export const reducers = combineReducers({
    users: usersReducer,
});
