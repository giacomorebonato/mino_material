import Home from './views/Home'
import About from './views/About'
import Profile from './views/Profile'
import Root from './views/Root'

const routes = {
  path: '/',
  component: Root,
  indexRoute: { component: Home },
  childRoutes: [
    { path: 'about', component: About },
		{ path: 'profile', component: Profile }
  ]
}

export default routes
