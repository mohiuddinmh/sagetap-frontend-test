import { fireEvent, screen, waitFor } from '@testing-library/react'
import ArtItem from './index'
import { renderWithQueryProvider } from '../../utils/testUtils'
import { server } from '../../mocks/server'
import { rest } from 'msw'
import { ToastContainer } from 'react-toastify'

test('an art item is fetched and displayed correctly', async () => {
	renderWithQueryProvider(<ArtItem id={1} />)

	await waitFor(() => expect(screen.getByText('Plate One from Collection of Various Vases')).toBeInTheDocument())
})

test('an error message is displayed if the api call fails', async () => {
	// given
	renderWithQueryProvider(
		<>
			<ArtItem id={1} />
			<ToastContainer />
		</>
	)

	// when
	server.use(rest.get('https://api.artic.edu/api/v1/artworks/:id', (req, res, ctx) => {
		return res(
			ctx.status(400),
		)
	}))

	// then
	await waitFor(() => expect(screen.getByText(/Unable to find an art for id 1/)).toBeInTheDocument())
})

test('for an art item, submit button is disabled until a rating is selected', async () => {
	// Given
	renderWithQueryProvider(<ArtItem id={1} />)
	await waitFor(() => expect(screen.getByText('Plate One from Collection of Various Vases')).toBeInTheDocument())

	const ratingScale = screen.getByTestId('rating-stars')
	const ratingOneButton = ratingScale.querySelector('[value=\'1\']') as Element

	// then
	expect(screen.getByText(/Submit/)).toHaveAttribute('disabled')

	// when
	fireEvent.click(ratingOneButton)

	// then
	expect(screen.getByText(/Submit/)).not.toHaveAttribute('disabled')
	expect(1).toBeTruthy()
})

test('for an art item, clicking numbered button updates rating display below image to be that number', async () => {
	// given
	renderWithQueryProvider(<ArtItem id={1} />)
	await waitFor(() => expect(screen.getByText('Plate One from Collection of Various Vases')).toBeInTheDocument())
	const ratingScale = screen.getByTestId('rating-stars')
	const ratingOneButton = ratingScale.querySelector('[value=\'1\']') as Element

	// when
	fireEvent.click(ratingOneButton)

	// then
	expect(screen.getByTestId('rating').textContent).toBe('Rating: 1')
})

test('for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other', async () => {
	// given
	renderWithQueryProvider(<ArtItem id={1} />)
	await waitFor(() => expect(screen.getByText('Plate One from Collection of Various Vases')).toBeInTheDocument())
	const ratingScale = screen.getByTestId('rating-stars')
	const ratingOneButton = ratingScale.querySelector('[value=\'1\']') as Element
	const ratingTwoButton = ratingScale.querySelector('[value=\'2\']') as Element

	// when
	fireEvent.click(ratingOneButton)

	// then
	expect(screen.getByTestId('rating').textContent).toBe('Rating: 1')

	// when
	fireEvent.click(ratingTwoButton)
	// then
	expect(screen.getByTestId('rating')).toHaveTextContent('Rating: 2')
})

test('Successful submission of rating displays a toast success message, hides buttons', async () => {
	// given
	server.use(rest.post('https://20e2q.mocklab.io/rating', (req, res, ctx) => res(ctx.status(200), ctx.json({}))))
	renderWithQueryProvider(
		<>
			<ArtItem id={1} />
			<ToastContainer />
		</>
	)
	await waitFor(() => expect(screen.getByText('Plate One from Collection of Various Vases')).toBeInTheDocument())
	const ratingScale = screen.getByTestId('rating-stars')
	const ratingOneButton = ratingScale.querySelector('[value=\'1\']') as Element
	const submitButton = screen.getByText(/Submit/)

	// when
	fireEvent.click(ratingOneButton)
	fireEvent.click(submitButton)

	// then
	await waitFor(() => expect(screen.getByText(/Rating submitted for/)).toBeInTheDocument())

	expect(screen.queryByText(/Submit/)).not.toBeInTheDocument()
})

test('Failed submission of rating displays a toast error message, does not hide buttons', async () => {
	// given
	server.use(rest.post('https://20e2q.mocklab.io/rating', (req, res, ctx) => res(ctx.status(404))))
	renderWithQueryProvider(
		<>
			<ArtItem id={1} />
			<ToastContainer />
		</>
	)
	await waitFor(() => expect(screen.getByText('Plate One from Collection of Various Vases')).toBeInTheDocument())
	const ratingScale = screen.getByTestId('rating-stars')
	const ratingOneButton = ratingScale.querySelector('[value=\'1\']') as Element
	const submitButton = screen.getByText(/Submit/)

	// when
	fireEvent.click(ratingOneButton)
	fireEvent.click(submitButton)

	// then
	await waitFor(() => expect(screen.getByText(/Error upon submitting rating for/)).toBeInTheDocument())

	expect(screen.queryByText(/Submit/)).toBeInTheDocument()
})
