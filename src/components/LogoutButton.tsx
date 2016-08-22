import * as React from 'react'
import { Button, IconButton } from 'react-toolbox/lib/button'
import stores from '../stores'
import { observer } from 'mobx-react'

function LogoutButton (props: ILogoutButtonProps) {
	if (!props.is_logged_in) { return null }

	return (
		<Button
			style={{width: '100%', marginTop: '2rem'}}
			accent
			onClick={() => {
				stores.auth_store.logout()
			}}
		>
			Logout
		</Button>
	)
}

interface ILogoutButtonProps {
	handle_logout ()
	is_logged_in: boolean
}

function binding (Component: React.StatelessComponent<ILogoutButtonProps>) {
	const { auth_store } = stores
	const binded = function (props) {
		return (
			<Component
				handle_logout={() => {
					auth_store.logout()
				}}
				is_logged_in={auth_store.is_logged_in}
			/>
		)
	}

	return observer(binded)
}

export default binding(LogoutButton)
