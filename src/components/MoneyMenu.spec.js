import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoneyMenu from './MoneyMenu'

Enzyme.configure({ adapter: new Adapter() })

describe('MoneyMenu component', () => {
  const callback = jest.fn()
  const wrapper = shallow(<MoneyMenu callback={callback} />)
  it('render perfectly', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('simulate click once', () => {
    expect(wrapper.find('.moneymenu.dots').simulate('click').length).toBe(1)
  })
  it('has a class called .moneymenu', () => {
    expect(wrapper.hasClass('moneymenu')).toBe(true)
  })
  it('has a svg called plus', () => {
    expect(wrapper.find('img').props().src).toBe('plus.svg')
  })
})
