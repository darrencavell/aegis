import React, { useState, useEffect } from 'react'

import MoneyCard from './components/MoneyCard'
import MoneyMenu from './components/MoneyMenu'
import MoneyModal from './components/MoneyModal'

import MoneyStore from './stores/MoneyStore'
import times from './assets/times.svg'
import { CURRENCY_TEXT } from './constants'
import { fetchDefaultMoneyApi, deleteExistingMoney, fetchNewMoneyApi } from './actions/MoneyAction'
import { moneyRoundup } from './utils'

const App = () => {
  const [money, setMoney] = useState({})
  const [symbol, setSymbol] = useState([])
  const [currency, setCurrency] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [modalVisibility, setModalVisibility] = useState(false)

  function setLocalMoneyState() { setMoney(Object.assign({}, MoneyStore.getMoney())) }
  function setLocalSymbolState() { setSymbol([...MoneyStore.getSymbol()]) }
  useEffect(() => {
    fetchDefaultMoneyApi()
    MoneyStore.on('money', setLocalMoneyState)
    MoneyStore.on('symbol', setLocalSymbolState)
    return () => {
      MoneyStore.removeListener('money', setLocalMoneyState)
      MoneyStore.removeListener('symbol', setLocalSymbolState)
    }
  }, [])

  useEffect(() => {
    if (modalVisibility)
      document.body.classList.add('no-scroll')
    else
      document.body.classList.remove('no-scroll')
  }, [modalVisibility])

  useEffect(() => {
    if(currency === '-') setButtonDisabled(true)
    else setButtonDisabled(false)
  }, [currency])

  const MoneyCardListComponent = () => {
    return (
      <div className="list-moneycard">
        {
          Object.keys(money).map(m => (
            <MoneyCard
              key={m}
              currency={m}
              valuation={moneyRoundup(MoneyStore.getValue() * money[m])} 
              footer={() => (
                <div className="moneycard--footer">
                  <span className="delete" onClick={() => deleteExistingMoney({ currency: m })}>Delete Currency</span>
                  <span>1 {MoneyStore.getBase()} = {m} {moneyRoundup(money[m])}</span>
                </div>
              )} />
          ))
        }
      </div>
    )
  }
  const MoneyModalComponent = () => {
    function addCurrency() {
      if(currency) {
        fetchNewMoneyApi({ symbol: currency })
        setModalVisibility(false)
      }
    }
    return (
      <>
        {
          modalVisibility ? (
            <MoneyModal id="modal">
              <div className="moneymodal">
                <div className="moneymodal__content">
                  <div className="moneymodal__close" onClick={() => setModalVisibility(false)}>
                    <img src={times} alt="times" />
                  </div>
                  <div className="moneymodal__container">
                    <label>Currency</label>
                    <select onChange={e => setCurrency(e.target.value)} value={currency}>
                      <option value="-">Please select option!</option>
                      {
                        symbol.map(s => (
                          <option key={`option-${s}`} value={s}>{CURRENCY_TEXT[s]}</option>
                        ))
                      }
                    </select>
                    <button disabled={buttonDisabled} onClick={addCurrency}>Add Currency</button>
                  </div>
                </div>
              </div>
            </MoneyModal>
          ) : ''
        }
      </>
    )
  }

  return (
    <div className="App">
      <div className="base-moneycard">
        <h1 className="title">Aegis Converter</h1>
        <MoneyCard
          dotted
          key={MoneyStore.getBase()}
          currency={MoneyStore.getBase()}
          valuation={moneyRoundup(MoneyStore.getValue())} />
      </div>
      <MoneyCardListComponent />
      <MoneyMenu callback={() => {
        setModalVisibility(!modalVisibility)
        setButtonDisabled(true)
      }} />
      <MoneyModalComponent />
    </div>
  )
}

export default App
