import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const ForgetPassSchema = Yup.object({
  forgetPassVal: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const OtpSchema = Yup.object({
  otp0: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
  otp1: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
  otp2: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
  otp3: Yup.string().required("Required").matches(/^\d$/, "Must be a digit"),
});

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
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("newPass"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const CreateLableSchema = Yup.object({
  labelNameVal: Yup.string().required("LableName Is Required"),
});

export const EditLableSchema = Yup.object({
  editLabelName: Yup.string().required("LableName Is Required"),
});

export const roleSchema = Yup.object({
  role: Yup.string().required("role is required"),
});
export const changePassSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export const editSubscriptionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  discount: Yup.string()
    .test("is-valid-percentage", "Invalid percentage format", (value) => {
      if (!value) return false;
      const numValue = parseFloat(value.replace("%", ""));
      return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
    })
    .required("Discount is required"),
  scratchPrice: Yup.number()
    .typeError("Scratch price must be a number")
    .min(0, "Scratch price cannot be negative")
    .required("Scratch price is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  status: Yup.string().required("Status is required"),
});
export const coinMasterSchema = Yup.object({
  // role:Yup.string().required("role is required")
  coin: Yup.string().required("role is required"),
  payment: Yup.string().required("payment is required"),
  freeCoin: Yup.string().required("freecoin is required"),
  labelID: Yup.string().required("labelID is required"),
  isoneTime: Yup.string().required("is one time is required"),
  validTill: Yup.string().required("valid till is required"),
  status: Yup.string().required("status is required"),
});

export const addSubscriptionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  discount: Yup.string()
    .test("is-valid-percentage", "Invalid percentage format", (value) => {
      if (!value) return false;
      const numValue = parseFloat(value.replace("%", ""));
      return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
    })
    .required("Discount is required"),
  scratchPrice: Yup.number()
    .typeError("Scratch price must be a number")
    .min(0, "Scratch price cannot be negative")
    .required("Scratch price is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  status: Yup.string().required("Status is required"),
});

export const editUserMasterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  phone: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .matches(/^[6-9]\d{9}$/, "Mobile number must start with 6-9"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  roleId: Yup.string().required("Role ID is required"),
  bio: Yup.string().required("Bio is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  occupation: Yup.string().required("Occupation is required"),
  studentVerificationStatus: Yup.string().required(
    "Verification status is required"
  ),
  studentIdImage: Yup.string().required("StudentIdImage is required"),
  coins: Yup.number()
    .min(0, "Coins cannot be negative")
    .required("Coins is required"),
  language: Yup.string().required("Language is required"),
  image: Yup.string().required("Image is required"),
  status: Yup.string().required("Status is required"),
});

export const addUserMasterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  phone: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .matches(/^[6-9]\d{9}$/, "Mobile number must start with 6-9"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  roleId: Yup.string().required("Role ID is required"),
  bio: Yup.string().required("Bio is required"),
  age: Yup.number()
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer"),
  occupation: Yup.string().required("Occupation is required"),
  studentVerificationStatus: Yup.string().required(
    "Verification status is required"
  ),
  studentIdImage: Yup.string().required("StudentIdImage is required"),
  coins: Yup.number()
    .min(0, "Coins cannot be negative")
    .required("Coins is required"),
  language: Yup.string().required("Language is required"),
  image: Yup.string().required("Image is required"),
  status: Yup.string().required("Status is required"),
});

export const CreateGenreSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(50, 'Name must be 50 characters or less'),
});
export const voucherSchema = Yup.object({
  name: Yup.string().required("name is required"),
  description: Yup.string().required("description is required"),
  code: Yup.string().required("code is required"),
  discount: Yup.string().required("discount is required"),
  subscriptionId: Yup.string().required("subscriptionId is required"),
  validTill:  Yup.string().required("validTill is required"),
  forStudent: Yup.string().required("forStudent is required"),
  status: Yup.string().required("status is required"),
})  
export const addAudioBookSchema = Yup.object().shape({
  genreId: Yup.string().required("Genre ID is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  tags: Yup.string().required("Tags are required"),
  language: Yup.string().required("Language is required"),
  sampleFile: Yup.mixed().required("Thumbnail file is required"),
});


export const editAudioBookSchema = Yup.object().shape({
  genreId: Yup.string().required("Genre ID is required"),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  tags: Yup.string().required("Tags are required"),
  language: Yup.string().required("Language is required"),
  sampleFile: Yup.mixed().required("Thumbnail file is required"),
});

export const crewSchema = Yup.object({
  audiBookId: Yup.string().required("Audio Book is required"),
  name:Yup.string().required("Name ID is required"),
  roleId:Yup.string().required("Role is required"),
  crewImage:Yup.string().required("Crew image is required")
})  