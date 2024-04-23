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

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

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
    .oneOf([yup.ref('password')], 'Not Correct Password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid Price !',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Invalid Price !',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa 160 kí tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa 1000 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password']
})

export type Schema = yup.InferType<typeof schema>
export type UserSchema = yup.InferType<typeof userSchema>
