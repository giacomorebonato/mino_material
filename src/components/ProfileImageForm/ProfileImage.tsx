import * as React from 'react'

function ProfileImage (props: IProfileImageProps) {
	const { next_profile_image, profile_image } = props
	const image = next_profile_image || profile_image

	if (image) {
		return <img src={image} style={{width: '100%'}} />
	}

	return null
}

interface IProfileImageProps {
	next_profile_image?: string
	profile_image?: string
}

export default ProfileImage
