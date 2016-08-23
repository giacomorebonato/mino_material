import * as React from 'react'
import {
	Card, CardMedia, CardTitle, CardText, CardActions
} from 'react-toolbox/lib/card'
import  Dropzone = require('react-dropzone')
import { observer } from 'mobx-react'
import stores from '../../stores'
import ProfileImageActions from './ProfileImageActions'

export function ProfileImageForm (props: IProfileImageFormProps) {
	if (!props.is_logged_in) { return null }

	const { 
		profile_image, next_profile_image, handle_image_drop, handle_image_upload,
		is_restoreable
	} = props

	return (
		<Card style={props.style}>
			<CardTitle>Profile image</CardTitle>
			<CardText>
				{render_image(profile_image, next_profile_image)}
				{render_dropzone(profile_image, next_profile_image, handle_image_drop)}
			</CardText>
			<ProfileImageActions />
		</Card>
	)
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
	handle_image_drop (files: Array<File>): void
	handle_image_upload (): void
	style?: any
}

function binding (Component: React.StatelessComponent<IProfileImageFormProps>) {
	const { auth_store, profile_store } = stores
	const binded = function (props) {
		return (
			<Component
				profile_image={profile_store.profile_image}
				next_profile_image={profile_store.next_profile_image}
				handle_image_drop={(files) => {
					profile_store.handle_file_drop(files)
				}}
				handle_image_upload={() => { profile_store.handle_image_upload() }}
				{...props}
				is_logged_in={auth_store.is_logged_in}
				is_restoreable={profile_store.is_restoreable}
			/>
		)
	}

	return observer(binded)
}


export default binding(ProfileImageForm)
