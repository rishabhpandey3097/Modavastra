import * as Yup from 'yup'
const NameRegExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

// User register validation
export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required')
    .matches(NameRegExp, 'Full name is not valid'),

  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  mobile: Yup.string()
    .required('Phone Number is required')
    .min(10, 'Phone Number must have 10 digits')
    .max(10, 'Phone Number must have 10 digits'),
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required'),
})

export const createAddressSchema = Yup.object().shape({
  address: Yup.string()
    .min(3, 'Address must be at least 3 characters')
    .required('Address is required'),
  locality: Yup.string()
    .min(4, 'Locality must be at least 4 characters')
    .required('Locality is required'),
  pincode: Yup.number()
    .min(4, 'Pincode must be at least 4 characters')
    .required('PinCode is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
})

export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Old Password is required'),
  newPassword: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match',
  ),
})
