
const mongoose = require('mongoose')


// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]
// console.log(password)
const personName = process.argv[3]
const personNumber = process.argv[4]

// const url = `mongodb+srv://jay:${password}@cluster0.rne2yt3.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI
// console.log(url,password)


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

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)