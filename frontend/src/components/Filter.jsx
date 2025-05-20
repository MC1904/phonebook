const Filter = ({findName,handleFindName}) => {
  return (
    <div>
        filter shown with <input id='filter' value={findName} onChange={handleFindName} />
    </div>
  )
}

export default Filter