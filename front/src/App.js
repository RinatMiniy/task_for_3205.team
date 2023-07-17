import { useState } from "react"
import { searchFetch } from "./api"

function App() {
  const [emailValue, setEmailValue] = useState("")
  const [numberValue, setNumberValue] = useState("")
  const [contentValue, setContentValue] = useState([])

  const handleSubmit = async (event) => {
    setContentValue([])
    event.preventDefault()
    const numericValue = numberValue.replace(/-/g, "")
    const result = await searchFetch(emailValue, numericValue)
    if (result) {
      setContentValue(result)
    }
  }

  const handleNumberChange = (event) => {
    const inputValue = event.target.value
    const numericValue = inputValue.replace(/\D/g, "")
    const maskedValue = numericValue.replace(/(\d{2})(?=\d)/g, "$1-")
    const trimmedValue = maskedValue.slice(0, 8)
    setNumberValue(trimmedValue)
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value = {emailValue}
          onChange = {(event)=> setEmailValue(event.target.value)}
          placeholder="Email"
        />
        <input
          type = "text"
          value = {numberValue}
          onChange = {handleNumberChange}
          placeholder = "__-__-__"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {contentValue.map((user, index) => (
          <div key={index}>
            <h3>{user.email}</h3>
            <h3>{user.number}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
