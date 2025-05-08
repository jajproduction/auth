export function getCurrentPhilippineTime() {
  const now = new Date()
  const phtOffset = 8 * 60
  const phtTime = new Date(now.getTime() + phtOffset * 60 * 1000)
  return phtTime
}
