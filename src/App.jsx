import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import numbersService from './services/numbers';
import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    numbersService
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers);
      })
  }, [])

  const handleAddNumber = (event) => {
    event.preventDefault();
    const newNameObject = {
      name: newName, number: newNumber
    }

    if (newName !== '' && newNumber !== '' && !persons.some(person => person.name === newName)) {
      numbersService
        .create(newNameObject)
        .then(returnedNameObject => {
          setPersons(persons.concat(returnedNameObject));
          setNewName('');
          setNewNumber('');
          setSuccessMessage(
            `Successfully added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data.error);
          setErrorMessage(
            error.response.data.error
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    } else if (newName === '' || newNumber === '') {
      alert('Input field is empty');
    } else {
      const confirmReplace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmReplace) {
        const number = persons.find(num => num.name === newName);
        const numberId = number.id;
        const replacedNumber = { ...number, number: newNumber}
        numbersService
          .replace(numberId, replacedNumber)
          .then(returnedNumber => {
            setPersons(persons.map(num => num.id === numberId ? returnedNumber : num))
            setNewName('');
            setNewNumber('');
            setSuccessMessage(
              `Successfully updated ${newName}`
            )
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000)
          })
          .catch(error => {
            if (error.response && error.response.data.error) {
              setErrorMessage(
                error.response.data.error
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            } else {
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
            }
          })
      }
    }
  }

  const removeNumberOf = (id) => {
    const removedNumber = persons.find(number => number.id === id)
    const confirmDelete = window.confirm(`Delete ${removedNumber.name} ?`);
    if (confirmDelete) {
      numbersService
        .remove(id, removedNumber)
        setPersons(persons.filter(number => number.id !== id))
        setSuccessMessage(
          `Contact was successfully deleted`
        )
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000)
    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value);
    console.log(event.target.value);
  }

  const [newNumber, setNewNumber] = useState('');

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

      <Filter filterValue={searchTerm} onChangeHandler={(e) => setSearchTerm(e.target.value)}/>
      
      <h2>Add a new</h2>

      <PersonForm onSubmitHandler={handleAddNumber} nameInputValue={newName} nameInputChange={handleInputChange} 
                  numberInputValue={newNumber} numberInputChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      {filteredPersons.map((person) => (
        <p key={person.id}>{person.name} {person.number}
          <button onClick={() => removeNumberOf(person.id)}>X</button>
        </p>
      ))}
      {filteredPersons.length === 0 && (
        <p>No matches found</p>
      )}

    </div>
  )
}

export default App
