import { useState } from "react";

function App() {
  const [emailValue, setEmailValue] = useState("")
  const [numberValue, setNumberValue] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleNumberChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const maskedValue = numericValue.replace(/(\d{2})(?=\d)/g, '$1-');
    const trimmedValue = maskedValue.slice(0, 8);
    setNumberValue(trimmedValue);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value = {emailValue} onChange = {(event)=> setEmailValue(event.target.value)} />
        <input
          type = "text"
          value = {numberValue}
          onChange = {handleNumberChange}
          placeholder = "__-__-__"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
