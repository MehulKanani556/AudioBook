import * as Yup from "yup";

export const LoginSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
});

export const ForgetPassSchema = Yup.object({
  forgetPassVal: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const OtpSchema = Yup.object({
  otp0: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
  otp1: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
  otp2: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
  otp3: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
})

export const editProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters and spaces"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required")
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters and spaces"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),

  mobileNo: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .matches(/^[6-9]\d{9}$/, "Mobile number must start with 6-9"),
});

export const ResetPassSchema = Yup.object().shape({
  newPass: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
    confirmPass: Yup.string()
    .oneOf([Yup.ref('newPass'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const CreateLableSchema = Yup.object({
  labelNameVal: Yup.string().required("LableName Is Required")
})

