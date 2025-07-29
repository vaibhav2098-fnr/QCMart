import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Icons } from '../../../assets/qcIcons/qcIcons';
import { IMG } from '../../../assets/qcImages/qxImages';
import { styles } from './home-header-styles';

const HomeHeader = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image source={Icons['fi-rr-align-left']} style={styles.icon} />
            </TouchableOpacity>

            <Image source={IMG['QC-mart-logo']} style={styles.logo} />

            <View style={styles.rightIcons}>
                <TouchableOpacity>
                    <Image source={Icons['fi-rr-bell']} style={[styles.icon, styles.marginRight]} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={Icons['fi-rr-shopping-bag']} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;
