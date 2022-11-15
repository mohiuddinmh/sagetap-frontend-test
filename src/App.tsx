import './App.css'
import Arts from './components/Arts'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import { ArtProvider } from './contexts/arts'

export default function App() {
	return <div className="App">
		<ArtProvider>
			<Header />
			<Arts />
		</ArtProvider>
	</div>
}
