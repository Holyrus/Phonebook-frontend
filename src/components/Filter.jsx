

const Filter = (props) => {
  return (
    <div>
      <label>Filter shown with </label>
      <input value={props.filterValue} onChange={props.onChangeHandler}/>
    </div>
  )
}

export default Filter
