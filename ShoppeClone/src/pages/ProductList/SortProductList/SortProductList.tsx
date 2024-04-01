export default function SortProductList() {
  return (
    <div className='bg-gray-300/40 py-4 px-3 '>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center flex-wrap gap-2'>
          <div>Sắp xếp theo</div>
          <button className='h-8 px-4 capitalize bg-orange text-white text-sm hover:bg-orange/80 text-center'>
            Phổ Biến
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center'>
            Mới nhất
          </button>
          <button className='h-8 px-4 capitalize bg-white text-black text-sm hover:bg-slate-100 text-center'>
            Bán Chạy
          </button>
          <select
            className='h-8 px-4 capitalize bg-white text-blackhover:bg-slate-100 text-left outline-none'
            defaultValue=''
          >
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp Đến Cao</option>
            <option value='price:desc'>Giá: Cao Đến Thấp</option>
          </select>
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rouded-tl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='px-3 h-8 rouded-tr-sm bg-white hover:bg-slate-100 shadow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-3 h-3'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
