const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
console.log(password)
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://jay:${password}@cluster0.rne2yt3.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => {
    console.log('connected')
  })
  .catch((error)=>{
    console.log(`error connecting to Mongo`, error.message)
  })



const personSchema = new mongoose.Schema({
  name: String,
  number: String 
})

const Person = mongoose.model('Person', personSchema)

const addNewPerson = (personName,personNumber) =>{
    const person = new Person({
        name: personName,
        number: personNumber
    })
    person.save().then(()=>{
        console.log(`added ${personName}`)
        return mongoose.connection.close()
    })
}

if(personName && personNumber){
    addNewPerson(personName, personNumber)
}else if(password){
  console.log(1111)
  Person.find({}).then(result=> {
    result.forEach(note=> {
      console.log(note)
    })
    mongoose.connection.close()
  })
}