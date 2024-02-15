import axios from 'axios'
import { useState } from 'react'
const url = 'https://course-api.com/axios-tutorial-post'

const PostRequest = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await axios.post(url, { name, email })
			setName('')
			setEmail('')
			console.log(response.data)
		} catch (error) {
			console.log(error.response)
		}
		console.log(name, email)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				Axios Post Request
				<br />
				<br />
				<label htmlFor='name'>name</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<br />
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<br />
				<button type='submit'>Post</button>
			</form>
		</>
	)
}

export default PostRequest
