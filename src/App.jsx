import { useEffect } from 'react'
import { useStore, useDispatch } from './store/StoreProvider'
import { getBooks } from './mocks/library'
import {
	FETCH_DATA_FROM_DATABASE,
	ADD_BOOK_TO_READING_LIST,
} from './constants/constants'
import Header from './components/Header/Header'
import Library from './components/Library/Library'
import Footer from './components/Footer/Footer'
import Spinner from './components/Spinner/Spinner'

function App() {
	const { library } = useStore()
	const dispatch = useDispatch()

	function onReadListChange(dispatch) {
		function getReadList() {
			const readList = JSON.parse(localStorage.getItem('readList')) ?? []
			dispatch({ type: ADD_BOOK_TO_READING_LIST, payload: readList })
		}
		window.addEventListener('storage', getReadList)
		getReadList()
		return () => window.removeEventListener('storage', getReadList)
	}

	useEffect(() => {
		getBooks().then(response => {
			dispatch({
				type: FETCH_DATA_FROM_DATABASE,
				payload: {
					data: response,
					counter: response.length,
					available: response.length,
				},
			})
		})

		const unsubscribe = onReadListChange(dispatch)
		return () => unsubscribe()
	}, [])

	return (
		<div
			className={`App ${
				library.length === 0
					? 'w-full h-screen flex justify-center items-center'
					: null
			}`}
		>
			{library.length > 0 ? (
				<>
					<Header />
					<Library />
					<Footer />
				</>
			) : (
				<Spinner />
			)}
		</div>
	)
}

export default App
