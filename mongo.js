/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 5) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Junckie:${password}@cluster0.gd7lm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

mongoose
  .connect(url)
  // eslint-disable-next-line no-unused-vars
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: name,
      number: number
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${name} ${number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))