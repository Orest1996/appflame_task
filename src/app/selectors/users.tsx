import {RootState} from '../store';

export const getUsers = (state: RootState) => state.users.items;
export const getUser = (state: RootState) => state.users.userDetails;
