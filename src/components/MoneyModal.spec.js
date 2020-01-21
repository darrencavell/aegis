import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MoneyModal from './MoneyModal'

Enzyme.configure({ adapter: new Adapter() })

describe('MoneyModal component', () => {
  
  const anotherEl = global.document.createElement('div')
  const bodyEl = global.document.querySelector('body')
  bodyEl.appendChild(anotherEl)

  it('render perfectly', () => {
    const wrapper = shallow(<MoneyModal id="modal" />)
    expect(wrapper.exists()).toBe(true)
  })
  it('should render with child component', () => {
    const wrapper = mount(
      <MoneyModal id="modal">
        <div>I am a child tag</div>
      </MoneyModal>
    )
    expect(wrapper.find('div').exists()).toBe(true)
  })
  it('should render with empty div', () => {
    const wrapper = mount(
      <MoneyModal id="modal"></MoneyModal>
    )
    expect(wrapper.children().children().exists()).toBe(false)
  })
})
