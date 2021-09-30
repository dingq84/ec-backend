function calculatePagination(currentPage: number, lastPage: number): number[] {
  const start =
    currentPage === lastPage ? Math.max(1, currentPage - 8) : Math.max(1, currentPage - 4)
  const end = Math.min(lastPage, start + 8)
  const length = end - start + 1

  return Array.from(Array(length), (_, index) => index + start)
}

export default calculatePagination
