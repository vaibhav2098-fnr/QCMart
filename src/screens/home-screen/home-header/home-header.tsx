import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icons } from '../../../assets/qcIcons/qcIcons';
import { IMG } from '../../../assets/qcImages/qxImages';
import { styles } from './home-header-styles';

const HomeHeader = () => {
    const navigation = useNavigation();

    const openDrawer = () => {
        navigation.navigate('drawer')
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image source={Icons['fi-rr-align-left']} style={styles.icon} />
                </TouchableOpacity>

                <Image source={IMG['QC-mart-logo']} style={styles.logo} />

                <View style={styles.rightIcons}>
                    <TouchableOpacity onPress={() => (navigation as any).navigate('notification')}>
                        <Image source={Icons['fi-rr-bell']} style={[styles.icon, styles.marginRight]} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => (navigation as any).navigate('Cart')}>
                        <Image source={Icons['fi-rr-shopping-bag']} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Custom Drawer */}
            {/* <CustomDrawer isVisible={isDrawerVisible} onClose={closeDrawer} /> */}
        </>
    );
};

export default HomeHeader;
