import React from 'react'
import ArtItem from '../ArtItem'
import styles from './index.module.css'
import { useArtsAtom } from '../../atoms/art'

export default function Arts() {
	const [arts] = useArtsAtom()

	return <section className={styles.artsContainer}>
		{arts.map(({ id, disabled }) => {
			return !disabled ? <div className={styles.artItem} key={id}>
				<ArtItem id={id} />
			</div> : null
		})}
	</section>
}

