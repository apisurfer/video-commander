const cyclicCheck = (resolve) => (delay, predicate, cb) => {
  const isOK = predicate()

  if (isOK) {
    return resolve(true)
  }

  setTimeout(() => cb(delay, predicate, cb), delay)
}

export default function monitorUntil(delay, predicate) {
  return new Promise((resolve, reject) => {
    const startChecker = cyclicCheck(resolve)
    startChecker(delay, predicate, startChecker)
  })
}
