const SmsTest = () => {
	const fetchData = () => {
		// Use the relative path directly as a string
		const apiUrl = '/api/challenge'

		// Define your query parameters here
		const params = new URLSearchParams({
			from: '',
			sender: '',
			to: '+251911150963',
			ps: '',
			sb: 0,
			sa: 0,
			ttl: 0,
			len: 4,
			t: 0,
		})

		const fullUrl = `${apiUrl}?${params}`
		console.log(fullUrl)
		fetch(fullUrl, {
			method: 'GET', // The method is GET
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiMEhBeGhoY2l2YlJHSlQ3VXFRMmlFSDlocFZES1BHckEiLCJleHAiOjE4NjY5NDgwMTAsImlhdCI6MTcwOTA5NTIxMCwianRpIjoiNTM2NmYyN2UtMDFmNC00NmVkLTkyNWEtMDA2Mzc1YWU1YzcyIn0.A5E9M_ST_wfXfEpdrE-hlps8Khio3ia-uxKVttT8iHc',
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.text()
			})
			.then((data) => {
				if (data) {
					return JSON.parse(data)
				} else {
					return {}
				}
			})
			.then((json) => {
				console.log(json)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	return (
		<div>
			<button onClick={fetchData}>Click Me to send SMS</button>
		</div>
	)
}

export default SmsTest
