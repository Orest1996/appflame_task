import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function Loader() {
    return (
        <View style={styles.root}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Loader;
