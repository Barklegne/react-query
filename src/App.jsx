// import FirstRequest from './axios/FirstRequest'
// import Headers from './axios/Headers'
// import PostRequest from './axios/PostRequest'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Highlights from './react-query/Highlights'

const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<h4>Highlights List</h4>
			<Highlights />
		</QueryClientProvider>
	)
}
