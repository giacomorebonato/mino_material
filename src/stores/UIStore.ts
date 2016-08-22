import { action, observable } from 'mobx'
import BaseStore from './BaseStore'

class UIStore extends BaseStore {
	@observable
	is_nav_drawer_active = false

	@action('TOGGLE_DRAWER_ACTIVE')
	toggle_drawer_active () {
		this.is_nav_drawer_active = !this.is_nav_drawer_active
	}
}

export default UIStore
