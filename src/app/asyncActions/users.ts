import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';
import {createAsyncAction} from 'typesafe-actions';

import {fetchUsers, TUsers} from '../API';
import {RootState} from '../store';

export const fetchUsersAsync = createAsyncAction('FETCH_USERS_REQUEST', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_FAILURE')<
    undefined,
    {users: TUsers; length: number}
>();

export const fetchUsersThunk = (): ThunkAction<void, RootState, unknown, AnyAction> => async dispatch => {
    const response = await fetchUsers();
    dispatch(fetchUsersAsync.success({users: response.data, length: response.length}));
};
