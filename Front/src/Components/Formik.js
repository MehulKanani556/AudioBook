import * as Yup from 'yup';

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
