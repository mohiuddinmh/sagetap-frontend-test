import { atom, useAtom } from 'jotai'
import { Art } from '../types'

export const artsAtom = atom<Art[]>([
	{ id: 27992, disabled: false },
	{ id: 27998, disabled: false },
	{ id: 27999, disabled: false },
	{ id: 27997, disabled: true },
	{ id: 27993, disabled: true }
])

export const artAdder = (id: number) => (currentArts: Art[]) => [{ id }, ...currentArts]

export const artRemover = (id: number) => (currentArts: Art[]) => {
	const foundAt = currentArts.findIndex(a => a.id === id)
	foundAt >= 0 && currentArts.splice(foundAt, 1)
	return [...currentArts]
}


export const useArtsAtom = () => useAtom(artsAtom)