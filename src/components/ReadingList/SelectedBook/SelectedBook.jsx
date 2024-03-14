import { REMOVE_BOOK_FROM_READING_LIST } from '../../../constants/constants'
import { useStore, useDispatch } from '../../../store/StoreProvider'
import { useEffect } from 'react'

const SelectedBook = ({ book }) => {
	const { readingList } = useStore()
	const dispatch = useDispatch()
	const onClickSelectedBookHandler = () => {
		console.log(book)
		const updatedReadingList = [...readingList]
		const filterReadingList = updatedReadingList.filter(
			item => item.title !== book.title,
		)
		console.log(filterReadingList)
		dispatch({
			type: REMOVE_BOOK_FROM_READING_LIST,
			payload: filterReadingList,
		})
	}

	// const onClickSelectedBookHandler = selectedBook => {
	// 	console.log('Selected book: ' + selectedBook.title)
	// 	const listOfBooks = [...selectedBooks]
	// 	const filteredList = listOfBooks.filter(
	// 		book => book.title !== selectedBook.title,
	// 	)
	// 	setSelectedBooks(filteredList)
	// 	console.log(selectedBooks)
	// }

	return (
		<li>
			<img
				className='w-full object-fill h-48'
				src={book.cover}
				alt={`A cover of ${book.title}`}
				onClick={() => onClickSelectedBookHandler(book)}
			/>
		</li>
	)
}

export default SelectedBook
