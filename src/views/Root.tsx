import React = require('react')
import DrawerLink from '../components/DrawerLink'
import { observer } from 'mobx-react'
import { Flex } from 'react-flex'
import stores from '../stores'
import { 
	Navigation, AppBar, Layout, NavDrawer, Panel, Snackbar, 
	IconButton, IconMenu, Menu, MenuItem, MenuDivider 
} from 'react-toolbox'

export class Root extends React.Component<IRootProps, any> {
	render () {
		const { props } = this

		return (
			<Layout>
				<NavDrawer
					active={props.is_nav_drawer_active}
					permanentAt='xl'
					onOverlayClick={props.toggle_drawer_active}
				>
					<Menu className='just-menu' active outline={false}>
						<DrawerLink icon='home' label='Home' to='/' />
						<DrawerLink icon='person_outline' label='Profile' to='/profile' />
						<DrawerLink icon='assistant' label='About' to='/about' />
					</Menu>
				</NavDrawer>
				<Panel>
					<AppBar fixed>
						<IconButton
							className='btn-menu'
							icon='menu'
							inverse
							onClick={props.toggle_drawer_active}
						/>
					</AppBar>
					<div
						style={{
							boxSizing: 'border-box',
							height: '100%',
							overflowY: 'auto',
							padding: '7rem 1.8rem 1.8rem 1.8rem'
						}}
					>
						{props.children}

						{
							(
								() => {
									if (process.env.NODE_ENV === 'development') {
										const DevTools = require('mobx-react-devtools').default

										return <DevTools position={{bottom: 0, right: 20}} />
									}
								}
							)()
						}
					</div>
					<Snackbar
						action={props.snackbar_action}
						active={props.snackbar_active}
						label={props.snackbar_label}
						type={props.snackbar_type}
					/>
				</Panel>
			</Layout>
		)
	}
}

export interface IRootProps {
	is_nav_drawer_active: boolean
	toggle_drawer_active (): void
	snackbar_action: string
	snackbar_active: boolean
	snackbar_label: string
	snackbar_type: 'accept' | 'cancel' | 'warning'
}

function binding (Component: React.ComponentClass<IRootProps>) {
	const { snackbar_store, ui_store } = stores

	const binded = function (props) {
		return (
			<Component
				is_nav_drawer_active={ui_store.is_nav_drawer_active}
				toggle_drawer_active={() => {
					ui_store.toggle_drawer_active()
				}}
				snackbar_action={snackbar_store.action}
				snackbar_active={snackbar_store.active}
				snackbar_label={snackbar_store.label}
				snackbar_type={snackbar_store.type}
				children={props.children}
			/>
		)
	}

	return observer(binded)
}

export default binding(Root)
