import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import styles from './index.module.css'
import { setToast } from '../../utils/toastUtils'
import { artAdder, useArtsAtom } from '../../atoms/art'

export default function AddArtItem() {
	const [artId, setArtId] = useState<number | undefined>()
	const [arts, setArts] = useArtsAtom()
	const inputRef = useRef<any>(null)

	const handleAddClick = () => {
		if (arts.some(a => a.id === artId)) {
			setToast({ content: 'The following art is already on display' })
			return
		}
		artId !== undefined && setArts(artAdder(artId))
		setArtId(undefined)
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	const handleArtIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setArtId(+event.target.value)
	}

	return <div className={styles.addArtItem}>
		<TextField type="number" label="Please enter Art ID" variant='standard' inputRef={inputRef}
			onChange={handleArtIdChange} />

		<Button onClick={handleAddClick} disabled={!artId} variant='text'>Add</Button>
	</div>
}
