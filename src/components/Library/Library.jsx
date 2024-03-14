// components
import ListOfBooks from '../ListOfBooks/ListOfBooks'
import BookInformation from '../BookInformation/BookInformation'

const Library = () => {
	return (
		<main className='max-w-screen-lg  2xl:max-w-screen-2xl m-auto'>
			<section className='grid lg:grid-cols-[1fr,0.5fr] gap-8 p-4'>
				<ListOfBooks />
				<BookInformation />
			</section>
		</main>
	)
}

export default Library
