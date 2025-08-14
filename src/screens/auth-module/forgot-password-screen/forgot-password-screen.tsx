import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import CustomInput from "../../../components/custom-Input/input-field";
import CustomButton from "../../../components/custom-Button/button";
import { IMG } from "../../../assets/qcImages/qxImages";
import { Icons } from "../../../assets/qcIcons/qcIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordDataRequest, forgotPasswordDataReset } from "../../../redux/reducers/auth-module/forgot-password";
import { RootState } from "../../../redux/reducers";
import { styles } from "./forgot-password-styles";

// Define navigation types
type AuthStackParamList = {
  login: undefined;
};

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof AuthStackParamList | keyof RootStackParamList) => void;
  goBack: () => void;
};

// Validation schema
const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { isForgotPasswordLoading, isForgotPasswordSuccess, isForgotPasswordFailure, errorMsg } = useSelector(
    (state: RootState) => state.forgotPasswordDataReducer
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => {
      console.log("Forgot Password form submitted:", values);
      // Dispatch forgot password action
      dispatch(forgotPasswordDataRequest(values));
    },
  });

  // Handle forgot password response
  useEffect(() => {
    if (isForgotPasswordSuccess) {
      Alert.alert(
        "Success", 
        "Password reset link has been sent to your email address. Please check your inbox and follow the instructions to reset your password.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate('login');
              dispatch(forgotPasswordDataReset());
            }
          }
        ]
      );
    }
    
    if (isForgotPasswordFailure && errorMsg) {
      Alert.alert("Error", errorMsg);
      dispatch(forgotPasswordDataReset());
    }
  }, [isForgotPasswordSuccess, isForgotPasswordFailure, errorMsg, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={Icons["fi-rr-angle-left"]} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <Text style={styles.headerTitle}></Text>
      </View>

      <Image source={IMG["QC-mart-logo"]} style={styles.logo} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Reset your password</Text>
        <Text style={styles.subHeading}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <CustomInput
          leftIcon={
            <Image
              source={Icons["fi-rr-envelope"]}
              style={styles.iconImage}
            />
          }
          enableToggleVisibility={false}
          secureTextEntry={false}
          rightIcon
          placeholder="Email"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          customPlaceholder="Email"
          onFocus={() => formik.setFieldTouched("email", false)}
          errorMessage={formik.errors.email}
          isShowError={formik.touched.email && formik.errors.email}
        />

        <CustomButton 
          title={isForgotPasswordLoading ? "Sending..." : "Send Reset Link"} 
          onPress={formik.handleSubmit}
          disabled={isForgotPasswordLoading}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Remember your password?{" "}
            <Text onPress={() => navigation.navigate('login')} style={styles.signInText}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
