import AuthStore from './AuthStore'
import ProfileStore from './ProfileStore'
import SnackbarStore from './SnackbarStore'
import UIStore from './UIStore'

const stores = {
	auth_store: new AuthStore(),
	profile_store: new ProfileStore(),
	snackbar_store: new SnackbarStore(),
	ui_store: new UIStore(),
	init (data: { [key: string]: Object }) {
		for (const key in data) {
			this[key].setData(data)
		}
	}	
}

Object.keys(stores).forEach((key) => {
	stores[key].dependencies.forEach((dependency) => {
		stores[key][dependency] = stores[dependency]
	})
})



export default stores
