import * as React from 'react'
import { Link } from 'react-toolbox/lib/link'
import { browserHistory } from 'react-router'
import {IconMenu, Menu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'

function DrawerLink (props: IDrawerLinkProps) {
	return (
		<MenuItem
			selected={window.location.pathname === props.to}
			icon={props.icon}
			onClick={() => {
				browserHistory.push(props.to)
			}}
			caption={props.label}
		/>
	)
}

interface IDrawerLinkProps {
	label: string
	to: string
	icon?: string
}

export default DrawerLink
