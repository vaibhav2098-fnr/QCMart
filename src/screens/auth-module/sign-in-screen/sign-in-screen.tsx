import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../../../components/custom-Input/input-field";
import CustomButton from "../../../components/custom-Button/button";
import { IMG } from "../../../assets/qcImages/qxImages";
import { Icons } from "../../../assets/qcIcons/qcIcons";
import { styles } from "./sign-in-style";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  const [isCheck, setIsCheck] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log("Login form submitted:", values);
      // dispatch login action or navigate
    },
  });

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

        <TouchableOpacity onPress={() => console.log("Forgot Password?")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <CustomButton title="Sign In" onPress={formik.handleSubmit} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text onPress={() => console.log("Sign Up")} style={styles.signUpText}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
