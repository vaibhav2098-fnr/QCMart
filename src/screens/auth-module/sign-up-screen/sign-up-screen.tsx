import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import CustomInput from "../../../components/custom-Input/input-field";
import CustomButton from "../../../components/custom-Button/button";
import { IMG } from "../../../assets/qcImages/qxImages";
import { Icons } from "../../../assets/qcIcons/qcIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "./sign-up-style";
import CustomRadioButton from "../../../components/custom-RadioButton/radio-button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signUpDataRequest, signUpDataReset } from "../../../redux/reducers/auth-module/sign-up-screen";
import { RootState } from "../../../redux/reducers";
import { useState, useEffect } from "react";
import { getFieldValidationError } from "../../../utils/helper";

// Define navigation types
type AuthStackParamList = {
    login: undefined;
    otp: undefined;
};

type NavigationProp = {
    navigate: (screen: keyof AuthStackParamList) => void;
};

// Validation schema
const loginValidationSchema = Yup.object().shape({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    is_vendor: Yup.string().required("User type is required"),
});

const SignUpScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useDispatch();
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [generalError, setGeneralError] = useState('');

    // Get auth state from Redux
    const { isSignUpLoading, isSignUpSuccess, isSignUpFailure, errorMsg, token, validationErrors } = useSelector(
        (state: RootState) => state.signUpDataReducer
    );

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            is_vendor: "0", // Default: Vendor
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            if (!isTermsAccepted) {
                Alert.alert("Error", "Please accept the Terms of Service and Privacy Policy");
                return;
            }
            console.log("Form Submitted:", values);
            // Dispatch sign up action
            dispatch(signUpDataRequest(values));
        },
    });

    // Handle sign up response
    useEffect(() => {
        if (isSignUpSuccess) {
            if (token) {
                // If we have a token, navigate to home/dashboard
                Alert.alert("Success", "Account created successfully! Welcome to QCMart.");
                // The navigation will be handled automatically by the main navigation
                // since the token is now in the store
            } else {
                // If no token, navigate to OTP screen for verification
                Alert.alert("Success", "Account created successfully! Please verify your account.");
                navigation.navigate('otp');
            }
            // Reset the state
            dispatch(signUpDataReset());
        }
    }, [isSignUpSuccess, token, navigation, dispatch]);

    useEffect(() => {
        if (isSignUpFailure && errorMsg) {
            if (validationErrors && Object.keys(validationErrors).length > 0) {
                // Map backend validation errors into Formik
                Object.entries(validationErrors).forEach(([field, message]) => {
                    formik.setFieldError(field, String(message));
                });
            } else if (errorMsg) {
                // Set a general error to display at the top
                setGeneralError(errorMsg);
            }
            dispatch(signUpDataReset());
        }
    }, [isSignUpFailure, errorMsg, dispatch, validationErrors]);

    const handleFocus = (field: keyof typeof formik.values) => {
        formik.setFieldTouched(field, false);
    };

    return (
        <View style={styles.container}>
            <Image source={IMG["QC-mart-logo"]} style={styles.logo} />
            <Text style={styles.heading}>Create your account</Text>

            <CustomInput
                leftIcon={<Image source={Icons["fi-rr-user"]} style={styles.iconImage} />}
                value={formik.values.name}
                rightIcon
                secureTextEntry={false}
                onChangeText={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                onFocus={() => handleFocus("name")}
                customPlaceholder="Full Name"
                errorMessage={formik.errors.name || getFieldValidationError(validationErrors, 'name')}
                isShowError={(formik.touched.name && formik.errors.name) || getFieldValidationError(validationErrors, 'name')}
            />

            <CustomInput
                leftIcon={<Image source={Icons["fi-rr-envelope"]} style={styles.iconImage} />}
                value={formik.values.email}
                rightIcon
                secureTextEntry={false}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                onFocus={() => handleFocus("email")}
                customPlaceholder="Email"
                errorMessage={formik.errors.email || getFieldValidationError(validationErrors, 'email')}
                isShowError={(formik.touched.email && formik.errors.email) || getFieldValidationError(validationErrors, 'email')}
            />

            <CustomInput
                leftIcon={<Image source={Icons["fi-rr-phone-call"]} style={styles.iconImage} />}
                value={formik.values.phone}
                rightIcon
                secureTextEntry={false}
                onChangeText={formik.handleChange("phone")}
                onBlur={formik.handleBlur("phone")}
                onFocus={() => handleFocus("phone")}
                customPlaceholder="Mobile Number"
                keyboardType="phone-pad"
                errorMessage={formik.errors.phone || getFieldValidationError(validationErrors, 'phone')}
                isShowError={(formik.touched.phone && formik.errors.phone) || getFieldValidationError(validationErrors, 'phone')}
            />

            <CustomInput
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                onFocus={() => handleFocus("password")}
                customPlaceholder="Password"
                errorMessage={formik.errors.password}
                isShowError={formik.touched.password && formik.errors.password}
            />

            <View style={styles.optionsContainer}>
                <CustomRadioButton
                    options={[
                        { label: "I am a vendor", value: "0" },
                        // { label: "I am a customer", value: "1" }, //future need
                    ]}
                    selectedValue={formik.values.is_vendor}
                    onChange={(val) => formik.setFieldValue("is_vendor", val)}
                    direction="horizontal"
                />
                {formik.touched.is_vendor && formik.errors.is_vendor ? (
                    <Text style={styles.errorText}>{formik.errors.is_vendor}</Text>
                ) : null}
            </View>

            <View style={styles.optionsContainer}>
                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity
                        onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                        style={styles.checkbox}
                    >
                        {isTermsAccepted && (
                            <Image source={Icons["fi-rr-check"]} style={styles.checkIcon} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>
                        By Logging In or Signing up, you agree to our{" "}
                        <Text style={[styles.rememberMeText, { textDecorationLine: "underline" }]}>Terms of Service</Text> and{" "}
                        <Text style={[styles.rememberMeText, { textDecorationLine: "underline" }]}>Privacy Policy</Text>
                    </Text>
                </View>
            </View>

            <CustomButton
                title={isSignUpLoading ? "Creating Account..." : "Sign Up"}
                onPress={formik.handleSubmit}
                disabled={isSignUpLoading}
                containerStyle={styles.containerStyle}
            />

            {generalError ? (
                <View style={styles.errorBanner}>
                    <Text style={styles.errorBannerText}>{generalError}</Text>
                </View>
            ) : null}

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Already have an account?{" "}
                    <Text onPress={() => navigation.navigate("login")} style={styles.signUpText}>
                        Sign In
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default SignUpScreen;
