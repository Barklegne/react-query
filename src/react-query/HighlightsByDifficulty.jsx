import { getHighlightsByDifficulty } from '../services/apiHighlights'
import { useQuery } from '@tanstack/react-query'

const HighlightsByDifficulty = () => {
	const difficulty = 'Easy'

	const { data, error, isLoading, isError } = useQuery(
		['highlightsByDifficulty', difficulty],
		() => getHighlightsByDifficulty(difficulty)
	)

	if (isLoading) {
		return <span>Loading...</span>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}

	// Render the question bank
	return (
		<>
			<h3>Highlights by `Difficulty level` unpaginated</h3>
			<ul>
				{data.map((highlight) => (
					<div className='' key={highlight.question_bank_id}>
						<li>
							Difficulty: {highlight.difficulty_level} Highlight:
							{highlight.further_reading_title}
						</li>{' '}
						<br />
					</div>
				))}
			</ul>
		</>
	)
}

export default HighlightsByDifficulty
