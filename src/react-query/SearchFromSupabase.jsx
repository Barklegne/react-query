import { useState } from 'react'
import { debounce } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { searchHighlightsByTitle } from '../services/apiSearch'

const SearchFromSupabase = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSetSearchTerm = debounce((value) => setSearchTerm(value), 500)

	const { data, isLoading, isError } = useQuery(
		['searchHighlightsByTitle', searchTerm],
		searchHighlightsByTitle,
		{
			enabled: searchTerm.length > 0, // Only run the query if the search term is not empty
		}
	)

	return (
		<div>
			<input
				type='text'
				onChange={(e) => debouncedSetSearchTerm(e.target.value)}
				placeholder='Search title..'
			/>

			{isLoading
				? 'Loading...'
				: isError
					? 'An error occurred'
					: data.map((highlight) => (
							<div key={highlight.question_bank_id}>
								{highlight.further_reading_title}
							</div>
						))}
		</div>
	)
}

export default SearchFromSupabase
