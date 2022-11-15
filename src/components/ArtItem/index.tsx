import React, { useEffect, useState } from 'react'
import { api } from '../../api'
import { getImageUrl } from '../../utils'
import Rater from '../Rater'
import { useQuery } from 'react-query'
import { Artwork } from '../../types'
import RemoveArtItem from '../RemoveArtItem'
import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material'
import { setToast, TOAST_TYPE } from '../../utils/toastUtils'
import { artRemover, useArtsAtom } from '../../atoms/art'

interface ArtProps {
  id: number
}

export default function ArtItem({ id }: ArtProps) {

	const [voted, setVoted] = useState<boolean>(false)
	const [rating, setRating] = useState<number | null>(null)
	const [, setArts] = useArtsAtom()

	const {
		data: artwork,
		isLoading,
		isError
	} = useQuery<Artwork, Error>(['artwork', id], () => api.artwork.get(id), { retry: false })


	useEffect(() => {
		if (isError) {
			setToast({ content: `Unable to find an art for id ${id}`, type: TOAST_TYPE.ERROR })
			setArts(artRemover(id))
		}
	}, [isError])

	if (isLoading) {
		return <CircularProgress style={{ marginTop: '150px' }} />
	}

	return (
		<Card sx={{ maxWidth: '100%' }}>
			{artwork && <>
				<CardMedia
					component="img"
					image={getImageUrl(artwork.data?.image_id)}
					alt={artwork.data?.thumbnail.alt_text}
				/>
        
				<CardContent>
					<RemoveArtItem id={id} />
					<Typography gutterBottom variant="subtitle1" component="div">
						{artwork.data.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{artwork.data?.artist_title}
					</Typography>
					<p data-testid='rating'>Rating: {rating}</p>
					<Rater {...{ rating, voted, id: artwork.data?.id, setRating, setVoted }} />
				</CardContent>
			</>}
		</Card>
	)
}
