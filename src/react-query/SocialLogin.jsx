// Remove the unused import statement for 'React'
import supabase from '../services/supabase'

const SocialLogin = () => {
	const signIn = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
		})

		if (error) console.error('Error:', error)
		else {
			// return <h2>LOGGED IN</h2>
			// console.log('Data:', data)
			// console.log('User:', supabase.auth.user())
		}
	}

	return <button onClick={signIn}>Sign in with Google</button>
}

export default SocialLogin
