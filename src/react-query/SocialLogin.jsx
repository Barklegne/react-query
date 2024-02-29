// Remove the unused import statement for 'React'
import supabase from '../services/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useState } from 'react'

const SocialLogin = () => {
	const [signedIn, setSignedIn] = useState(false)

	const signInWithProvider = async (provider) => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
		})

		if (error) console.error('Error:', error)
		else return <h4>Logged in</h4> // Redirect to home page
	}

	supabase.auth.onAuthStateChange(async (event) => {
		if (event !== 'SIGNED_OUT') {
			console.log('User is signed in')
		} else {
			console.log('User is signed out')
		}
	})

	const signOutUser = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) console.error('Error:', error)
		else {
			console.log('User is signed out')
			return <h4>Logged out</h4>
		} // Redirect to home page
	}

	return (
		<div>
			<button onClick={() => signInWithProvider('google')}>
				Sign in with Google
			</button>
			<button onClick={() => signInWithProvider('facebook')}>
				Sign in with Facebook
			</button>
			<br /> <br />
			<button onClick={() => signOutUser()}>Sign out form Google</button>
		</div>
	)
}

export default SocialLogin
