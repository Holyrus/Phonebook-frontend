

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmitHandler}>
        <div>
          name: <input value={props.nameInputValue} onChange={props.nameInputChange} />
        </div>
        <div>
          number: <input type='number' value={props.numberInputValue} onChange={props.numberInputChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
