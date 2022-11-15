import { screen } from '@testing-library/react'
import App from './App'
import { renderWithQueryProvider } from './utils/testUtils'

describe('app', () => {

	test('has title', () => {
		renderWithQueryProvider(<App />)
		const title = screen.getByText('Art Rater')
		expect(title).toBeInTheDocument()
	})
})
