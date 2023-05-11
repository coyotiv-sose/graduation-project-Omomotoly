const actions = []

exports.track = (action) => {
  actions.push({
    action,
    time: new Date(),
  })
}

exports.printActions = () => {
  console.log(actions)
}
