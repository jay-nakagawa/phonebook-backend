const express = require("express");
const app = express();

app.use(express.json());

// var morgan = require('morgan')
// // app.use(morgan('tiny'))

// morgan.token('body', function getBody (req) {
//  //an object can not be logged to it must be turned into a string 
//   return JSON.stringify(req.body)   
// })

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const cors = require('cors')

app.use(cors())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "BigBird",
    number: "111111111",
  }
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
app.get("/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>`
  );
});
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;

  const person = persons.find((person) => {
    // console.log(person.id, typeof person.id, id, typeof id, person.id === id);
    return person.id === id;
  });

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// const generateId=()=>{
// const maxId = persons.length > 0
//     ? Math.max(...persons.map(person => person.id))
//     : 0
// }

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body.name);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "info missing",
    });
  } 

  //check persons array to see if there is any elements already using the name in the request body
  const duplicateChecker = persons.find(person=> person.name===body.name ) 
  //if there is a duplicate name then 404
  if (duplicateChecker){
    return response.status(400).json({
      error: "duplicate name",
    });
  }



  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100), //is this working?
  };

  persons = persons.concat(person);

  // console.log(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
