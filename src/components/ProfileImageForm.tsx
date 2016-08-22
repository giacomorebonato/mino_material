import * as React from 'react'
import {
	Card, CardMedia, CardTitle, CardText, CardActions
} from 'react-toolbox/lib/card'
import Dropzone = require('react-dropzone')
import { observer } from 'mobx-react'
import { Button, IconButton } from 'react-toolbox/lib/button'
import stores from '../stores'

export function ProfileImageForm (props: IProfileImageFormProps) {
	if (!props.is_logged_in) { return null }

	const { 
		clear_images, profile_image, next_profile_image, handle_image_drop, handle_image_upload,
		restore_images, is_restoreable
	} = props

	return (
		<Card style={props.style}>
			<CardTitle>Profile image</CardTitle>
			<CardText>
				{render_image(profile_image, next_profile_image)}
				{render_dropzone(profile_image, next_profile_image, handle_image_drop)}
			</CardText>
			<CardActions style={{flexDirection: 'row-reverse'}}>
				{render_cancel_button(is_restoreable, restore_images)}
				{render_btn_change_image(profile_image, clear_images)}
				{render_btn_upload(next_profile_image, handle_image_upload)}
			</CardActions>
		</Card>
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

function render_image (profile_image: string, tmp_profile_image: string) {
	const image = tmp_profile_image || profile_image

	if (image) {
		return <img src={image} style={{width: '100%'}} />
	}

	return null
}

function render_dropzone (profile_image: string, tmp_profile_image: string, handle_image_drop: any) {
	if (!profile_image && !tmp_profile_image) {
		return (
			<Dropzone
				maxSize={2000}
				multiple={false}
				accept='image/*'
				onDrop={handle_image_drop}
				style={{
					width: '100%',
					height: '200px',
					border: '0.5rem dashed rgb(102, 102, 102)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<p>Upload your image</p>
			</Dropzone>
		)
	}

	return null
}

interface IProfileImageFormProps {
	is_logged_in: boolean
	is_restoreable: boolean
	next_profile_image: string
	profile_image: string
	clear_images (): void
	handle_image_drop (files: Array<File>): void
	handle_image_upload (): void
	restore_images (): void
	style?: any
}

function binding (Component: React.StatelessComponent<IProfileImageFormProps>) {
	const { auth_store, profile_store } = stores
	const binded = function (props) {
		return (
			<Component
				profile_image={profile_store.profile_image}
				next_profile_image={profile_store.next_profile_image}
				clear_images={() => {
					profile_store.clear_images()
				}}
				handle_image_drop={(files) => {
					profile_store.handle_file_drop(files)
				}}
				handle_image_upload={() => { profile_store.handle_image_upload() }}
				{...props}
				is_logged_in={auth_store.is_logged_in}
				is_restoreable={profile_store.is_restoreable}
				restore_images={() => {
					profile_store.restore_images()
				}}
			/>
		)
	}

	return observer(binded)
}


export default binding(ProfileImageForm)
