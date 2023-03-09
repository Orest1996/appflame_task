import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {removeUser, toggleLikeUser} from '../../../app/actions/users';
import {TUser} from '../../../app/API';
import {fetchUsersThunk} from '../../../app/asyncActions/users';
import {DEFAULT_USERS_LIMIT} from '../../../app/constants';
import {useAppDispatch, useAppSelector, useUsersListData} from '../../../app/hooks';

import {COMMON_STYLES} from '../../../styles';

import FindInput from './FindInput';
import {Loader} from '../../../components';
import Pagination from './Pagination';
import {UserItem} from './UserItem';

interface IUsersList {
    componentId: string;
}

const UsersList = ({componentId}: IUsersList) => {
    const [filter, setFilter] = React.useState('');
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const cursor = (currentPage - 1) * DEFAULT_USERS_LIMIT;

    const dataProps = useMemo(() => ({cursor, filter}), [cursor, filter]);
    const {users, usersLength} = useUsersListData(dataProps);
    const status = useAppSelector(state => state.users.usersStatus);
    console.log('home status', status);

    useEffect(() => {
        dispatch(fetchUsersThunk());
    }, [dispatch]);

    const handleChangePage = useCallback((page: number) => setCurrentPage(page), []);

    const handleRemoveUser = useCallback(
        (id: number) => {
            dispatch(removeUser(id));
        },
        [dispatch],
    );

    const handleLikeUser = useCallback(
        (id: number) => {
            dispatch(toggleLikeUser(id));
        },
        [dispatch],
    );

    const handleFindChange = useCallback((text: string) => {
        setFilter(text);
    }, []);

    const handleNavigateToUserDetails = useCallback(
        (userId: number) => {
            Navigation.push<{userId: number}>(componentId, {
                component: {
                    name: 'User',
                    passProps: {
                        userId,
                    },
                },
            });
        },
        [componentId],
    );

    const renderItem = useCallback(
        (item: TUser) => (
            <View key={item.id} style={styles.itemWrapper}>
                <UserItem
                    onRemove={handleRemoveUser}
                    onGoToUserDetails={handleNavigateToUserDetails}
                    onLike={handleLikeUser}
                    item={item}
                />
            </View>
        ),
        [handleRemoveUser, handleNavigateToUserDetails, handleLikeUser],
    );

    return (
        <View style={styles.root}>
            <View style={styles.headerContainer}>
                <FindInput value={filter} onChangeText={handleFindChange} />
            </View>
            <View style={styles.root}>
                {status === 'loading' ? (
                    <Loader />
                ) : (
                    // key is used as lazy implementation of scroll to top
                    <ScrollView key={cursor} style={styles.scroll} contentContainerStyle={styles.scrollContainer}>
                        {users.map(renderItem)}
                    </ScrollView>
                )}
            </View>
            <View style={styles.paginationContainer}>
                <Pagination itemsLength={usersLength} onPressPage={handleChangePage} currentPage={currentPage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {flex: 1},
    paginationContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    headerContainer: {
        ...COMMON_STYLES.mt_1,
        ...COMMON_STYLES.mh_2,
        ...COMMON_STYLES.pb_1,
    },
    scroll: {
        ...COMMON_STYLES.mh_1,
    },
    scrollContainer: {
        flexGrow: 1,
        ...COMMON_STYLES.pb_4,
    },
    itemWrapper: {
        ...COMMON_STYLES.mt_2,
    },
});

export default UsersList;
