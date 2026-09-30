import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Pagination from '.'

const renderPagination = (page: number, pageCount: number) => {
  const onPageChange = vi.fn()
  const onPerPageChange = vi.fn()
  render(
    <Pagination
      page={page}
      pageCount={pageCount}
      perPage={10}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
    />,
  )
  return { onPageChange, onPerPageChange }
}

describe('Pagination', () => {
  it('shows the current page and page count', () => {
    renderPagination(2, 5)

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
  })

  it('disables Prev on the first page and Next on the last page', () => {
    renderPagination(1, 1)

    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })

  it('calls onPageChange with the next and previous page', async () => {
    const { onPageChange } = renderPagination(2, 5)

    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    await userEvent.click(screen.getByRole('button', { name: 'Prev' }))

    expect(onPageChange).toHaveBeenNthCalledWith(1, 3)
    expect(onPageChange).toHaveBeenNthCalledWith(2, 1)
  })

  it('calls onPerPageChange with a number', async () => {
    const { onPerPageChange } = renderPagination(1, 5)

    await userEvent.selectOptions(screen.getByLabelText('Rows per page'), '20')

    expect(onPerPageChange).toHaveBeenCalledWith(20)
  })
})
