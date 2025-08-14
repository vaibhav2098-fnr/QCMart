import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import CustomInput from "../../../components/custom-Input/input-field";
import CustomButton from "../../../components/custom-Button/button";
import { IMG } from "../../../assets/qcImages/qxImages";
import { Icons } from "../../../assets/qcIcons/qcIcons";
import { styles } from "./sign-in-style";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signInDataRequest, signInDataReset } from "../../../redux/reducers/auth-module/sign-in-screen";
import { RootState } from "../../../redux/reducers";

// Define navigation types
type AuthStackParamList = {
  signUp: undefined;
  otp: undefined;
  forgotPassword: undefined;
};

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList | keyof AuthStackParamList) => void;
};

// Validation schema
const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const [isCheck, setIsCheck] = useState(false);

  // Get auth state from Redux
  const { isSignInLoading, isSignInSuccess, isSignInFailure, errorMsg } = useSelector(
    (state: RootState) => state.signInDataReducer
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log("Login form submitted:", values);
      // Dispatch login action
      dispatch(signInDataRequest(values));
    },
  });

  // Handle login response
  useEffect(() => {
    if (isSignInSuccess) {
      Alert.alert("Success", "Login successful!");
      // Navigate to home or next screen
      navigation.navigate('Home');
      // Reset the state
      dispatch(signInDataReset());
    }
    
    if (isSignInFailure && errorMsg) {
      Alert.alert("Error", errorMsg);
      dispatch(signInDataReset());
    }
  }, [isSignInSuccess, isSignInFailure, errorMsg, navigation, dispatch]);

  return (
    <View style={styles.container}>
      <Image source={IMG["QC-mart-logo"]} style={styles.logo} />
      <Text style={styles.heading}>Login to your account</Text>

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
      <CustomInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        customPlaceholder="Password"
        onFocus={() => formik.setFieldTouched("password", false)}
        errorMessage={formik.errors.password}
        isShowError={formik.touched.password && formik.errors.password}
      />
      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => setIsCheck(prev => !prev)} style={styles.checkboxWrapper}>
          <View style={styles.checkbox}>
            {isCheck && (
              <Image
                source={Icons["fi-rr-check"]}
                style={styles.checkIcon}
              />
            )}
          </View>
          <Text style={styles.rememberMeText}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <CustomButton 
        title={isSignInLoading ? "Signing In..." : "Sign In"} 
        onPress={formik.handleSubmit}
        disabled={isSignInLoading}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text onPress={() => navigation.navigate('signUp')} style={styles.signUpText}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
