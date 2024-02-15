import supabase from './supabase'

// returns core concepts highlights from question bank table
// export const getHighlights = async () => {
// 	const { data, error } = await supabase
// 		.from('question_bank')
// 		.select(
// 			'question_bank_id, ai_model, difficulty_level, further_reading_title,explanation, topic (topic)'
// 		)
// 		.lte('question_bank_id', 100) // id <= 10 (the first 10 just for sample)

// 	if (error) {
// 		console.error(error)
// 		throw new Error('Question bank could not be loaded')
// 	}

// 	return data
// }

export const getHighlights = async ({ pageParam = 0 }) => {
	const { data, error, count } = await supabase
		.from('question_bank')
		.select(
			'question_bank_id, ai_model, difficulty_level, further_reading_title,explanation, topic (topic)',
			{ count: 'exact' }
		)
		.lte('question_bank_id', 6) // id <= 10 (the first 10 just for sample)
		.range(pageParam * 2, (pageParam + 1) * 2 - 1)

	if (error) {
		console.error(error)
		throw new Error('Question bank could not be loaded')
	}

	return { data, nextPage: pageParam + 1, total: count }
}
