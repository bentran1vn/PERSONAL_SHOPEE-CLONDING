/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constant/path'
import { AppContext } from 'src/context/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })
  //fix

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng Nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
                className='mt-8'
              />
              <Input
                name='password'
                register={register}
                type='password'
                placeholder='Password'
                errorMessage={errors.password?.message}
                className='mt-2'
                autoComplete='on'
              />
              <div className='mt-3'>
                <Button
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                  type='submit'
                  className='w-full py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600 flex justify-center items-center'
                >
                  Đăng Nhập
                </Button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-500'>Bạn mới biết tới shopee?</span>
                <Link className='text-red-400 ml-1' to={path.register}>
                  Đăng Ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
