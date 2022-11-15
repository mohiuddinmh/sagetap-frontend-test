import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect } from 'react'
import { useMutation } from 'react-query'
import { api } from '../../api'
import { Button, Rating } from '@mui/material'
import { setToast, TOAST_TYPE } from '../../utils/toastUtils'

interface RaterProps {
  setRating: Dispatch<SetStateAction<number | null>>
  voted: boolean,
  setVoted: Dispatch<SetStateAction<boolean>>
  id: number
  rating: number | null
}

export default function Rater({ id, rating, voted, setRating, setVoted }: RaterProps) {

	const { mutate: mutateRating, isSuccess, isError } = useMutation(api.rating.post, {
		onSuccess: () => {
			setVoted(true)
		},
		onError: () => {
			setVoted(false)
		}
	})

	useEffect(() => {
		if (isSuccess) {
			setToast({ content: `Rating submitted for ${id}`, type: TOAST_TYPE.SUCCESS })
		}
	}, [isSuccess])

	useEffect(() => {
		if (isError) {
			setToast({ content: `Error upon submitting rating for ${id}`, type: TOAST_TYPE.ERROR })
		}
	}, [isError])

	const handleRatingChange = (event: SyntheticEvent, value: number | null) => {
		setRating(value)
	}

	const handleSubmit = () => {
		mutateRating({ id, rating: rating as number })
	}

	return <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
		<Rating data-testid="rating-stars" readOnly={voted} onChange={handleRatingChange} />
		{!voted && <Button
			data-testid="submit-rating"
			disabled={!rating}
			onClick={handleSubmit}>Submit</Button>}
	</div>
}
