import * as React from 'react'
import  Dropzone = require('react-dropzone')

function ProfileDropzone (props: IProfileDropzone) {
	const { profile_image, next_profile_image, handle_image_drop } = props

	if (!profile_image && !next_profile_image) {
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

interface IProfileDropzone {
	profile_image?: string 
	next_profile_image?: string 
	handle_image_drop: any
}

export default ProfileDropzone
