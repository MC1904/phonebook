const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(cors())

morgan.token('post', function (req, res) { 
    return (
        JSON.stringify(req.body)
    )
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request,response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

app.get('/info', (request,response) => {
    const now = new Date()
    response.send(
        `<div>
            <p>phonebook has info for ${persons.length} people</p>
            <p>${now}</p>
        </div>`
    )
})

app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

const generateID = () => {
    const newID = Math.floor(Math.random() * 100)
    const check = persons.find(person => person.id === newID)
    while (check) {
        generateID()
    }
    return (newID) 
}

app.post('/api/persons', (request,response) => {
    const body = request.body
    
    if (!body.name) {
        return (response.status(400).json(
            {error: "name cannot be empty"}
        ))
    }

    if (!body.number) {
        return (response.status(400).json(
            {error: "number cannot be empty"}
        ))
    }
    
    const checkexist = persons.find(person => person.name === body.name)

    if (checkexist) {
        return (response.status(400).json(
            {error: "name must be unique"}
        ))
    }

    const newPerson = {
        "name": body.name,
        "number": body.number, 
        "id": String(generateID())
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)