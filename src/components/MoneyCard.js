import React from 'react'

import { CURRENCY_TEXT } from '../constants'

/**
 * `MoneyCard`
 * - used for list-moneycard and for the base-moneycard
 * - customizeable footer render props @param footer
 * - dotted classes is now available @param dotted
 * - currency and valuation is pass down from parent @param currency, @param valuation
 * @param {String} currency 
 * @param {String} valuation
 * @param {Render Props} footer
 * @param {Boolean} dotted 
 */
const MoneyCard = ({ currency, valuation, footer, dotted }) => {
  const FooterComponent = footer ? footer() : null
  const dottedClass = dotted ? 'dotted' : ''

  return (
    <div className={`moneycard ${dottedClass}`}>
      <div className="moneycard--split">
        <div className="moneycard__currency">
          <span className="currency--short">{currency}</span>
          <span className="currency--long">{CURRENCY_TEXT[currency]}</span>
        </div>
        <div className="moneycard__valuation">
          <span>{valuation}</span>
        </div>
      </div>
      {FooterComponent}
    </div>
  )
}

export default MoneyCard
