import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='rounded-sm bg-white px-2 pb-10 md:px-7 md:pb-20 shadow'>
      <div className='borrder-b border-b-gray-200 py-6'>
        <div className=' text-lg font-medium capitalize text-gray-900'>
          <h1>Hồ Sơ Của Tôi</h1>
          <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
          <form className='mt-6 flex-grow md:pr-12 md:mt-0'>
            <div className='flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>tan182205@gmail.com</div>
              </div>
            </div>
            <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Số điện thoại</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <Input classNameInput='px-3 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' />
              </div>
            </div>
            <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
              <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày sinh</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='flex justify-between'>
                  <select className='h-10 w-[32%] rounded-sm border-black'>
                    <option disabled>Ngày</option>
                  </select>
                  <select className='h-10 w-[32%] rounded-sm border-black'>
                    <option disabled>Tháng</option>
                  </select>
                  <select className='h-10 w-[32%] rounded-sm border-black'>
                    <option disabled>Năm</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src='https://picsum.photos/200/300'
                  alt='UserImage'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <input className='hidden' type='file' accept='.jpg,.jpeg,.png' />
              <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
                Chọn Ảnh
              </button>
              <div className='mt-3 text-gray-300'>
                <div>Dung lượng file tối đa 1MB</div>
                <div>Định dạng: .JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
