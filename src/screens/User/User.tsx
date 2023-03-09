import React, {useCallback, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {toggleLikeUser} from '../../app/actions/users';

import {TUser} from '../../app/API';
import {fetchUserThunk} from '../../app/asyncActions/users';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getUser} from '../../app/selectors/users';
import HeartSvg from '../../assets/svg/heart';
import {ImagePlaceholder, Loader} from '../../components';
import {COMMON_COLORS, COMMON_STYLES} from '../../styles';

const AVATAR_SIZE = 240;
const HEART_SIZE = 32;

interface IUser {
    userId: number;
}

const User: NavigationFunctionComponent<IUser> = ({userId}) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.users.userDetailsStatus);
    const userData = useAppSelector(getUser);

    useEffect(() => {
        dispatch(fetchUserThunk(userId));
    }, [dispatch, userId]);

    const handleLikeUser = useCallback(
        (id: number) => {
            dispatch(toggleLikeUser(id));
        },
        [dispatch],
    );

    const renderDescription = useCallback(
        (user: TUser) => (
            <View style={styles.text}>
                <Text numberOfLines={1}>id: {user.id}</Text>
                <Text>Name: {user.name}</Text>
                <Text numberOfLines={1}>Age: {user.age}</Text>
            </View>
        ),
        [],
    );

    const renderImage = useCallback(
        (user: TUser) => (
            <View style={styles.imageContainer}>
                {user.avatar ? <Image style={styles.image} source={{uri: user.avatar}} /> : <ImagePlaceholder />}
                <TouchableOpacity onPress={() => handleLikeUser(user.id)} style={styles.likeBtn}>
                    <HeartSvg
                        color={user.liked ? COMMON_COLORS.red : COMMON_COLORS.black_transparent}
                        size={HEART_SIZE}
                    />
                </TouchableOpacity>
            </View>
        ),
        [handleLikeUser],
    );

    if (status === 'loading') {
        return <Loader />;
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                {userData ? (
                    <>
                        {renderImage(userData)}
                        {renderDescription(userData)}
                    </>
                ) : (
                    <Text>User by provided ID: {userId} is not found</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
        ...COMMON_STYLES.pv_2,
        ...COMMON_STYLES.ph_1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
    },
    safeAreaView: {
        flex: 1,
    },
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        position: 'relative',
        height: AVATAR_SIZE,
        width: AVATAR_SIZE,
        borderWidth: 1,
        borderRadius: 16,
    },
    likeBtn: {
        position: 'absolute',
        bottom: -(HEART_SIZE / 2),
        left: 0,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
        flexShrink: 1,
    },
});

export default User;
