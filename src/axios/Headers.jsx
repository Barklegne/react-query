import { useState } from 'react'
import axios from 'axios'

const url = 'https://icanhazdadjoke.com/'

const Headers = () => {
	const [joke, setJoke] = useState('Joke goes here..')

	const fetchData = async () => {
		try {
			const { data } = await axios.get(url, {
				// Request header
				headers: { Accept: 'application/json' },
			})
			// const data = response.data
			// console.log(data.joke)
			setJoke(data.joke)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<button onClick={fetchData}>Random jokes</button>
			<p>{joke}</p>
		</div>
	)
}

export default Headers
