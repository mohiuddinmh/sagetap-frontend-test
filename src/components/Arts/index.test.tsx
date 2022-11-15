import { Provider } from 'jotai'
import { renderWithQueryProvider } from '../../utils/testUtils'
import { artsAtom } from '../../atoms/art'
import Arts from './index'

test('has art items if disabled is false', () => {
	const initialValues = [[artsAtom, [
		{ id: 12345, disabled: false },
		{ id: 123456, disabled: true }
	]]] as Iterable<any>
	const { container } = renderWithQueryProvider(
		<Provider initialValues={initialValues}>
			<Arts />
		</Provider>
	)

	const artItemElements = container.getElementsByClassName('artItem')
	expect(artItemElements).toHaveLength(1)
})
