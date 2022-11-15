import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import styles from './index.module.css'
import { setToast } from '../../utils/toastUtils'
import { useArtContext } from '../../contexts/arts'

export default function AddArtItem() {
	const [artId, setArtId] = useState<number | undefined>()
	const { hasArt, addArt } = useArtContext()
	// eslint-disable-next-line 
  const inputRef = useRef<any>('')

	const handleAddClick = () => {
		if (!artId) return
		if (hasArt(artId)) {
			setToast({ content: 'The following art is already on display' })
			return
		}
		addArt(artId)
		setArtId(undefined)
		inputRef.current.value = ''
	}

	const handleArtIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setArtId(+event.target.value)
	}

	return <div className={styles.addArtItem}>
		<TextField
			type="number"
			label="Please enter Art ID"
			variant='standard'
			inputRef={inputRef}
			onChange={handleArtIdChange} />

		<Button onClick={handleAddClick} disabled={!artId} variant='text'>Add</Button>
	</div>
}
