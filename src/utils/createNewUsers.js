import { v4 } from "uuid";

import { users } from "../users/index.js";

export const createNewUsers = (user) =>
  new Promise((resolve) => {
    const id = v4();
    const newUser = { id, ...user };
    users.push(newUser);
    resolve(newUser);
  });
