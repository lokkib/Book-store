export interface FilterSliceState {
  searchValue: string
  categoryID: number
  currentPage: number
  sort: {
    name: string
    sortProperty: string
  }
}
