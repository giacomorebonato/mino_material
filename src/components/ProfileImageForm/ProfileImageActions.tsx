import * as React from 'react'
import {
	Card, CardMedia, CardTitle, CardText, CardActions
} from 'react-toolbox/lib/card'
import { Button, IconButton } from 'react-toolbox/lib/button'
import stores from '../../stores'
import { observer } from 'mobx-react'

function ProfileImageActions (props: IProfileImageProps) {
	const { 
		is_restoreable, restore_images, profile_image, 
		clear_images, next_profile_image, handle_image_upload 
	} = props

	return (
		<CardActions style={{flexDirection: 'row-reverse'}}>
			{render_cancel_button(is_restoreable, restore_images)}
			{render_btn_change_image(profile_image, clear_images)}
			{render_btn_upload(next_profile_image, handle_image_upload)}
		</CardActions>		
	)	
}

function render_cancel_button (is_restoreable: boolean, restore_images: () => void) {
	if (!is_restoreable) { return null }
	
	return <Button style={{marginLeft: '1rem'}} primary raised ripple label='Cancel' onClick={restore_images} />
}

function render_btn_change_image (profile_image: string, clear_images: () => void) {
	if (!profile_image) { return null }

	return <Button style={{marginLeft: '1rem'}} primary raised ripple label='Change' onClick={clear_images} />
}

function render_btn_upload (tmp_profile_image: string, handle_image_upload) {
	if (!tmp_profile_image) { return null }

	return <Button style={{marginLeft: '1rem'}} primary raised ripple label='Upload' onClick={handle_image_upload} />
}

interface IProfileImageProps {
	is_restoreable: boolean
	profile_image: string
	next_profile_image: string

	restore_images (): void
	clear_images (): void
	handle_image_upload (): void
}

function binding (Component: React.StatelessComponent<IProfileImageProps>) {
	const { profile_store, auth_store } = stores
	const binded = function (props) {
		return (
			<Component
				profile_image={profile_store.profile_image}
				next_profile_image={profile_store.next_profile_image}
				clear_images={() => {
					profile_store.clear_images()
				}}
				handle_image_upload={() => { profile_store.handle_image_upload() }}
				{...props}
				is_restoreable={profile_store.is_restoreable}
				restore_images={() => {
					profile_store.restore_images()
				}}
			/>
		)
	}

	return observer(binded)	
}

export default binding(ProfileImageActions)
