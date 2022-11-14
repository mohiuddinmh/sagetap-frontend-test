import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { useMutation } from 'react-query'
import { api } from '../../api'
import { Button, Rating } from '@mui/material'

interface RaterProps {
  setRating: Dispatch<SetStateAction<number | null>>
  voted: boolean,
  setVoted: Dispatch<SetStateAction<boolean>>
  id: number
  rating: number | null
}

export default function Rater({ id, rating, voted, setRating, setVoted }: RaterProps) {

	const { mutate: mutateRating } = useMutation(api.rating.post)

	const handleRatingChange = (event: SyntheticEvent, value: number | null) => {
		setRating(value)
	}

	const handleSubmit = () => {
		console.log('Submitting!')
		mutateRating({ id, rating: rating as number })
		setVoted(true)
	}

	return <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
		<Rating data-testid="rating-stars" readOnly={voted} onChange={handleRatingChange} />
		{!voted && <Button
			data-testid="submit-rating"
			disabled={!rating}
			onClick={handleSubmit}>Submit</Button>}
	</div>
}
