const PersonForm = ({action,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <form onSubmit={action}>
        <div>
          name: <input id='name' value={newName} onChange={handleNameChange} autoComplete="name"/>
        </div>
        <div>
          number: <input id='number' value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
    </form>
  )
}

export default PersonForm