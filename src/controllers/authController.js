import * as userService from "../services/userService.js";

export async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    await userService.signUp({ name, email, password });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const token = await userService.signIn({ email, password });
    res.send(token);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
