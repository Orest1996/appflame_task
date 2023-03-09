import {ActionType, createReducer} from 'typesafe-actions';
import {removeUser, toggleLikeUser} from '../actions/users';
import {TUser} from '../API';
import {fetchUserAsync, fetchUsersAsync} from '../asyncActions/users';

export type TStatus = 'idle' | 'loading';

type TUsersState = {
    items: TUser[];
    itemsLength: number;
    usersStatus: TStatus;
    userDetailsStatus: TStatus;
    userDetails: TUser | null;
};

const initialState: TUsersState = {
    items: [],
    itemsLength: 0,
    usersStatus: 'idle',
    userDetailsStatus: 'idle',
    userDetails: null,
};

export type TUsersActions = ActionType<
    | typeof removeUser
    | typeof toggleLikeUser
    | typeof fetchUsersAsync.request
    | typeof fetchUsersAsync.success
    | typeof fetchUserAsync.request
    | typeof fetchUserAsync.success
>;

export const usersReducer = createReducer<TUsersState, TUsersActions>(initialState)
    .handleAction(removeUser, (state, action) => {
        const newItems = state.items.filter(item => item.id !== action.payload);
        return {...state, items: newItems, itemsLength: newItems.length};
    })
    .handleAction(toggleLikeUser, (state, action) => {
        const newItems = state.items.map(item => (item.id !== action.payload ? item : {...item, liked: !item.liked}));

        const isUserDetailsEffected = state.userDetails && state.userDetails?.id === action.payload;
        const userDetails = isUserDetailsEffected
            ? {...state.userDetails, liked: !state.userDetails?.liked}
            : state.userDetails;

        return {
            ...state,
            items: newItems,
            userDetails: userDetails as TUser,
        };
    })
    //
    .handleAction(fetchUsersAsync.request, state => ({...state, usersStatus: 'loading'}))
    .handleAction(fetchUsersAsync.success, (state, action) => ({
        ...state,
        usersStatus: 'idle',
        items: action.payload.users,
        itemsLength: action.payload.length,
    }))
    //
    .handleAction(fetchUserAsync.request, state => ({...state, userDetailsStatus: 'loading'}))
    .handleAction(fetchUserAsync.success, (state, action) => ({
        ...state,
        userDetailsStatus: 'idle',
        userDetails: action.payload
            ? {...action.payload, liked: state.items.find(user => user.id === action.payload?.id)?.liked}
            : action.payload,
    }));
