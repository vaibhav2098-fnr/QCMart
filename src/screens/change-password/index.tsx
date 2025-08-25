import CustomButton from '@/src/components/custom-Button/button';
import CustomInput from '@/src/components/custom-Input/input-field';
import CustomPopup from '@/src/components/custom-popup';
import { RootState } from '@/src/redux/reducers';
import { changePasswordDataRequest, changePasswordDataReset } from '@/src/redux/reducers/change-password';
import { moderateScale } from '@/src/utils/deviceConfig';
import { statusBarHeight } from '@/src/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

// ✅ Yup validation schema
const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const ChangePasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { errorMsg, isChangePasswordSuccess, isChangePasswordLoading, changePasswordData } = useSelector((state: RootState) => state.changePasswordDataReducer);
  const { token } = useSelector((state: RootState) => state?.signInDataReducer);

  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // ✅ Formik
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(() => {
          if (token) {
            dispatch(changePasswordDataRequest({ old_password: values.currentPassword, new_password: values.newPassword, token: token }));
          }
          resolve(true);
        }, 2000));

        resetForm();
        setPasswordVisibility({
          currentPassword: false,
          newPassword: false,
          confirmPassword: false,
        });
      } catch (error) {
        console.log('error', error);
      }
    },
  });

  useEffect(() => {
    if (isChangePasswordSuccess) {
      setTimeout(() => {
        navigation.goBack();
        dispatch(changePasswordDataReset())
      }, 2000);
    }
  }, [isChangePasswordSuccess, dispatch]);

  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Password Information</Text>
          <Text style={styles.sectionDescription}>
            Enter your current password and choose a new password to update your account security.
          </Text>

          <CustomInput
            placeholder="Current Password"
            value={formik.values.currentPassword}
            onChangeText={formik.handleChange('currentPassword')}
            onBlur={formik.handleBlur('currentPassword')}
            errorMessage={formik.touched.currentPassword ? formik.errors.currentPassword : ''}
            secureTextEntry={!passwordVisibility.currentPassword}
            rightIcon={
              <Ionicons
                name={!passwordVisibility.currentPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
                onPress={() => togglePasswordVisibility('currentPassword')}
              />
            }
          />

          <CustomInput
            placeholder="New Password"
            value={formik.values.newPassword}
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            errorMessage={formik.touched.newPassword ? formik.errors.newPassword : ''}
            secureTextEntry={!passwordVisibility.newPassword}
            rightIcon={
              <Ionicons
                name={!passwordVisibility.newPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
                onPress={() => togglePasswordVisibility('newPassword')}
              />
            }
          />

          <CustomInput
            placeholder="Confirm New Password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            errorMessage={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
            secureTextEntry={!passwordVisibility.confirmPassword}
            rightIcon={
              <Ionicons
                name={!passwordVisibility.confirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
                onPress={() => togglePasswordVisibility('confirmPassword')}
              />
            }
          />
        </View>

        {/* Password Requirements */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Password Requirements</Text>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#001f4d" />
            <Text style={styles.requirementText}>Minimum 6 characters</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#001f4d" />
            <Text style={styles.requirementText}>New password must be different from current password</Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={16} color="#001f4d" />
            <Text style={styles.requirementText}>Confirm password must match new password</Text>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomSection}>
        <CustomButton
          title={isChangePasswordLoading ? 'Changing Password...' : 'Change Password'}
          onPress={() => formik.handleSubmit()}
        />
      </View>

      {errorMsg ? (
        <CustomPopup
          visible
          type="error"
          message={errorMsg?.toString()}
          position="bottom"
        />
      ) : changePasswordData?.message ? (
        <CustomPopup
          visible
          type="success"
          message={changePasswordData?.message?.toString()}
          position="bottom"
        />
      ) : <></>}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', marginTop: statusBarHeight },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16), paddingVertical: moderateScale(12),
    borderBottomWidth: 1, borderBottomColor: '#E5E5E5',
  },
  backButton: { padding: moderateScale(4) },
  headerTitle: { fontSize: moderateScale(18), color: '#333' },
  headerRight: { width: moderateScale(32) },
  content: { flex: 1, paddingHorizontal: moderateScale(16), paddingTop: moderateScale(20) },
  formSection: { marginBottom: moderateScale(30) },
  sectionTitle: { fontSize: moderateScale(18), color: '#333', marginBottom: moderateScale(12) },
  sectionDescription: { fontSize: moderateScale(14), color: '#666', marginBottom: moderateScale(20), lineHeight: moderateScale(20) },
  infoSection: { marginBottom: moderateScale(30) },
  requirementItem: { flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(8) },
  requirementText: { fontSize: moderateScale(14), color: '#666', marginLeft: moderateScale(8) },
  bottomSection: {
    paddingHorizontal: moderateScale(16), paddingVertical: moderateScale(20),
    borderTopWidth: 1, borderTopColor: '#E5E5E5', backgroundColor: '#FFFFFF',
  },
  changeButton: { backgroundColor: '#25D366', marginTop: moderateScale(12) },
  disabledButton: { backgroundColor: '#CCCCCC', borderWidth: 0 },
  cancelButton: { backgroundColor: '#F5F5F5' },
  cancelButtonText: { color: '#666' },
});

export default ChangePasswordScreen;
