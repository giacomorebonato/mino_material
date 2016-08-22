import firebase = require('firebase')

const config = {
	apiKey: 'AIzaSyCS9CaFeWXxc02Er45OgJJohy3kufewqHo',
	authDomain: 'mino-material.firebaseapp.com',
	databaseURL: 'https://mino-material.firebaseio.com',
	storageBucket: 'mino-material.appspot.com'
}
firebase.initializeApp(config)

export default firebase
