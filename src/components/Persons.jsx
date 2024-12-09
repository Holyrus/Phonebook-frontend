

const Persons = ({ filteredPersonsArr, removeNumber }) => {
  return (
    <div>
      {filteredPersonsArr.map((person) => (
        <p key={person.id}>{person.name} {person.number}
          <button onClick={() => removeNumber(() => person.id)}>X</button>
        </p>
      ))}
      {filteredPersonsArr.length === 0 && (
        <p>No matches found</p>
      )}
    </div>
  )
}

export default Persons
