import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";

export async function signUp({ name, email, password }) {
  if (!name || !email || !password) {
    return res.sendStatus(422);
  }

  const user = await userRepository.findUser(email);

  if (user) {
    throw { type: "conflict", message: "usuario ja existente" };
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  userRepository.createUser({ name, email, hashedPassword });
}

export async function signIn({ email, password }) {
  if (!email || !password) {
    return res.sendStatus(422);
  }

  const user = await userRepository.findUser(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw { type: "unauthorized", message: "senha ou usuario invalidos " };
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  return token;
}

export async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
