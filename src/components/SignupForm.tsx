import * as React from 'react'
import Input from 'react-toolbox/lib/input'
import { Button, IconButton } from 'react-toolbox/lib/button'
import { observer } from 'mobx-react'
import stores from '../stores'
const { 
	Card, CardMedia, CardTitle, CardText, CardActions 
} = require('react-toolbox/lib/card')

function SignupForm (props: ISignupFormProps) {
	if (props.is_logged_in) { return null }

	return (
		<Card style={props.style}>
			<CardTitle>Signup</CardTitle>
			<form onSubmit={props.handle_submit}>
				<CardText>
					<Input 
						type='email' 
						label='Email' 
						onChange={props.handle_email_change}
					/>
					<Input 
						type='password' 
						label='Password'
						onChange={props.handle_password_change} 
					/>
				</CardText>
				<CardActions style={{flexDirection: 'row-reverse'}}>
					<Button primary raised ripple label='Submit' />
				</CardActions>											
			</form>
		</Card>		
	)
}

interface ISignupFormProps {
	signup_email: string
	signup_password: string
	handle_email_change (email: string): void
	handle_password_change (password: string): void
	handle_submit (e: React.FormEvent): void
	is_logged_in: boolean
	style?: Object
}

function binding (Component: React.StatelessComponent<ISignupFormProps>) {
	const { auth_store } = stores
	const binded = function (props) {
		return (
			<Component
				signup_email={auth_store.signup_email}
				signup_password={auth_store.signup_password}
				handle_email_change={(email) => {
					auth_store.set_signup_email(email)
				}}
				handle_password_change={(password) => {
					auth_store.set_signup_password(password)
				}}
				handle_submit={(e) => {
					e.preventDefault()
					auth_store.signup_submit()
				}}
				is_logged_in={auth_store.is_logged_in}
				{...props}
			/>
		)
	}

	return observer(binded)
}

export default binding(SignupForm)
