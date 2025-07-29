import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { moderateScale } from '../../utils/deviceConfig';
import { IMG } from '../../assets/qcImages/qxImages';


interface NotFoundProps {
    title?: string;
    message?: string;
    keyword?: string;
}

const NotFoundPage: React.FC<NotFoundProps> = ({
    title = 'Not Found',
    message = 'Sorry, the keyword you entered cannot be found. Please check again or search with another keyword.',
    keyword,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.resultTextView}>
                <Text style={styles.resultText}>
                    Results For <Text style={styles.boldText}>"{keyword}"</Text>
                </Text>
                <Text style={styles.countText}>0 Found</Text>

            </View>
            <View style={styles.separator} />

            <Image
                source={IMG['QC-mart-not-found']} // Add your illustration in this path
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{message}</Text>
        </View>
    );
};

export default NotFoundPage




const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(20),
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    },
    resultText: {
        fontSize: moderateScale(18),
        color: '#09090A',
        fontWeight: '500',
    },
    boldText: {
        fontWeight: '600',
    },
    countText: {
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: '#09090A',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: moderateScale(40),
    },
    image: {
        width: moderateScale(260),
        height: moderateScale(260),
        paddingBottom: moderateScale(48),
    },
    title: {
        fontSize: moderateScale(22),
        fontWeight: '700',
        color: '#09090A',
        marginBottom: moderateScale(10),
        paddingTop: moderateScale(48),
    },
    description: {
        textAlign: 'center',
        color: '#9CA3AF',
        fontSize: moderateScale(16),
        lineHeight: moderateScale(20),
    },
    resultTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: moderateScale(30),
        paddingTop: moderateScale(8)
    }
});
