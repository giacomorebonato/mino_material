import { action, computed, autorun, observable } from 'mobx'
import firebase from '../firebase'
import ProfileStore from './ProfileStore'
import SnackbarStore from './SnackbarStore'
import BaseStore from './BaseStore'

class AuthStore extends BaseStore {
	snackbar_store: SnackbarStore
	profile_store: ProfileStore

	constructor () {
		super()
		this.dependencies = ['profile_store', 'snackbar_store']
		
		firebase.auth().onAuthStateChanged((user) => {
			this.set_current_user_uid(user ? user.uid : null)
		})
	}

	@observable
	current_user_uid = ''

	@observable
	login_email = ''

	@observable
	login_password = ''

	@observable
	signup_email = ''

	@observable
	signup_password = ''

	@action('SET_CURRENT_USER_UID')
	set_current_user_uid (uid: string) {
		const uid_tmp = this.current_user_uid
		this.current_user_uid = uid

		if (this.current_user_uid) {
			this.profile_store.start_profile_subscription(this.current_user_uid)
		} else {
			if (uid_tmp) {
				this.profile_store.stop_profile_subscription()
			}
		}
	}

	@computed get is_logged_in () {
		return this.current_user_uid !== null
	}

	@action('set_LOGIN_EMAIL')
	set_login_email (email: string) {
		this.login_email = email
	}

	@action('SET_LOGIN_PASSWORD')
	set_login_password (password: string) {
		this.login_password = password
	}

	@action('SET_SIGNUP_EMAIL')
	set_signup_email (email: string) {
		this.signup_email = email
	}

	@action('SET_SIGNUP_PASSWORD')
	set_signup_password (password: string) {
		this.signup_password = password
	}

	logout () {
		firebase.auth().signOut()
	}

	login_submit () {
		const { login_email, login_password } = this
		firebase.auth().signInWithEmailAndPassword(login_email, login_password)
			.then(() => {
				this.snackbar_store.show_message('Login successfull')
			})
			.catch((error: Error) => {
				this.snackbar_store.show_message(error.message)
			})
	}

	signup_submit () {
		const { signup_email, signup_password } = this

		firebase.auth().createUserWithEmailAndPassword(signup_email, signup_password)
			.then(() => {
				this.snackbar_store.show_message('Login successfull')
			})
			.catch((error: Error) => {
				this.snackbar_store.show_message(error.message)
			})
	}
}

interface IUserData {
	email: string
	uid: string
}

export default AuthStore
