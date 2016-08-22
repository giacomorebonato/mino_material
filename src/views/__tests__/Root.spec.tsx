import React = require('react')
import { Root, IRootProps } from '../Root'
import chai = require('chai')
import chaiEnzyme = require('chai-enzyme')
import ReactDOM = require('react-dom/server')
import ReactTestUtils = require('react-addons-test-utils')
import { mount, shallow } from 'enzyme'
import { NavDrawer } from 'react-toolbox/lib/layout'
import { IconButton } from 'react-toolbox/lib/button'
import sinon = require('sinon')
chai.use(chaiEnzyme())
const { expect } = chai


describe('Root component', () => {
	it('should contain a Drawer and menu icon', () => {
		const wrapper = mount(
			<Root
				is_nav_drawer_active
				toggle_drawer_active={() => {}}
				snackbar_action={'action'}
				snackbar_active={false}
				snackbar_label={''}
				snackbar_type={'accept'}
				children={'children'}
			/>
		)

		expect(wrapper).to.have.descendants(NavDrawer)
		expect(wrapper).to.have.descendants(IconButton)
	})

  it('should open drawer on icon menu click', () => {
    const onButtonClick = sinon.spy()
    const wrapper = mount(
			<Root
				is_nav_drawer_active={false}
				toggle_drawer_active={onButtonClick}
				snackbar_action={'action'}
				snackbar_active={false}
				snackbar_label={''}
				snackbar_type={'accept'}
			>Good morning</Root>
		)

    expect(wrapper.find('.btn-menu')).to.have.length(1)
		wrapper.find('.btn-menu').simulate('click')
		expect(onButtonClick).to.have.property('callCount', 1)
  })
})
