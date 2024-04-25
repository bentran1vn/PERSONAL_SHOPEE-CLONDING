import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext } from 'react'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constant/path'
import { purchaseStatus } from 'src/constant/purchase'
import { AppContext } from 'src/context/app.context'
import useQueryParams from 'src/hooks/useQueryParams'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

const purchaseTabs = [
  { status: purchaseStatus.all, title: 'Tất Cả' },
  { status: purchaseStatus.waitForConfirmation, title: 'Chờ Xác Nhận' },
  { status: purchaseStatus.waitForGetting, title: 'Chờ Lấy Hàng' },
  { status: purchaseStatus.inProgress, title: 'Đang Giao' },
  { status: purchaseStatus.delivered, title: 'Đã Giao' },
  { status: purchaseStatus.cancelled, title: 'Đã Huỷ' }
]

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const { isAuthenticated } = useContext(AppContext)
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchase', { status: status }],
    queryFn: () => purchaseApi.getPurchaseList({ status: status as PurchaseListStatus }),
    enabled: isAuthenticated
  })

  const purchaseTabList = purchaseTabs.map((item, index) => (
    <Link
      key={index}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(item.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === item.status,
        'border-b-black/10 text-gray-900': status !== item.status
      })}
    >
      {item.title}
    </Link>
  ))

  const purchasesInCart = purchaseInCartData?.data.data

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow'>{purchaseTabList}</div>
          {purchasesInCart?.map((purchase) => {
            return (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='text-gray-500 truncate line-through '>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='text-orange truncate ml-2'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end'>
                  <div>
                    <span>Tổng Giá Tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
