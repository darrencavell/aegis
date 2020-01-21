export function moneyRoundup(money) {
  return (Math.round(money * 100) / 100).toFixed(4)
}