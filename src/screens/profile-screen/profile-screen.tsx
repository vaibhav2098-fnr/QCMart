import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../components/custom-header/custom-header';
import CustomInput from '../../components/custom-Input/input-field';
import CustomButton from '../../components/custom-Button/button';
import { Icons } from '../../assets/qcIcons/qcIcons';
import { styles } from './profile-styles';
import { moderateScale } from '../../utils/deviceConfig';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('Deepak Rathore');
  const [email, setEmail] = useState('Deepakrathore31@gmail.com');
  const [phone, setPhone] = useState('+91-9893981505');
  const [dob, setDob] = useState('31/08/1995');
  const [gender, setGender] = useState('Male');
  const [location, setLocation] = useState('Basant Vihar Colony, Near Satya Sai Sq,...');

  const handleUpdate = () => {
    // Integrate with API when available
    console.log('Update profile', { name, email, phone, dob, gender, location });
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        onBack={() => (navigation as any).goBack()}
        title="Profile"
        isShowSearch={false}
      />
      <View style={styles.headerSpacer} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image source={Icons['fi-rr-man-head']} style={styles.avatarImage} />
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Image source={Icons['fi-rr-edit']} style={{ height: moderateScale(16), width: moderateScale(16), tintColor: '#fff' }} />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Name</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-user']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          value={name}
          onChangeText={setName}
          secureTextEntry={false}
          customPlaceholder="Your name"
          showLockIcon={true}
          enableToggleVisibility={false}
        />

        <Text style={styles.label}>Email</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-envelope']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          value={email}
          onChangeText={setEmail}
          secureTextEntry={false}
          keyboardType="email-address"
          customPlaceholder="Your email"
          showLockIcon={true}
          enableToggleVisibility={false}
        />

        <Text style={styles.label}>Contact Number</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-phone-call']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          value={phone}
          onChangeText={setPhone}
          secureTextEntry={false}
          keyboardType="phone-pad"
          customPlaceholder="Phone number"
          showLockIcon={true}
          enableToggleVisibility={false}
        />

        <Text style={styles.label}>DOB</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-calendar']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          rightIcon={<Image source={Icons['fi-rr-calendar']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          value={dob}
          onChangeText={setDob}
          secureTextEntry={false}
          customPlaceholder="DD/MM/YYYY"
          showLockIcon={true}
          enableToggleVisibility={false}
        />

        <Text style={styles.label}>Gender</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-venus-mars']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          rightIcon={<Image source={Icons['fi-rr-caret-down']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          value={gender}
          onChangeText={setGender}
          secureTextEntry={false}
          customPlaceholder="Gender"
          showLockIcon={true}
          enableToggleVisibility={false}
        />

        <Text style={styles.label}>Location</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-map-marker']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          rightIcon={<Image source={Icons['fi-rr-settings']} style={{ height: moderateScale(20), width: moderateScale(20) }} />}
          value={location}
          onChangeText={setLocation}
          secureTextEntry={false}
          customPlaceholder="Your address"
          showLockIcon={true}
          enableToggleVisibility={false}
        />

        <CustomButton title="Update" onPress={handleUpdate} containerStyle={styles.updateButton} />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;


