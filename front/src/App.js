import { useState } from "react";

function App() {
  const [emailValue, setEmailValue] = useState("")
  const [numberValue, setNumberValue] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value = {emailValue} onChange = {(event)=> setEmailValue(event.target.value)} />
        <input value = {numberValue} onChange = {(event)=> setNumberValue(event.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
