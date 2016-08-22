import * as React from 'react'
import {
	Card, CardMedia, CardTitle, CardText, CardActions 
} from 'react-toolbox/lib/card'
import Input from 'react-toolbox/lib/input'
import { Button, IconButton } from 'react-toolbox/lib/button'
import { observer } from 'mobx-react'
import stores from '../stores'

export function ProfileForm (props: IProfileFormProps) {
	if (!props.is_logged_in) {
		return null
	}

	return (
		<Card style={props.style}>
			<CardTitle>Profile</CardTitle>
			<form onSubmit={props.handle_submit}>
				<CardText>
					<Input type='text' label='Display name' value={props.display_name} onChange={props.handle_display_name_change} />
				</CardText>
				<CardActions style={{flexDirection: 'row-reverse'}}>
					<Button primary raised ripple label='submit' />
				</CardActions>
			</form>
		</Card>
	)
}

interface IProfileFormProps {
	display_name: string
	handle_display_name_change (display_name: string)
	handle_submit (e: React.FormEvent)
	is_logged_in: boolean
	style?: Object
}

function binding (Component: React.StatelessComponent<IProfileFormProps>) {
	const { auth_store, profile_store } = stores
	const binded = function (props) {
		return (
			<Component
				display_name={profile_store.profile_display_name}
				handle_display_name_change={(display_name) => {
					profile_store.set_profile_display_name(display_name)
				}}
				handle_submit={(e) => {
					e.preventDefault()
					profile_store.profile_submit()
				}}
				is_logged_in={auth_store.is_logged_in}
			/>
		)
	}

	return observer(binded)
}

export default binding(ProfileForm)
