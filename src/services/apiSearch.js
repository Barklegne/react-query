/* eslint-disable no-unused-vars */
import supabase from './supabase'

export const searchHighlightsByTitle = async ({ queryKey }) => {
	const [_key, title] = queryKey
	const { data, error } = await supabase
		.from('question_bank')
		.select(
			'question_bank_id, ai_model, difficulty_level, further_reading_title,explanation, topic (topic)'
		)
		.ilike('further_reading_title', `%${title}%`)

	// console.log(data)

	if (error) {
		console.error(error)
		throw new Error('Question bank could not be loaded')
	}

	return data
}
