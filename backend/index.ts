import express, { Request, Response } from "express";
import fs from 'fs/promises';
import { body, validationResult } from 'express-validator';
import axios, { CancelTokenSource } from 'axios';

const PORT = 5000;

const app = express();
app.use(express.json());

let activeProcessCancelToken: CancelTokenSource | null = null;

const processSearchRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, number } = req.body;

  try {
    if (activeProcessCancelToken) {
      activeProcessCancelToken.cancel('New request received');
      activeProcessCancelToken = null; // Reset the active process cancel token
    }

    const cancelTokenSource = axios.CancelToken.source();
    activeProcessCancelToken = cancelTokenSource;

    await new Promise((resolve) => setTimeout(resolve, 5000));

    if (cancelTokenSource.token.reason) {
      return res.status(409).json({ error: 'Request canceled' });
    }

    const result = await fs.readFile("./data.json", "utf-8");
    const { data } = JSON.parse(result);

    const filteredUsers = data.filter((user: { email: string; number: string }) => {
      if (email !== user.email) {
        return false;
      }
      if (number && number !== user.number) {
        return false;
      }
      return true;
    });

    res.json(filteredUsers);
  } catch (error: unknown) {
    if (axios.isCancel(error)) {
      return res.status(409).json({ error: 'Request canceled' });
    }

    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: (error as Error).message });
  } finally {
    activeProcessCancelToken = null;
  }
};

app.post('/search', [
  body('email').isEmail(),
  body('number').optional().isInt().isLength({ min: 6, max: 6 }),
], processSearchRequest);

app.listen(PORT, () => console.log("Server started on port", PORT));
