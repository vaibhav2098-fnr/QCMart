import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../../../components/custom-Input/input-field";
import CustomButton from "../../../components/custom-Button/button";
import { IMG } from "../../../assets/qcImages/qxImages";
import { Icons } from "../../../assets/qcIcons/qcIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "./sign-up-style";
import CustomRadioButton from "../../../components/custom-RadioButton/radio-button";
import { useNavigation } from "@react-navigation/native";

// Validation schema
const loginValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    userType: Yup.string().required("User type is required"),
});

const SignUpScreen = () => {
    const navigation = useNavigation()
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            mobileNumber: "",
            password: "",
            userType: "1", // Default: Customer
        },
        validationSchema: loginValidationSchema,
        onSubmit: (values) => {
            console.log("Form Submitted:", values);
        },
    });

    const handleFocus = (field: keyof typeof formik.values) => {
        formik.setFieldTouched(field, false);
    };

    return (
        <View style={styles.container}>
            <Image source={IMG["QC-mart-logo"]} style={styles.logo} />
            <Text style={styles.heading}>Create your account</Text>

            <CustomInput
                leftIcon={<Image source={Icons["fi-rr-user"]} style={styles.iconImage} />}
                value={formik.values.fullName}
                rightIcon
                secureTextEntry={false}
                onChangeText={formik.handleChange("fullName")}
                onBlur={formik.handleBlur("fullName")}
                onFocus={() => handleFocus("fullName")}
                customPlaceholder="Full Name"
                errorMessage={formik.errors.fullName}
                isShowError={formik.touched.fullName && formik.errors.fullName}
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
                errorMessage={formik.errors.email}
                isShowError={formik.touched.email && formik.errors.email}
            />

            <CustomInput
                leftIcon={<Image source={Icons["fi-rr-phone-call"]} style={styles.iconImage} />}
                value={formik.values.mobileNumber}
                rightIcon
                secureTextEntry={false}
                onChangeText={formik.handleChange("mobileNumber")}
                onBlur={formik.handleBlur("mobileNumber")}
                onFocus={() => handleFocus("mobileNumber")}
                customPlaceholder="Mobile Number"
                keyboardType="phone-pad"
                errorMessage={formik.errors.mobileNumber}
                isShowError={formik.touched.mobileNumber && formik.errors.mobileNumber}
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
                        { label: "I am a customer", value: "1" },
                        { label: "I am a vendor", value: "2" },
                    ]}
                    selectedValue={formik.values.userType}
                    onChange={(val) => formik.setFieldValue("userType", val)}
                    direction="horizontal"
                />
                {formik.touched.userType && formik.errors.userType ? (
                    <Text style={styles.errorText}>{formik.errors.userType}</Text>
                ) : null}
            </View>

            <View style={styles.optionsContainer}>
                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity onPress={() => console.log("Agreed")} style={styles.checkbox}>
                        <Image source={Icons["fi-rr-check"]} style={styles.checkIcon} />
                    </TouchableOpacity>
                    <Text style={styles.rememberMeText}>
                        By Logging In or Signing up, you agree to our{" "}
                        <Text style={[styles.rememberMeText, { textDecorationLine: "underline" }]}>Terms of Service</Text> and{" "}
                        <Text style={[styles.rememberMeText, { textDecorationLine: "underline" }]}>Privacy Policy</Text>
                    </Text>
                </View>
            </View>

            {/* <CustomButton title="Sign Up" onPress={formik.handleSubmit} containerStyle={styles.containerStyle}/> */}
            <CustomButton title="Sign Up" onPress={()=>navigation.navigate('otp')} containerStyle={styles.containerStyle}/>

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
