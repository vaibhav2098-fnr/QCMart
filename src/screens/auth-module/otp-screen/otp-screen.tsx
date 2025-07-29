import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../../components/custom-Button/button';
import OtpInput from '../../../components/custom-OtpInput/otp-Input';
import { IMG } from '../../../assets/qcImages/qxImages';
import { moderateScale } from '../../../utils/deviceConfig';

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .length(4, 'OTP must be 4 digits')
    .required('OTP is required'),
});

const OTPScreen = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [resendCount, setResendCount] = useState(0);

  const formik = useFormik({
    initialValues: { otp: '' },
    validationSchema: otpSchema,
    onSubmit: (values) => {
      console.log('OTP Submitted:', values.otp);
    },
  });

  const handleOtpChange = (otp: string) => {
    formik.setFieldValue('otp', otp);
    if (formik.errors.otp) {
      formik.validateForm();
    }
  };

  const handleResend = () => {
    setResendCount(prev => prev + 1);
    formik.setFieldValue('otp', '');
    formik.setTouched({ otp: false });
    formik.setErrors({});
  };

  const shouldShowError = formik.touched.otp && formik.errors.otp && !isInputFocused;

  return (
    <View style={styles.container}>
      <Image source={IMG['QC-mart-logo']} style={styles.logo} />
      <Text style={styles.heading}>Verification</Text>

      <View style={styles.optionsContainer}>
        <View style={styles.checkboxWrapper}>
          <Text style={styles.rememberMeText}>
            Please enter the OTP sent to{' '}
            <Text style={styles.numberText}>
              +91-9893981505
            </Text>
          </Text>
        </View>
      </View>

      <OtpInput
        length={4}
        onOtpComplete={handleOtpChange}
        timerSeconds={60}
        onResend={handleResend}
        onFocus={() => {
          setIsInputFocused(true);
          formik.setFieldTouched('otp', false);
        }}
        onBlur={() => {
          setIsInputFocused(false);
          formik.setFieldTouched('otp', true);
        }}
      />

      {shouldShowError && <Text style={styles.errorText}>{formik.errors.otp}</Text>}

      <CustomButton
        title="Submit"
        onPress={formik.handleSubmit}
        disabled={formik.values.otp.length !== 4}
        containerStyle={{ marginTop: moderateScale(180) }}
      />
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(16),
  },
  logo: {
    height: moderateScale(104),
    width: moderateScale(176),
    resizeMode: 'contain',
  },
  heading: {
    color: '#041C45',
    fontSize: moderateScale(24),
    fontWeight: '600',
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: moderateScale(25),
    marginBottom: moderateScale(20),
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#041C45',
    fontSize: moderateScale(16),
    fontWeight: '300',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  numberText:{
    color: '#003D68',
    fontSize: moderateScale(16),
    fontWeight: '500',
  }
});
