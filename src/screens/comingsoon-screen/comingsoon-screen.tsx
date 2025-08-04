import React from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet } from 'react-native';
import { moderateScale } from '../../utils/deviceConfig';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomButton from '../../components/custom-Button/button';
import { useNavigation } from '@react-navigation/native';

const ComingSoonScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Icons['fi-rr-clock']} style={styles.icon} />
      <Text style={styles.title}>Coming Soon</Text>
      <Text style={styles.subtitle}>
        We’re working hard to bring this feature to you very soon!
      </Text>

      <CustomButton
        title="Go Back"
        onPress={() => navigation.goBack()}
        containerStyle={styles.button}
        textStyle={styles.buttonText}
      />
    </SafeAreaView>
  );
};

export default ComingSoonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: 'contain',
    tintColor: '#001f4d', // navy blue
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#001f4d',
    marginBottom: moderateScale(10),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: moderateScale(30),
  },
  button: {
    paddingHorizontal: moderateScale(32),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(10),
  },
  buttonText: {
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
});
