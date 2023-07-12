const express = require("express")

const PORT = 5000

const app = express()

const start = () => {
  try {
    app.listen(PORT, () => console.log("server start"))
  } catch {

  }
}

start()