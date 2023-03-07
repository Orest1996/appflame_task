import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../store';

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
