import { useState, useEffect } from 'react'
import { useDispatch, useStore } from '../../store/StoreProvider'
import { AVAILABLE_BOOKS_COUNTER } from '../../constants/constants'
// components
import Book from './Book/Book'

const ListOfBooks = () => {
	const { library, availableBooksCounter, readingList } = useStore()
	const dispatch = useDispatch()
	const [genre, setGenre] = useState('')
	const [filterByPage, setFilterByPage] = useState(0)

	// learn how to use useMemo
	const matches = genre
		? library.filter(book => {
				if (book.genre !== genre) return false
				return book.genre === genre && book.pages >= filterByPage
		  })
		: library.filter(book => book.pages >= filterByPage)

	const availableBooksCounterFnc = () => {
		const selectedBooks = []
		for (let i = 0; i < readingList.length; i++) {
			for (let k = 0; k < library.length; k++) {
				if (library[k].ISBN === readingList[i]) {
					selectedBooks.push(library[k])
				}
			}
		}

		console.log(selectedBooks)

		const filteredReadingListByGenre = selectedBooks.filter(
			book => book.genre === genre,
		)

		return availableBooksCounter - filteredReadingListByGenre.length
	}

	useEffect(() => {
		// sets the number of available books to the total of books filtered
		dispatch({
			type: AVAILABLE_BOOKS_COUNTER,
			payload: matches.length,
		})
	}, [genre, filterByPage])

	const genres = Array.from(new Set(library.map(book => book.genre)))

	return (
		<section className='bg-white rounded-md p-6 shadow-md'>
			<h1 className='text-2xl font-semibold'>Recommended</h1>
			<form className='flex sm:flex-row flex-col justify-between mb-2'>
				<div className='flex flex-col mr-5'>
					<label
						className='font-medium mb-2'
						htmlFor='filterByPages'
						name='filterByPages'
					>
						Filtrar por páginas
					</label>
					<input
						type='range'
						className='outline-none'
						onChange={e => setFilterByPage(e.target.value)}
						id='filterByPages'
						name='pages'
						min={0}
						value={filterByPage}
						max={1200}
						role='slider'
						orient='vertical'
					/>
					<p>paginas: {filterByPage}</p>
				</div>

				<div className='flex flex-col'>
					<label
						className='font-medium '
						htmlFor='filterByGenre'
						name='filterByPages'
					>
						Filtrar por género
					</label>
					<select
						className='border border-slate-300 rounded-md py-1.5 px-2 outline-none text-sm'
						id='filterByGenre'
						name='genre'
						value={genre}
						onChange={e => setGenre(e.target.value)}
					>
						<option value=''>Todos</option>
						{genres.map(genre => (
							<option key={genre} option={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>
			</form>
			<div className='flex sm:flex-row flex-col mb-2 sm:mb-0 justify-between'>
				<div className='sm:mb-0 mb-2'>
					Cantidad de libros
					<span className='font-semibold'> {matches.length}</span>
				</div>{' '}
				<div>
					Disponibles
					<span className='font-semibold'>
						{' '}
						{genre
							? availableBooksCounterFnc()
							: availableBooksCounter - readingList.length}
					</span>
				</div>
			</div>
			<ul className='grid sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-6 sm:gap-8'>
				{matches.map((book, index) => (
					<Book key={index} book={book} />
				))}
			</ul>
		</section>
	)
}

export default ListOfBooks
