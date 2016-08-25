import * as React from 'react'
import {
	Card, CardMedia, CardTitle, CardText, CardActions
} from 'react-toolbox/lib/card'
import { observer } from 'mobx-react'
import stores from '../../stores'
import ProfileImageActions from './ProfileImageActions'
import ProfileImage from './ProfileImage'
import ProfileDropzone from './ProfileDropzone'

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
				<ProfileImage 
					profile_image={profile_image} 
					next_profile_image={next_profile_image} 
				/>
				<ProfileDropzone 
					profile_image={profile_image} 
					next_profile_image={next_profile_image} 
					handle_image_drop={handle_image_drop} 
				/>
			</CardText>
			<ProfileImageActions />
		</Card>
	)
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
