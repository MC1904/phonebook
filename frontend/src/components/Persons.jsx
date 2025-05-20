const Persons = ({personsToShow, deletePerson}) => {
  return (
    <ul>{personsToShow.map((person) => {return(<li key={person.id}>{person.name} {person.number} <button type="submit" onClick={() => deletePerson(person)}>delete</button></li>)})}</ul>
  )
}

export default Persons