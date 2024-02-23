import { getHighlightsByDifficultyPaginated } from '../services/apiHighlights'
import { useInfiniteQuery } from '@tanstack/react-query'

const HighlightsByDifficultyPaginated = () => {
	const where = { difficulty: 'easy' }
	// const difficulty = 'easy'
	const {
		isLoading,
		isError,
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['highlightsByDifficulty', where],
		queryFn: getHighlightsByDifficultyPaginated,

		getNextPageParam: (lastPage, allPages) => {
			const fetchedItems = allPages.reduce(
				(total, page) => total + page.data.length,
				0
			)
			return fetchedItems < lastPage.total ? lastPage.nextPage : undefined
		},
	})

	if (isLoading) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	// Render the question bank
	return (
		<>
			<h3>Highlights by `Difficulty level` Paginated</h3>
			<ul>
				<ul>
					{data.pages.flatMap((page) =>
						page.data.map((highlight) => {
							const {
								question_bank_id: id,
								further_reading_title: readingTitle,
								difficulty_level: level,
								topic: { topic: topicTitle },
							} = highlight
							return (
								<span key={id}>
									{/* <li >{highlight..}</li> */}
									<li>
										Title:- {readingTitle} Difficulty: {level}{' '}
									</li>
								</span>
							)
						})
					)}
					{/* <li>hello</li> */}
				</ul>
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
			</ul>
		</>
	)
}

export default HighlightsByDifficultyPaginated
