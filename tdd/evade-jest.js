const initialsExtractor = require('./initials-extractor')

describe('initialsExtractor', () => {
  it('should return the initials of a name', () => {
    const actualOutput = initialsExtractor('John Doe')
    const expectedOutput = 'JD'

    expect(actualOutput).toBe(expectedOutput)
  })
})

describe('initialsExtractor', () => {
  it('should return the three letter initials of a long name', () => {
    const actualOutput = initialsExtractor('John Doe Smith')
    const expectedOutput = 'JDS'

    expect(actualOutput).toBe(expectedOutput)
  })
})

describe('initialsExtractor', () => {
  it('should return the initials of a name with a middle name', () => {
    const actualOutput = initialsExtractor('John Michael Doe')
    const expectedOutput = 'JMD'

    expect(actualOutput.body).toBe(expectedOutput)
  })
})

describe('initialsExtractor', () => {
  it('should shorten zu to z', () => {
    const actualOutput = initialsExtractor('John zu Doe')
    const expectedOutput = 'JzD'

    expect(actualOutput).toBe(expectedOutput)
  })
})

describe('initialsExtractor', () => {
  it('should not shorten za to z', () => {
    const actualOutput = initialsExtractor('John za Doe')
    const expectedOutput = 'JD'

    expect(actualOutput).toBe(expectedOutput)
  })
})

describe('initialsExtractor', () => {
  it('should throw an error if the name has more than ten words', () => {
    const name = 'John Michael Doe Smith Jones Brown Black White Green Blue Red Yellow Purple Orange Pink'

    expect(() => initialsExtractor(name)).toThrowError('Too many names')
  })
})

describe('initialsExtractor', () => {
  it('should cover exceptions such as den, van, von, der, le, les', () => {
    const exceptions = ['zu', 'van', 'von', 'der', 'den', 'le', 'les']
    const names = exceptions.map(e => `John ${e} Doe`)
    const initials = exceptions.map(e => `J${e[0]}D`)
    console.log('names', names)
    console.log('initials', initials)

    const actualOutput = names.map(initialsExtractor)
    console.log('actualOutput', actualOutput)
    const expectedOutput = initials

    expect(actualOutput).toEqual(expectedOutput)
  })
})
