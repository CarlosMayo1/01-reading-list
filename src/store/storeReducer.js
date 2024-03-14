import {
	FETCH_DATA_FROM_DATABASE,
	ADD_BOOK_TO_READING_LIST,
	REMOVE_BOOK_FROM_READING_LIST,
	AVAILABLE_BOOKS_COUNTER,
	SELECTED_BOOK_INDEX,
} from '../constants/constants'

const initialStore = {
	library: [],
	readingList: JSON.parse(localStorage.getItem('readList')) ?? [],
	bookIndex: 0,
	libraryCounter: 0,
	availableBooksCounter: 0,
}

const storeReducer = (state, action) => {
	switch (action.type) {
		case FETCH_DATA_FROM_DATABASE:
			return {
				...state,
				library: action.payload.data,
				libraryCounter: action.payload.counter,
				availableBooksCounter: action.payload.available,
			}
		case ADD_BOOK_TO_READING_LIST:
			return {
				...state,
				readingList: action.payload,
			}
		case REMOVE_BOOK_FROM_READING_LIST:
			return {
				...state,
				readingList: action.payload,
			}
		case AVAILABLE_BOOKS_COUNTER:
			return {
				...state,
				availableBooksCounter: action.payload,
			}

		case SELECTED_BOOK_INDEX:
			return {
				...state,
				bookIndex: action.payload,
			}

		default:
			return state
	}
}

export { initialStore }
export default storeReducer
