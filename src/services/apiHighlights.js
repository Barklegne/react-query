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
		// .lte('question_bank_id', 10) // id <= 10 (the first 10 just for sample)
		.range(pageParam * 5, (pageParam + 1) * 5 - 1)

	if (error) {
		console.error(error)
		throw new Error('Question bank could not be loaded')
	}

	return { data, nextPage: pageParam + 1, total: count }
}

// returns highlights by difficulty level from question bank table static param
export const getHighlightsByDifficulty = async (difficulty) => {
	const { data, error } = await supabase
		.from('question_bank')
		.select(
			'question_bank_id, ai_model, difficulty_level, further_reading_title,explanation, topic (topic)'
		)
		.lte('question_bank_id', 20) // id <= 10 (the first 10 just for sample)
		.ilike('difficulty_level', difficulty)

	// console.log(data)

	if (error) {
		console.error(error)
		throw new Error('Question bank could not be loaded')
	}

	return data
}

// use this API call as a template for any GET_REQUEST to supabase database
// with a where statement
export const getHighlightsByDifficultyPaginated = async ({
	pageParam = 0,
	queryKey,
}) => {
	const [_key, where] = queryKey
	console.log('_key:', _key)
	console.log('where...', where.difficulty)

	const { data, error, count } = await supabase
		.from('question_bank')
		.select(
			'question_bank_id, ai_model, difficulty_level, further_reading_title,explanation, topic (topic)',
			{ count: 'exact' }
		)
		.lte('question_bank_id', 100) // id <= 10 (the first 10 just for sample)
		// .match(where)
		.ilike('difficulty_level', where.difficulty)
		.range(pageParam * 5, (pageParam + 1) * 5 - 1)

	if (error) {
		console.error(error)
		throw new Error('Could not filter highlights by level')
	}

	return { data, nextPage: pageParam + 1, total: count }
}