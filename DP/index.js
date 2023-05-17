class Person {
  constructor(name) {
    this.name = name
  }

  static getInstance() {
    if (Person.#instance instanceof Person) return Person.#instance

    Person.#instance = new Person('random name')
    return Person.#instance
  }

  static #instance = null
}

const john = Person.getInstance()
const mike = Person.getInstance()
const paloma = Person.getInstance()

console.log(john.name, mike.name, paloma.name)
