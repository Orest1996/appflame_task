import React, {useCallback} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {TUser} from '../../../app/API';
import {HIT_SLOP_10} from '../../../app/constants';
import HeartSvg from '../../../assets/svg/heart';
import {ImagePlaceholder} from '../../../components';
import {COMMON_COLORS, COMMON_STYLES} from '../../../styles';

interface IProps {
    item: TUser;
    onRemove: (id: number) => void;
    onLike: (id: number) => void;
    onGoToUserDetails: (id: number) => void;
}

export function UserItem(props: IProps) {
    const {item, onRemove, onGoToUserDetails, onLike} = props;
    const {avatar, name, id, age, liked} = item;

    const handleRemove = useCallback(() => onRemove(item.id), [item, onRemove]);
    const handleLike = useCallback(() => onLike(item.id), [item, onLike]);
    const handleNavigateToUserDetails = useCallback(() => onGoToUserDetails(item.id), [item, onGoToUserDetails]);

    const renderDescription = useCallback(
        () => (
            <View style={styles.text}>
                <Text>id: {id}</Text>
                <Text>Name: {name}</Text>
                <Text>Age: {age}</Text>
            </View>
        ),
        [age, id, name],
    );

    const renderImage = useCallback(
        () => (
            <View style={styles.imageContainer}>
                {avatar ? <Image style={styles.image} source={{uri: avatar}} /> : <ImagePlaceholder />}
            </View>
        ),
        [avatar],
    );

    const renderLikeButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleLike} style={styles.center} hitSlop={HIT_SLOP_10}>
                <HeartSvg color={liked ? COMMON_COLORS.red : COMMON_COLORS.black_transparent} />
            </TouchableOpacity>
        ),
        [handleLike, liked],
    );

    const renderRemoveButton = useCallback(
        () => (
            <TouchableOpacity onPress={handleRemove} style={styles.center}>
                <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
        ),
        [handleRemove],
    );

    const renderBody = useCallback(() => {
        return (
            <TouchableOpacity onPress={handleNavigateToUserDetails} style={styles.body}>
                {renderImage()}
                {renderLikeButton()}
                {renderDescription()}
                {renderRemoveButton()}
            </TouchableOpacity>
        );
    }, [handleNavigateToUserDetails, renderImage, renderLikeButton, renderDescription, renderRemoveButton]);

    const renderContainer = useCallback(() => {
        return <View style={styles.container}>{renderBody()}</View>;
    }, [renderBody]);

    return <View style={styles.root}>{renderContainer()}</View>;
}

const styles = StyleSheet.create({
    root: {
        height: 150,
        width: '100%',
    },
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
    container: {
        ...COMMON_STYLES.ph_1,
        ...COMMON_STYLES.pv_1,
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        ...COMMON_STYLES.ml_1,
        height: 100,
        width: 100,
        borderWidth: 1,
        borderRadius: 16,
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    text: {
        ...COMMON_STYLES.ml_2,
    },
    removeIcon: {
        fontSize: 24,
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
