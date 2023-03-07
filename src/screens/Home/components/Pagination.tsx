import React, {useCallback, useMemo} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DEFAULT_USERS_LIMIT} from '../../../app/constants';

interface IProps {
    itemsLength: number;
    onPressPage: (pageNumber: number) => void;
    currentPage?: number;
    limitPerPage?: number;
}

function Pagination(props: IProps) {
    const {itemsLength, onPressPage, currentPage = 0, limitPerPage = DEFAULT_USERS_LIMIT} = props;

    const paginationButtonsLength = useMemo(() => Math.ceil(itemsLength / limitPerPage), [itemsLength, limitPerPage]);

    const handlePressPage = useCallback(
        (page: number) => {
            onPressPage(page);
        },
        [onPressPage],
    );

    const renderButtonElement = useCallback(
        (page: number) => {
            const handlePressPg = () => handlePressPage(page);
            return (
                <TouchableOpacity style={styles.element} key={page} onPress={handlePressPg}>
                    <View>
                        <Text style={[styles.text, currentPage === page ? styles.textActive : {}]}>{page}</Text>
                    </View>
                </TouchableOpacity>
            );
        },
        [currentPage, handlePressPage],
    );
    const renderButtonElements = useCallback(() => {
        const elements = [];
        for (let i = 0; i < paginationButtonsLength; i++) {
            elements.push(renderButtonElement(i + 1));
        }
        return elements;
    }, [paginationButtonsLength, renderButtonElement]);

    return (
        <ScrollView horizontal contentContainerStyle={styles.scrollContentStyle} showsHorizontalScrollIndicator={false}>
            <View style={styles.root}>{renderButtonElements()}</View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContentStyle: {
        flexGrow: 1,
    },
    element: {
        width: 50,
        height: 50,
        borderColor: '#d9adc9',
        borderWidth: 2,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: '#ffffff',
    },
    text: {},
    textActive: {
        color: 'red',
    },
});

export default Pagination;
