import dispatcher from '../dispatcher'
import { ACTION_TYPES } from '../constants'

const { 
  FETCH_DEFAULT_MONEY_API,
  FETCH_NEW_MONEY_API,
  DELETE_EXISTING_MONEY
} = ACTION_TYPES

export function fetchDefaultMoneyApi() {
  dispatcher.dispatch({
    type: FETCH_DEFAULT_MONEY_API
  })
}
export function fetchNewMoneyApi(payload) {
  dispatcher.dispatch({
    type: FETCH_NEW_MONEY_API,
    ...payload
  })
}
export function deleteExistingMoney(payload) {
  dispatcher.dispatch({
    type: DELETE_EXISTING_MONEY,
    ...payload
  })
}