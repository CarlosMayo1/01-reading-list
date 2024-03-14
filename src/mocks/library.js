import books from './books.json'

export async function getBooks() {
	const library = await new Promise(resolve => {
		setTimeout(() => {
			resolve(books.library.map(book => book.book))
		}, 1000)
	})
	return library
}
