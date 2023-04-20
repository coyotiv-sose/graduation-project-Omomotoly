const exceptions = ['zu', 'van', 'von', 'der', 'den', 'le', 'les']
const exceptionsRegex = new RegExp(`\\b(${exceptions.join('|')})\\b`, 'gi')

module.exports = function (name) {
  const names = name.split(' ')

  if (names.length > 10) {
    throw new Error('Too many names')
  }

  return names
    .filter(n => n[0].toUpperCase() == n[0] || exceptionsRegex.test(n))
    .map(n => n[0])
    .join('')
}

/* return (
    names.filter(n => n[0].toUpperCase() === n[0]) ||
    exceptionsRegex
      .test(n)
      .map(n => n[0])
      .join('') */
