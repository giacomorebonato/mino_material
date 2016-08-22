import { action, observable } from 'mobx'
import BaseStore from './BaseStore'

class SnackbarStore extends BaseStore {
	@observable
	action = ''

	@observable
	active = false

	@observable
	icon = ''

	@observable
	label = ''

	@observable
	type: 'accept' | 'warning' | 'cancel' = 'accept'

	show_message (
		label: string,
		data: ISnackbarProps = { action: '', icon: 'question_answer', type: 'accept' }
	) {
		this.label = label
		this.icon = data.icon
		this.type = data.type
		this.action = data.action

		this.show_snackbar()
		setTimeout(() => {
			this.hide_snackbar()
		}, 5000)
	}

	@action('SHOW_SNACKBAR')
	show_snackbar () {
		this.active = true
	}

	@action('HIDE_SNACKBAR')
	hide_snackbar () {
		this.active = false
	}
}

interface ISnackbarProps {
	action: string
	icon: string
	type: 'accept' | 'warning' | 'cancel'
}

export default SnackbarStore
