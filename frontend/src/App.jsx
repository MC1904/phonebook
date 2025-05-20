import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import personService from './services/persons.js'
import Notification from './components/Notification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findName, setFindName] = useState('')
  const [message, setMessage] = useState('')

  const hook = () => {
    personService
      .getAll()  
      .then(returned => setPersons(returned))
  }

  useEffect(hook,[])

  
  const personsToShow = (findName === "")
  ? persons
  : persons.filter(person => showPerson(person))
  
  function showPerson(person) {
    return (
      findName.toUpperCase() === person.name.toUpperCase().slice(0,findName.length)
    )
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFindName = (event) => {
    setFindName(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    let exist = false
    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        exist = true
      }
    } 
    if (exist){
      if (window.confirm(`${newName} already exists. Replace old phone number with new one?`)) {
        const edit = persons.find(person => person.name === newName)
        const editedperson = {...edit, number:newNumber}
        personService
          .changenumber(
            editedperson
          )
          .then(
            returnedPerson => setPersons(persons.map(person => (person === edit)? person = returnedPerson : person))
          )
          .catch(
            () => {setMessage(`${editedperson.name} has already been removed.`)
            setTimeout(() => setMessage(null),5000)
          }
          )
          setNewName('')
        setNewNumber('')
        setMessage(`Number changed for ${editedperson.name} to ${editedperson.number}`)
        setTimeout(() => setMessage(null),5000)
      }
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      personService
        .add(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setNewName('')
      setNewNumber('')
      setMessage(`added ${newPerson.name}`)
      setTimeout(() => setMessage(null),5000)
    }
  }

  const deletePerson = (person) => {
      if (window.confirm(`delete ${person.name}?`)) {
        const removeid = person.id
        personService
          .remove(removeid)
          .then(setPersons(persons.filter(person => person.id !== removeid)))
        setMessage(`deleted ${person.name}`)
        setTimeout(() => setMessage(null),5000)
        }
      }

  return (
    <div>
      <Notification message = {message}/>
      <h2>Phonebook</h2>
      <Filter findName={findName} handleFindName={handleFindName}/>
      <h2>add persons</h2>
      <PersonForm action={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

