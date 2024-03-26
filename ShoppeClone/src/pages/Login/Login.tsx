/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 rounded bg-white shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Nhập</div>
              <div className='mt-8'>
                <input
                  className='p-3 w-full outline-none border border-gray-300
                   focus:border-gray-500 rounded-sm forcus:shadow-sm'
                  type='email'
                  name='email'
                  placeholder='Email'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-3'>
                <input
                  className='p-3 w-full outline-none border border-gray-300
                   focus:border-gray-500 rounded-sm forcus:shadow-sm'
                  type='password'
                  name='password'
                  autoComplete='on'
                  placeholder='Password'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'></div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng Nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-500'>Bạn mới biết tới shopee?</span>
                <Link className='text-red-400 ml-1' to='/register'>
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
