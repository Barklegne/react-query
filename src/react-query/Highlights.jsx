import { useMemo, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getHighlights } from '../services/apiHighlights'

// Load more functionality with search with whats currently loaded
// TODO: Search doesn't work with unloaded data from the server only workers from whats currently rendered.

// TODO: search from the api needs to be implmented where getHighlights API needs to accept params.
const Highlights = () => {
	const [search, setSearch] = useState('')

	const {
		isLoading,
		isError,
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['highlights'],
		queryFn: getHighlights,

		getNextPageParam: (lastPage, allPages) => {
			const fetchedItems = allPages.reduce(
				(total, page) => total + page.data.length,
				0
			)
			return fetchedItems < lastPage.total ? lastPage.nextPage : undefined
		},
	})

	const filteredData = useMemo(() => {
		if (!data) return []
		return data.pages
			.flatMap((page) => page.data)
			.filter((highlight) =>
				highlight.further_reading_title.toLowerCase().includes(search.toLowerCase())
			)
	}, [data, search])

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Error: {error.message}</p>

	return (
		<div>
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder='Search...'
			/>
			<div
				style={{ height: '800px', backgroundColor: 'skyblue', overflowY: 'auto' }}
			>
				{filteredData.map((highlight) => {
					const {
						question_bank_id: id,
						further_reading_title: readingTitle,
						difficulty_level: level,
						topic: { topic: topicTitle },
					} = highlight
					return (
						<p key={id}>
							Topic: {topicTitle} | {readingTitle} | {level}
						</p>
					)
				})}
				<div>
					{hasNextPage && (
						<button
							onClick={() => fetchNextPage()}
							disabled={!hasNextPage || isFetchingNextPage}
						>
							{isFetchingNextPage
								? 'Loading more...'
								: hasNextPage
									? 'Load More'
									: 'Nothing more to load'}
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

// const Highlights = () => {
// 	const {
// 		isLoading,
// 		data: highlights,
// 		error,
// 	} = useQuery({
// 		queryKey: ['highlights'],
// 		queryFn: getHighlights,
// 	})

// 	if (isLoading) return <p>Loading...</p>
// 	console.log(highlights)

// 	return (
// 		<div>
// 			<div
// 				style={{ height: '800px', backgroundColor: 'skyblue', overflowY: 'auto' }}
// 			>
// 				{highlights.map((highlight) => {
// 					// Destructuring
// 					const {
// 						question_bank_id: id, // destructuring and giving alias
// 						further_reading_title: readingTitle,
// 						difficulty_level: level,
// 						topic: { topic: topicTitle }, //destructuring nested value & giving alias
// 					} = highlight
// 					return (
// 						<p key={id}>
// 							Topic: {topicTitle} | {readingTitle} | {level}
// 						</p>
// 					)
// 				})}
// 			</div>
// 			<button>Load more</button>
// 		</div>
// 	)
// }

export default Highlights
