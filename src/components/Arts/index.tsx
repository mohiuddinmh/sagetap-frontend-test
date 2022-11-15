import React from 'react'
import ArtItem from '../ArtItem'
import styles from './index.module.css'
import { useArtContext } from '../../contexts/arts'

export default function Arts() {
	const { arts } = useArtContext()

	return <section className={styles.artsContainer}>
		{arts.map(({ id, disabled }) => {
			return !disabled ? <div className={styles.artItem} key={id}>
				<ArtItem id={id} />
			</div> : null
		})}
	</section>
}
