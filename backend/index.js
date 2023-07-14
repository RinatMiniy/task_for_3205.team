const express = require("express")
const fs = require('fs');
const { body, validationResult } = require('express-validator');

const PORT = 5000

const app = express()
app.use(express.json())

app.post('/search', [
  body('email').isEmail(),
  body('number').optional().isInt().isLength({ min: 6, max: 6 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, number } = req.body;

  try {

    await new Promise((resolve) => setTimeout(resolve, 1000));
    let data = {}

    await fs.promises.readFile("./data.json", "utf-8")
      .then(function (result) {
          data = JSON.parse(result);
      })
      .catch(function (error) {
          console.log(error);
      })

    const filteredUsers = data.data.filter((user) => {
      console.log(user)
        if (email !== user.email) {
          return false;
        }
        if (number && number !== user.number) {
          return false;
        }
        return true;
      });


    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });

  }
});

app.listen(PORT, () => console.log("server start"))