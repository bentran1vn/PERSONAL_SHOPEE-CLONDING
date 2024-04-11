import { QueryConfig } from 'src/pages/ProductList/ProductList'
import useQueryParams from './useQueryParams'
import { isUndefined, omitBy } from 'lodash'

export default function useQueryConfig() {
  const queryParams = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      exclude: queryParams.exclude,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      name: queryParams.name,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      category: queryParams.category,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  return queryConfig
}
