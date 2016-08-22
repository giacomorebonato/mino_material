import React = require('react')
import { Flex } from 'react-flex'
import LoginForm from '../components/LoginForm'
import ProfileForm from '../components/ProfileForm'
import SignupForm from '../components/SignupForm'
import LogoutButton from '../components/LogoutButton'
import ProfileImageForm from '../components/ProfileImageForm'
import PageLoader from '../components/PageLoader'

export class Profile extends React.Component<any, {loaded: boolean}> {
	render () {
		const { props } = this

		return (
			<Flex justifyContent='center'>
				<Flex
					column
					style={{maxWidth: '60rem', width: '100%'}}
				>
					<LoginForm />
					<SignupForm style={{marginTop: '2rem'}} />
					<ProfileForm style={{marginTop: '2rem'}} />
					<ProfileImageForm style={{marginTop: '2rem'}} />
					<LogoutButton />
				</Flex>
			</Flex>
		)
	}
}

export default PageLoader(Profile, 1000)
