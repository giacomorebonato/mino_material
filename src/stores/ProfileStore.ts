import { observable, action, computed } from 'mobx'
import SnackbarStore from './SnackbarStore'
import AuthStore from './AuthStore'
import firebase from '../firebase'
import BaseStore from './BaseStore'

interface IStores {
	auth_store: AuthStore
	snackbar_store: SnackbarStore	
}

class ProfileStore extends BaseStore {
	stores: IStores = {
		auth_store: null,
		snackbar_store: null
	}

	@observable
	next_profile_image = ''

	tmp_profile_image_file: File = null	
	@observable
	
	profile_display_name = ''

	profile_ref: any = null
	storage_ref = firebase.storage ? firebase.storage().ref() : null

	@observable
	tmp_profile_image = ''

	@observable
	profile_image = ''

	@computed get is_restoreable () {
		return this.tmp_profile_image !== ''
	}	

	start_profile_subscription (current_user_uid: string) {
		const { snackbar_store } = this.stores
		this.profile_ref = firebase.database().ref(`/profiles/${current_user_uid}`)
		this.profile_ref.on('value', (snapshot) => {
			const data = snapshot.val()
			this.profile_display_name = data.display_name
		})

		this.storage_ref.child(`/profiles/${current_user_uid}`).getDownloadURL()
			.then((url) => {
				this.set_profile_image(url)
			})
			.catch((error: any) => {
				if (error.code !== 'storage/object-not-found') {
					snackbar_store.show_message(error.message)
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
		this.next_profile_image = ''
	}

	@action('SET_TMP_PROFILE_IMAGE')
	set_tmp_profile_image (image: string) {
		this.tmp_profile_image = image
	}		

	@action('CLEAR_TMP_PROFILE_IMAGE')
	clear_tmp_profile_image () {
		this.tmp_profile_image = ''
	}	

	@action('SET_NEXT_PROFILE_IMAGE')
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
	}

	@action('HANDLE_IMAGE_UPLOADE')
	handle_image_upload () {
		const { storage_ref } = this
		const { auth_store, snackbar_store } = this.stores
		const { current_user_uid } = auth_store
		const refPath = `/profiles/${current_user_uid}`
		const uploadTask = storage_ref.child(refPath).put(this.tmp_profile_image_file)

		uploadTask.on('state_changed', (snapshot) => {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done')
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused')
					break
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running')
					break
			}
		}, (err: { message: string }) => {
			snackbar_store.show_message(err.message)
		}, () => {
			const { downloadURL } = uploadTask.snapshot
			this.clear_tmp_profile_image()
			this.set_profile_image(downloadURL)
			snackbar_store.show_message('Upload successfull')			
		})
	}

	@action('HANDLE_PROFILE_SUBMIT')
	profile_submit () {
		const { uid } = firebase.auth().currentUser
		const { snackbar_store } = this.stores
		
		firebase.database().ref('profiles/' + firebase.auth().currentUser.uid).set({
			display_name: this.profile_display_name
		})
		.then(() => {
			snackbar_store.show_message('Saved successfully')
		})
		.catch(() => {
			snackbar_store.show_message('Problem saving data')
		})
	}	
}

export default ProfileStore
