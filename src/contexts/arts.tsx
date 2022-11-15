import React, { createContext, ReactNode, useContext, useState } from 'react'
import { Art } from '../types'

export interface ArtContextInterface {
  arts: Art[]
  hasArt: (id: number) => boolean
  addArt: (id: number) => void
  removeArt: (id: number) => void
}

const initialArts: Art[] = [
	{ id: 27992, disabled: false },
	{ id: 27998, disabled: false },
	{ id: 27999, disabled: false },
	{ id: 27997, disabled: true },
	{ id: 27993, disabled: true }
]

const ArtContext = createContext<ArtContextInterface>({
	arts: initialArts,
	addArt: () => {
		return
	},
	removeArt: () => {
		return
	},
	hasArt: () => false
})

export const ArtProvider = ({ children }: { children: ReactNode }) => {
	const [arts, setArts] = useState<Art[]>(initialArts)

	const hasArt = (id: number) => arts.some(a => a.id === id)

	const addArt = (id: number) => {
		setArts(currArts => ([{ id, disabled: false }, ...currArts]))
	}

	const removeArt = (id: number) => {
		setArts(currArts => {
			const foundAt = currArts.findIndex(a => a.id === id)
			foundAt >= 0 && currArts.splice(foundAt, 1)
			return [...currArts]
		})
	}

	return <ArtContext.Provider value={{ arts, addArt, removeArt, hasArt }}>
		{children}
	</ArtContext.Provider>
}

export const useArtContext = () => useContext<ArtContextInterface>(ArtContext)