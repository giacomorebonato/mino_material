import React = require('react')
import Home from '../Home'
import { expect } from 'chai'
import ReactDOM = require('react-dom/server')
import ReactTestUtils = require('react-addons-test-utils')


describe('Home component', () => {
	let rendered: React.Component<any, any>
	before('render and locate element', () => {
    rendered = ReactTestUtils.renderIntoDocument(<Home />) as React.Component<any, any>
  })

	it('title should be home', () => {
    const title = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'h1')

		expect(title.innerHTML).to.equal('Home')
	})

	it('should render with title', () => {
		const markup = ReactDOM.renderToStaticMarkup(<Home />)
		expect(markup).to.contains('<h1>Home</h1>')
	})
})
