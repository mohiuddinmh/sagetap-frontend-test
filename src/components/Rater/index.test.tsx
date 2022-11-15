import { screen } from '@testing-library/react'
import { renderWithQueryProvider } from '../../utils/testUtils'
import Rater from './index'

test('has title', () => {
	renderWithQueryProvider(<Rater id={1} rating={null} voted={false} setRating={() => null} setVoted={() => null} />)
	expect(screen.getByTestId('rating-stars')).toBeInTheDocument()
	expect(screen.getByTestId('submit-rating')).toBeInTheDocument()
})
