import './styles/global.scss'
import React = require('react')
import { render } from 'react-dom'
import { browserHistory, Router } from 'react-router'
import routes from './routes'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/assets/sw.js', { scope: '/assets/' })
		.then((registration) => {
			console.log('Service Worker Registered')
		})

	navigator.serviceWorker.ready.then((registration) => {
		console.log('Service Worker Ready')
	})
}


render(
	<Router routes={routes} history={browserHistory} />,
	document.getElementById('app')
)
