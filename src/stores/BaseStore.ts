class BaseStore {
	dependencies: Array<string> = []
	setData (data: Object) {
		Object.assign(this, data)
	}
}

export default BaseStore
