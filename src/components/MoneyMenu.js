import React from 'react'

import plus from '../assets/plus.svg'

const MoneyMenu = ({ callback }) => {
  return (
    <div className="moneymenu">
      <div className="moneymenu dots" onClick={callback}>
        <img src={plus} alt="plus" />
      </div>
    </div>
  )
}

export default MoneyMenu
