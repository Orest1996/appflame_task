import {createAction} from 'typesafe-actions';

export const removeUser = createAction('REMOVE_USER')<number>();
