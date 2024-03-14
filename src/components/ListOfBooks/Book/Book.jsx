import { useState, useEffect } from 'react'
import { useStore, useDispatch } from '../../../store/StoreProvider'
import { SELECTED_BOOK_INDEX } from '../../../constants/constants'
import { IconBook, IconBookOff } from '@tabler/icons-react'
import {
	ADD_BOOK_TO_READING_LIST,
	REMOVE_BOOK_FROM_READING_LIST,
} from '../../../constants/constants'

const Book = ({ book }) => {
	const { library, readingList } = useStore()
	const [errorMessage, setErrorMessage] = useState(readingList.length === 4)

	const dispatch = useDispatch()

	const onSelectedBookHandler = book => {
		const index = library.indexOf(book) // returns the number

		dispatch({ type: SELECTED_BOOK_INDEX, payload: index })
	}

	const onAddBookToReadingListHandler = book => {
		const libraryCopy = [...readingList]

		// if the book is already in the reading list
		if (readingList.some(item => item === book)) {
			const filteredList = libraryCopy.filter(item => item !== book)
			dispatch({ type: REMOVE_BOOK_FROM_READING_LIST, payload: filteredList })
			localStorage.setItem('readList', JSON.stringify(filteredList))
			return
		}

		// avoid inserting books beyond the maximum limit
		if (readingList.length === 4) {
			console.log(readingList.length === 4)
			setErrorMessage(true)
			return
		}

		libraryCopy.push(book)
		dispatch({
			type: ADD_BOOK_TO_READING_LIST,
			payload: libraryCopy,
		})
		// local storage
		localStorage.setItem('readList', JSON.stringify(libraryCopy))
	}

	const replaceLongWords = str => {
		if (str.length <= 21) {
			return str
		}
		const replaceWord = str.slice(17, str.length)
		return str.replace(replaceWord, '...')
	}

	useEffect(() => {
		const showErrorMessage = setTimeout(() => {
			setErrorMessage(false)
		}, 5000)

		return () => clearTimeout(showErrorMessage)
	}, [errorMessage])

	return (
		<li
			className='shadow-md flex justify-center rounded-md p-1 lg:p-2'
			onClick={() => onSelectedBookHandler(book)}
		>
			<div>
				<img
					className='w-52 h-72 sm:w-40 sm:h-40 object-fit'
					src={book.cover}
					alt={`cover of the book ${book.title}`}
				/>
				<h4 className='text-sm font-bold'>{replaceLongWords(book.title)}</h4>
				<p className='text-xs'>
					Genre: <span className='text-ligh'>{book.genre}</span>
				</p>
				<div className='lg:hidden text-xs'>
					<div className='flex'>
						<p className='mr-1'>Pages: </p>
						<p>{book.pages}</p>
					</div>
					<div className='py-2'>
						<button
							className={` w-full py-1.5 px-3 rounded-md ${
								readingList.some(item => item === book?.ISBN)
									? 'bg-[#6686F7] border-[#6686F7]'
									: 'bg-[#0055FF] border-[#0055FF]'
							} font-bold text-white`}
							onClick={() => onAddBookToReadingListHandler(book?.ISBN)}
						>
							{readingList.some(item => item === book?.ISBN) ? (
								<span className='flex items-center justify-center '>
									<IconBookOff className='mr-2' /> Remove From List
								</span>
							) : (
								<span className='flex items-center justify-center '>
									<IconBook className='mr-2' /> Read Now
								</span>
							)}
						</button>
						<p className='text-red-500 font-semibold text-center text-xs'>
							{errorMessage && 'Only four books accepted in the reading list'}
						</p>
					</div>
				</div>
			</div>
		</li>
	)
}

export default Book
