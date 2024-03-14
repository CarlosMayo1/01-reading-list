import { REMOVE_BOOK_FROM_READING_LIST } from '../../../constants/constants'
import { useDispatch, useStore } from '../../../store/StoreProvider'

const SelectedBook = () => {
	const { library, readingList } = useStore()
	const dispatch = useDispatch()
	const arrBooks = []
	for (let i = 0; i < readingList.length; i++) {
		for (let k = 0; k < library.length; k++) {
			if (library[k].ISBN === readingList[i]) {
				arrBooks.push(library[k])
			}
		}
	}

	const onRemoveBookHandler = ISBN => {
		const readingListCopy = [...readingList]
		const filteredReadingList = readingListCopy.filter(book => book !== ISBN)

		dispatch({
			type: REMOVE_BOOK_FROM_READING_LIST,
			payload: filteredReadingList,
		})
		localStorage.setItem('readList', JSON.stringify(filteredReadingList))
	}

	return arrBooks.map(book => (
		<li key={book.ISBN} className='mb-4'>
			<div>
				<img
					className='w-28 h-36 object-fit m-auto mb-2'
					src={book.cover}
					alt={`cover of the book ${book.title}`}
				/>
				<h4 className='text-sm font-bold text-center mb-2'>{book.title}</h4>
				<div className='text-center'>
					<button
						className='py-2 px-4 text-center font-semibold rounded-md bg-red-500 text-white'
						onClick={() => onRemoveBookHandler(book.ISBN)}
					>
						Remove
					</button>
				</div>
			</div>
		</li>
	))
}

export default SelectedBook
