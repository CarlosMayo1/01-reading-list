import { useState, useEffect } from 'react'
import {
	ADD_BOOK_TO_READING_LIST,
	REMOVE_BOOK_FROM_READING_LIST,
} from '../../constants/constants'
import { useStore, useDispatch } from '../../store/StoreProvider'
import { IconBook2, IconBook, IconBookOff, IconStar } from '@tabler/icons-react'

const BookInformation = () => {
	const { library, readingList, bookIndex } = useStore()
	const [errorMessage, setErrorMessage] = useState(readingList.length === 4)
	const dispatch = useDispatch()
	const stars = [1, 2, 3, 4, 5]

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

	useEffect(() => {
		const showErrorMessage = setTimeout(() => {
			setErrorMessage(false)
		}, 5000)

		return () => clearTimeout(showErrorMessage)
	}, [errorMessage])

	return (
		<section className='lg:block hidden bg-white p-2 rounded-md shadow-md text-white'>
			<div className='bg-[#001643] h-full p-2 2xl:p-6 rounded-md'>
				<h2 className='text-xl font-semibold mb-8'>About this book</h2>
				<div className='flex flex-col items-center justify-center'>
					<div className='bg-white w-56 h-70 p-4 rounded-md mb-6'>
						<img
							className='w-full h-full object-fill'
							src={library[bookIndex]?.cover}
							alt={`Cover of the book ${library[bookIndex]?.title}`}
						/>
					</div>
					<h3 className='font-bold text-lg mb-6'>
						{library[bookIndex]?.title}
					</h3>
					<div className='flex mb-6'>
						<div className='flex flex-col justify-center px-3 border-r border-r-[#5870A1]'>
							<span className='mb-1 font-semibold'>
								{library[bookIndex]?.year}
							</span>
							<p className='text-xs text-center font-light'>Year</p>
						</div>
						<div className='flex flex-col justify-center px-3 border-r border-r-[#5870A1]'>
							<span className='mb-1 font-semibold'>
								{library[bookIndex]?.pages}
							</span>
							<p className='text-xs text-center font-light'>Pages</p>
						</div>
						<div className='flex flex-col justify-center px-3'>
							<span className='mb-1 font-semibold'>
								{library[bookIndex]?.genre}
							</span>
							<p className='text-xs text-center font-light'>Genre</p>
						</div>
					</div>
					<p className='text-center font-semibold mb-6'>
						{library[bookIndex]?.synopsis}
					</p>
				</div>
				{/* stars rating */}
				<div className='flex items-center justify-center mb-4'>
					{stars.map(star => (
						<IconStar
							key={star}
							className={`${
								Math.round(library[bookIndex]?.qualification) >= star
									? 'fill-[#F7B635]'
									: 'border-[#F7B635]'
							}`}
							stroke={1}
							color={'#F7B635'}
						/>
					))}
				</div>
				<div className='mb-8'>
					<div className='mb-4'>
						<p className=' mb-2 font-semibold text-sm'>ISBN:</p>
						<p className='font-semibold'>{library[bookIndex]?.ISBN}</p>
					</div>
					<div className='mb-4'>
						<p className='font-semibold text-sm mb-2'>Author:</p>
						<p className='font-semibold'>{library[bookIndex]?.author.name}</p>
					</div>
					<div
						className={`${
							library[bookIndex]?.author.otherBooks.length === 0 ? 'hidden' : ''
						}`}
					>
						<p className='font-semibold mb-2'>Other books:</p>
						<ul>
							{library[bookIndex]?.author.otherBooks.length > 0
								? library[bookIndex]?.author.otherBooks.map(book => (
										<li
											className='font-semibold flex items-center mb-2'
											key={book}
										>
											<IconBook2 className='mr-1' /> {book}
										</li>
								  ))
								: null}
						</ul>
					</div>
				</div>
				<div className=''>
					<button
						className={` w-full py-3 px-6 rounded-md ${
							readingList.some(item => item === library[bookIndex]?.ISBN)
								? 'bg-[#6686F7] border-[#6686F7]'
								: 'bg-[#0055FF] border-[#0055FF]'
						} text-lg font-bold mb-4`}
						onClick={() =>
							onAddBookToReadingListHandler(library[bookIndex]?.ISBN)
						}
					>
						{readingList.some(item => item === library[bookIndex]?.ISBN) ? (
							<span className='flex items-center justify-center '>
								<IconBookOff className='mr-2' /> Remove From List
							</span>
						) : (
							<span className='flex items-center justify-center '>
								<IconBook className='mr-2' /> Read Now
							</span>
						)}
					</button>
					<p className='text-red-500 font-semibold text-center text-sm'>
						{errorMessage && 'Only four books accepted in the reading list'}
					</p>
				</div>
			</div>
		</section>
	)
}

export default BookInformation
