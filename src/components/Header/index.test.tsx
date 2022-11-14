import { screen } from '@testing-library/react'
import { renderWithQueryProvider } from '../../utils/testUtils'
import Header from './index'

test('has title', () => {
	renderWithQueryProvider(<Header />)
	const title = screen.getByText('Art Rater')
	expect(title).toBeInTheDocument()
})
