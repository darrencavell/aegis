import axios from 'axios'
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import { ACTION_TYPES, CURRENCY } from '../constants'

const { 
  FETCH_DEFAULT_MONEY_API,
  FETCH_NEW_MONEY_API,
  DELETE_EXISTING_MONEY
} = ACTION_TYPES
const { USD, CAD, IDR, GBP, CHF, SGD, INR, MYR, JPY, KRW } = CURRENCY

class MoneyStore extends EventEmitter {
  constructor() {
    super()
    this.data = {
      base: USD,
      value: 10,
      money: [],
      symbol: [GBP,CHF,SGD,INR,MYR,JPY,KRW]
    }
  }

  fetchDefaultMoneyApi() {
    axios.get(`${process.env.API_URL}?base=USD&symbols=${CAD},${IDR}`)
      .then(response => {
        if (response.status !== 200) {
          console.error('Looks like there is a problem. Status: ' + status)
          return
        }
        const { rates } = response.data
        this.data.money = rates
        this.emit('money')
        this.emit('symbol')
      })
  }

  fetchNewMoneyApi(symbol) {
    axios.get(`${process.env.API_URL}?base=USD&symbols=${symbol}`)
      .then(response => {
        if (response.status !== 200) {
          console.error('Looks like there is a problem. Status: ' + status)
          return
        }
        const { rates } = response.data
        this.data.money = Object.assign(this.data.money, rates)
        this.emit('money')
        this.data.symbol = this.data.symbol.filter(s => s !== symbol)
        this.emit('symbol')
      })
  }

  deleteExistingMoney(currency) {
    const modifiedMoney = {}
    for(let [key, value] of Object.entries(this.data.money)) {
      if(key === currency) continue
      modifiedMoney[key] = value
    }
    this.data.money = modifiedMoney
    this.emit('money')
  }

  getBase() { return this.data.base }
  getValue() { return this.data.value }
  getMoney() { return this.data.money }
  getSymbol() { return this.data.symbol }

  reducers(action) {
    switch(action.type) {
      case FETCH_DEFAULT_MONEY_API:
        this.fetchDefaultMoneyApi()
        break
      case FETCH_NEW_MONEY_API:
        this.fetchNewMoneyApi(action.symbol)
        break
      case DELETE_EXISTING_MONEY:
        this.deleteExistingMoney(action.currency)
        break
    }
  }
}

const MoneyStoreWrapper = new MoneyStore()
dispatcher.register(MoneyStoreWrapper.reducers.bind(MoneyStoreWrapper))
export default MoneyStoreWrapper