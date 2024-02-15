import { useEffect } from 'react'
import axios from 'axios'

// Limit 429 after 15 minutes
const url = 'https://course-api.com/react-store-products'

const FirstRequest = () => {
	const fetchData = async () => {
		try {
			const response = await axios(url)
			const data = response.data
			console.log(data)
		} catch (error) {
			console.log(error.response)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return <div>Axios resolver..</div>
}

export default FirstRequest
