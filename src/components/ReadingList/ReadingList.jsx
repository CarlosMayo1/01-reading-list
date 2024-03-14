import { useStore } from '../../store/StoreProvider'
import SelectedBook from './SelectedBook/SelectedBook'

const ReadingList = () => {
	const { readingList } = useStore()

	return (
		<section
			className={`${
				readingList.length === 0 && 'hidden'
			} w-1/4 border border-slate-300`}
		>
			<h1 className='text-3xl font-semibold text-center'>Lista de lectura</h1>
			<ul className='grid grid-cols-2 gap-4 p-2 px-4'>
				{readingList.map((book, index) => (
					<SelectedBook key={index} book={book} />
				))}
			</ul>
		</section>
	)
}

export default ReadingList
