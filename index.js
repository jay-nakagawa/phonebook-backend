require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const Person = require("./models/person");
app.use(cors());
app.use(express.static("build"));

app.get("/info", (request, response) => {
  response.send(
    `<div>Phonebook has info for ${persons.length} people</div>
        <div>${new Date()}</div>`
  );
});
app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      console.log(person);
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  console.log(body.name);
  if (body === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: Math.floor(Math.random() * 100), //is this working?
  });

  person
    .save()
    .then((savedPerson) => {
      console.log(savedPerson);
      response.json(savedPerson);
    })
    .catch((error) => next(error));

  // console.log(body.name);
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "info missing",
  //   });
  // }

  // //check persons array to see if there is any elements already using the name in the request body
  // const duplicateChecker = persons.find((person) => person.name === body.name);
  // //if there is a duplicate name then 404
  // if (duplicateChecker) {
  //   return response.status(400).json({
  //     error: "duplicate name",
  //   });
  // }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: Math.floor(Math.random() * 100), //is this working?
  // };

  // persons = persons.concat(person);

  // // console.log(person) ;
  // response.json(person);
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
