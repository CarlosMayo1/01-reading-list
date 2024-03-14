import { useState } from 'react'
import { IconBook, IconGhost2 } from '@tabler/icons-react'
import { useStore } from '../../store/StoreProvider'
import SelectedBook from './SelectedBook/SelectedBooks'

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { readingList } = useStore()

	return (
		<header className='shadow-md bg-white'>
			<div className='w-full md:container md:max-w-7xl m-auto flex  justify-between items-center py-4 px-2 sm:px-8'>
				<div className='w-full text-xl sm:text-3xl font-semibold'>
					Lazpe Editorial
				</div>
				<div className='flex flex-col relative items-end w-[250px] sm:w-[340px] rounded-lg-md'>
					<button
						className='relative bg-none mr-4 0 font-medium'
						onClick={() => setIsOpen(prevState => !prevState)}
					>
						<div
							className={`absolute ${
								readingList.length > 0 ? 'inline-flex' : 'hidden'
							} items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-red-500 border-2 border-white rounded-full -top-2.5 -end-2.5 dark:border-gray-900`}
						>
							{readingList.length}
						</div>
						<span className='sr-only'>Notifications</span>
						<IconBook size={35} stroke={1} />
					</button>
					{isOpen && (
						<div className='bg-[#fffffff1] absolute top-10 left-18 2xl:left-28 flex flex-col rounded-lg p-2 w-full shadow-2xl'>
							<ul>
								{readingList.length === 0 ? (
									<li className='flex flex-col items-center py-3'>
										<IconGhost2 size={35} stroke={1.5} className='mb-4' />
										<h4 className='text-base sm:text-lg font-semibold'>
											No books added
										</h4>
									</li>
								) : (
									<SelectedBook />
								)}
							</ul>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
