export interface ApiResponse<T = unknown> {
  statusCode: number
  customStatusCode?: number
  message?: string
  result?: T
}

export interface PagingData {
  page?: number
  perPage?: number
  totalCount?: number
  totalPages?: number
}
