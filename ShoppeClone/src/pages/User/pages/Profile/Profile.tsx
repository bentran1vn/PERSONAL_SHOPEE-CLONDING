import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { UserSchema, userSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { AppContext } from 'src/context/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { getURLAvatar, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile'

function Infor() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()
  return (
    <Fragment>
      <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
        <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Input
            classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            register={register}
            name='name'
            placeholder='Tên'
            errorMessage={errors.name?.message}
          />
        </div>
      </div>
      <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
        <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
        <div className='sm:w-[80%] sm:pl-5'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                placeholder='Số điện thoại'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Fragment>
  )
}

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'avatar' | 'date_of_birth'>

type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'avatar', 'date_of_birth'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)

  const [file, setFile] = useState<File>()

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })

  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: userApi.uploadAvatar
  })

  const formMethods = useForm<FormData>({
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    setError
  } = formMethods

  const avatar = watch('avatar')

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      refetch()
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      toast.success(res.data.message, {
        autoClose: 500
      })
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  return (
    <div className='rounded-sm bg-white px-2 pb-10 md:px-7 md:pb-20 shadow'>
      <div className='borrder-b border-b-gray-200 py-6'>
        <div className=' text-lg font-medium capitalize text-gray-900'>
          <h1>Hồ Sơ Của Tôi</h1>
          <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <FormProvider {...formMethods}>
          <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
            {/* Update Profile */}
            <div className='mt-6 flex-grow md:pr-12 md:mt-0 md:border-r md:border-r-gray-200'>
              <div className='flex flex-wrap flex-col sm:flex-row'>
                <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <div className='pt-3 text-gray-700'>{profile?.email}</div>
                </div>
              </div>
              {/*  */}
              <Infor />
              <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
                <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Input
                    classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                    register={register}
                    name='address'
                    placeholder='Địa chỉ'
                    errorMessage={errors.address?.message}
                  />
                </div>
              </div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
                <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize' />
                <div className='sm:w-[80%] sm:pl-5'>
                  <Button
                    type='submit'
                    className='flex items-center h-9 bg-orange px-5 text-sm text-center text-white hover:bg-orange/80 rounded-sm'
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
            {/* Upload Image */}
            <div className='flex justify-center md:w-72 '>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-24 w-24'>
                  <img
                    src={previewImage || getURLAvatar(avatar)}
                    alt='UserImage'
                    className='h-full w-full rounded-full object-cover'
                  />
                </div>
                <InputFile onChange={handleChangeFile} />
                <div className='mt-3 text-gray-300'>
                  <div>Dung lượng file tối đa 1MB</div>
                  <div>Định dạng: .JPEG, .PNG</div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
