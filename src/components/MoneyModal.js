import { createPortal } from 'react-dom'

import usePortal from '../usePortal'

const MoneyModal = ({ id, children }) => {
  const target = usePortal(id, children)
  return createPortal(children, target)
}

export default MoneyModal
