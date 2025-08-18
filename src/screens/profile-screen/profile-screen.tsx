import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import * as Yup from 'yup';

import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from '../../assets/qcIcons/qcIcons';
import CustomButton from '../../components/custom-Button/button';
import CustomInput from '../../components/custom-Input/input-field';
import CustomHeader from '../../components/custom-header/custom-header';
import DropdownMenu from '../../components/custom-scrollable-dropdown/custom-scrollable-dropdown.component';
import { RootState } from '../../redux/reducers';
import { profileDataRequest } from '../../redux/reducers/profile';
import { moderateScale } from '../../utils/deviceConfig';
import { styles } from './profile-styles';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid Email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  dob: Yup.string().required('DOB is required'),
  gender: Yup.string().required('Gender is required'),
  location: Yup.string().required('Location is required'),
});

const options = [
  "Male",
  "Female",
  "Other",
];

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(''); // 👈 added
  const { token } = useSelector((state: RootState) => state?.signInDataReducer);
  const { profileData } = useSelector((state: RootState) => state.profileDataReducer);
  const { profile } = profileData

  useEffect(() => {
    dispatch(profileDataRequest({ token: token }))
  }, [dispatch, token])

  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      dob: profile?.dob || '',
      gender: options[0],  //need to add
      location: '',  //need to add
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      dispatch(profileDataRequest({
        token: token,
        name: values.name,
        dob: values.dob,
        phone: values.phone
      }));
    },
  });

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB'); // DD/MM/YYYY
      formik.setFieldValue('dob', formattedDate);
    }
  };

  const pickImage = async () => {
    // Ask for permission (required on iOS & Android 13+)
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You need to allow permission to access photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: !true,
      aspect: [1, 1], // square crop for profile picture
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]); // ✅ update state
    }
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
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage.uri }
                  : Icons['fi-rr-man-head']
              }
              style={selectedImage ? styles.avatarImage : styles.avatarDefaultImage}
            />
          </View>
          <TouchableOpacity style={styles.editBadge} onPress={pickImage}>
            <Image
              source={Icons['fi-rr-edit']}
              style={{
                height: moderateScale(16),
                width: moderateScale(16),
                tintColor: '#fff',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-user']} style={{ height: 20, width: 20 }} />}
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          customPlaceholder="Your name"
          secureTextEntry={false}
          rightIcon={<></>}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={styles.errorText}>{formik.errors.name}</Text>
        )}

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-envelope']} style={{ height: 20, width: 20 }} />}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          customPlaceholder="Your email"
          secureTextEntry={false}
          keyboardType="email-address"
          rightIcon={<></>}
          disabled
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}

        {/* Phone */}
        <Text style={styles.label}>Contact Number</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-phone-call']} style={{ height: 20, width: 20 }} />}
          value={formik.values.phone}
          onChangeText={formik.handleChange('phone')}
          onBlur={formik.handleBlur('phone')}
          customPlaceholder="Phone number"
          secureTextEntry={false}
          keyboardType="phone-pad"
          rightIcon={<></>}
        />
        {formik.touched.phone && formik.errors.phone && (
          <Text style={styles.errorText}>{formik.errors.phone}</Text>
        )}

        {/* DOB with calendar */}
        <Text style={styles.label}>DOB</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <CustomInput
            leftIcon={<Image source={Icons['fi-rr-calendar']} style={{ height: 20, width: 20 }} />}
            value={formik.values.dob}
            onChangeText={() => { }} // disable manual input
            editable={false}
            customPlaceholder="DD/MM/YYYY"
            secureTextEntry={false}
            rightIcon={<></>}
          />
        </TouchableOpacity>
        {formik.touched.dob && formik.errors.dob && (
          <Text style={styles.errorText}>{formik.errors.dob}</Text>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={formik.values.dob ? new Date(formik.values.dob) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
            maximumDate={new Date()} // No future dates
          />
        )}

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <DropdownMenu
          options={options}
          onSelect={(selectedItem: string, index: number) => {
            formik.setFieldValue('gender', selectedItem)
          }}
          placeHolder='select options'
          placeHolderStyle={{ color: 'red' }}
          renderButton={(buttonRef, toggleMenu) => {
            return (
              <TouchableOpacity style={[$button]} ref={buttonRef} onPress={toggleMenu}>
                <Text>{formik.values.gender}</Text>
              </TouchableOpacity>
            )
          }}
          renderItem={(setIsMenuOpen: () => any) => {
            return options.map((option, index) => {
              return (<TouchableOpacity
                key={index}
                onPress={() => {
                  setIsMenuOpen()
                  formik.setFieldValue('gender', option)
                }}
                style={[$menuItem(options?.length === index + 1)]}
              >
                <Text style={[$textStyle]}>{option} </Text>
              </TouchableOpacity>)
            })
          }}
          contentStyle={$contentStyle}
        />

        {formik.touched.gender && formik.errors.gender && (
          <Text style={styles.errorText}>{formik.errors.gender}</Text>
        )}

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <CustomInput
          leftIcon={<Image source={Icons['fi-rr-map-marker']} style={{ height: 20, width: 20 }} />}
          value={formik.values.location}
          onChangeText={formik.handleChange('location')}
          onBlur={formik.handleBlur('location')}
          customPlaceholder="Your address"
          secureTextEntry={false}
          rightIcon={<></>}
        />
        {formik.touched.location && formik.errors.location && (
          <Text style={styles.errorText}>{formik.errors.location}</Text>
        )}

        {/* Submit button */}
      </ScrollView>
      <View style={styles.footer}>
        <CustomButton
          title="Update"
          onPress={formik.handleSubmit as any}
          containerStyle={styles.updateButton}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const $contentStyle: ViewStyle = {
  marginTop: moderateScale(-36),
  width: '90%',
  height: moderateScale(230),
  backgroundColor: '#fff',
  borderRadius: moderateScale(12),
  padding: moderateScale(10),

  // iOS shadow
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },

  // Android shadow
  elevation: 6,
}

const $menuItem = (isLast: boolean): ViewStyle => ({
  padding: 12,
  borderBottomWidth: isLast ? 0 : 0.5,
  borderColor: 'gray',
})

const $textStyle: TextStyle = {
  fontSize: moderateScale(16),
  fontWeight: '400',
  color: '#000'
}

const $button: TextStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  paddingHorizontal: moderateScale(12),
  height: moderateScale(50),
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: moderateScale(12),
}