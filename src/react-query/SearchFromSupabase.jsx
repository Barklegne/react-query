import { useState } from 'react'
import { debounce } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { searchHighlightsByTitle } from '../services/apiSearch'

const SearchFromSupabase = () => {
	const [searchTerm, setSearchTerm] = useState('')
	// Debounce the setSearchTerm function to prevent the query from being fired on every keystroke
	const debouncedSetSearchTerm = debounce((value) => setSearchTerm(value), 3000)

	const { data, isLoading, isError, isFetching } = useQuery(
		['searchHighlightsByTitle', searchTerm],
		searchHighlightsByTitle,
		{
			enabled: searchTerm.length > 3, // Only run the query if the search term is not empty
		}
	)

	return (
		<div>
			<h3>Search via React Query & Supabase</h3>
			<input
				type='text'
				onChange={(e) => debouncedSetSearchTerm(e.target.value)} // Debounce the setSearchTerm function
				placeholder='Search title..'
			/>

			{/* Chaining conditional statements  */}
			{searchTerm.length <= 3 ? (
				<p>AI is waiting...</p>
			) : isLoading || isFetching ? (
				<p>AI is thinking...</p>
			) : isError ? (
				<p>An error occurred</p>
			) : data.length > 0 ? (
				data.map((highlight) => (
					<div key={highlight.question_bank_id}>
						{highlight.further_reading_title}
					</div>
				))
			) : (
				<p>ChatGPT 4.0 did not find anything</p>
			)}
		</div>
	)
}

export default SearchFromSupabase
