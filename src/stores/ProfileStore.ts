import { observable, action, computed } from 'mobx'
import SnackbarStore from './SnackbarStore'
import AuthStore from './AuthStore'
import firebase from '../firebase'
import BaseStore from './BaseStore'

class ProfileStore extends BaseStore {
	auth_store: AuthStore
	snackbar_store: SnackbarStore

	@observable
	next_profile_image = ''

	tmp_profile_image_file: File = null	
	@observable
	
	profile_display_name = ''

	profile_ref: any = null
	storage_ref = firebase.storage().ref()

	@observable
	tmp_profile_image = ''

	@observable
	profile_image = ''

	constructor () {
		super()
		this.dependencies = ['auth_store', 'snackbar_store']
	}

	@computed get is_restoreable () {
		return !!this.tmp_profile_image
	}	

	start_profile_subscription (current_user_uid: string) {
		this.profile_ref = firebase.database().ref(`/profiles/${current_user_uid}`)
		this.profile_ref.on('value', (snapshot) => {
			const data = snapshot.val()
			this.profile_display_name = data.display_name
		})

		this.storage_ref.child(`/profiles/${current_user_uid}`).getDownloadURL()
			.then((url) => {
				this.set_profile_image(url)
			})
			.catch((error: { message: string, code: string }) => {
				if (error.code !== 'storage/object-not-found') {
					this.snackbar_store.show_message(error.message)
				}
			})		
	}

	stop_profile_subscription () {
		this.profile_ref.off()
		this.profile_ref = null		
	}

	@action('SET_PROFILE_IMAGE')
	set_profile_image (image_url: string) {
		this.profile_image = image_url
	}

	@action('SET_PROFILE_DISPLAY_NAME')
	set_profile_display_name (display_name: string) {
		this.profile_display_name = display_name
	}	

	@action('CLEAR_IMAGES') 
	clear_images () {
		this.tmp_profile_image = this.profile_image

		this.set_profile_image('')
		this.set_next_profile_image('')
	}

	@action('RESTORE_IMAGE')
	restore_images () {
		this.set_profile_image(this.tmp_profile_image)
		this.tmp_profile_image = ''
	}		

	@action('CLEAR_TMP_PROFILE_IMAGE')
	clear_tmp_profile_image () {
		this.tmp_profile_image = ''
	}	

	@action('SET_TMP_PROFILE_IMAGE')
	set_next_profile_image (dataUrl: string) {
		this.next_profile_image = dataUrl
	}	

	handle_file_drop (files: Array<File>) {
		const [file] = files
		const reader = new FileReader()
		reader.onloadend = () => {
			this.set_next_profile_image(reader.result)
		}
		reader.readAsDataURL(file)

		this.tmp_profile_image_file = file
	}

	@action('HANDLE_IMAGE_UPLOADE')
	handle_image_upload () {
		const { current_user_uid } = this.auth_store
		this.storage_ref.child(`/profiles/${current_user_uid}`)
			.put(this.tmp_profile_image_file)
			.then(() => {
				this.clear_tmp_profile_image()
				this.snackbar_store.show_message('Upload successfull')
			})
			.catch((err) => {
				this.snackbar_store.show_message(err.message)
			})
	}

	@action('HANDLE_PROFILE_SUBMIT')
	profile_submit () {
		const { uid } = firebase.auth().currentUser
		firebase.database().ref('profiles/' + firebase.auth().currentUser.uid).set({
			display_name: this.profile_display_name
		})
		.then(() => {
			this.snackbar_store.show_message('Saved successfully')
		})
		.catch(() => {
			this.snackbar_store.show_message('Problem saving data')
		})
	}	
}

export default ProfileStore
