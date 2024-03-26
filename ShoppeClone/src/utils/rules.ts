import * as yup from 'yup'

// type Rules = { [key in keyof FormData]?: RegisterOptions }
// export const getRules = (getValues?: UseFormGetValues<FormData>): Rules => ({
//   email: {
//     required: {
//       value: true,
//       message: 'Email Is Required !'
//     },
//     pattern: {
//       value: /^\S+@\S+\.\S+$/,
//       message: 'Invalid Email !'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Can not exceed 160 characters'
//     },
//     minLength: {
//       value: 5,
//       message: 'Can not under 5 characters'
//     }
//   },
//   password: {
//     required: {
//       value: true,
//       message: 'Password Is Required !'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Can not exceed 160 characters'
//     },
//     minLength: {
//       value: 6,
//       message: 'Can not under 6 characters'
//     }
//   },
//   confirm_password: {
//     required: {
//       value: true,
//       message: 'Confirm Password Is Required !'
//     },
//     maxLength: {
//       value: 160,
//       message: 'Can not exceed 160 characters'
//     },
//     minLength: {
//       value: 6,
//       message: 'Can not under 6 characters'
//     },
//     validate:
//       typeof getValues === 'function' ? (value) => value === getValues('password') || 'Not Correct Password' : undefined
//   }
// })

export const schema = yup.object({
  email: yup
    .string()
    .required('Email is Required !')
    .email()
    .min(5, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters'),
  password: yup
    .string()
    .required('Password Is Required !')
    .min(6, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters'),
  confirm_password: yup
    .string()
    .required('Confirm Password Is Required !')
    .min(6, 'Can not under 5 characters')
    .max(160, 'Can not exceed 160 characters')
    .oneOf([yup.ref('password')], 'Not Correct Password')
})

export type Schema = yup.InferType<typeof schema>
