import * as React from 'react'
import {
	Card, CardMedia, CardTitle, CardText, CardActions 
} from 'react-toolbox/lib/card'
import Input from 'react-toolbox/lib/input'
import { Button, IconButton } from 'react-toolbox/lib/button'
import { observer } from 'mobx-react'
import stores from '../stores'

function LoginForm (props: ILoginFormProps) {
	if (props.is_logged_in) { return null }

	return (
		<Card style={props.style}>
			<CardTitle>Login</CardTitle>
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

interface ILoginFormProps {
	login_email: string
	login_password: string
	handle_email_change (email: string): void
	handle_password_change (password: string): void
	handle_submit (e: React.FormEvent): void
	is_logged_in: boolean
	style?: Object
}

function binding (Component: React.StatelessComponent<ILoginFormProps>) {
	const { auth_store } = stores
	const binded = function (props) {
		return (
			<Component
				login_email={auth_store.login_email}
				login_password={auth_store.login_password}
				handle_email_change={(email) => {
					auth_store.set_login_email(email)
				}}
				handle_password_change={(password) => {
					auth_store.set_login_password(password)
				}}
				handle_submit={(e) => {
					e.preventDefault()
					auth_store.login_submit()
				}}
				is_logged_in={auth_store.is_logged_in}
				{...props}
			/>
		)
	}

	return observer(binded)
}

export default binding(LoginForm)
