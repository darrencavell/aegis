import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoneyCard from './MoneyCard'

Enzyme.configure({ adapter: new Adapter() })

describe('MoneyCard component', () => {
  const wrapper = shallow(<MoneyCard currency="IDR" valuation="1000000" />)
  it('render perfectly', () => {
    expect(wrapper.exists()).toBe(true)  
  })
  it('it has .moneycard class', () => {
    expect(wrapper.hasClass('moneycard')).toBe(true)
  })
  it('it does not render footer when not included', () => {
    expect(wrapper.props().footer).toBe(undefined)
  })
})
