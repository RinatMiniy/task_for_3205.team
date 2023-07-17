const searchFetch = async (email, number) => {
  const requestBody = number ? { email, number } : { email }

  try {
    const response = await fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Reasponse error")
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error("Error:", error.message)
  }
}

export { searchFetch }