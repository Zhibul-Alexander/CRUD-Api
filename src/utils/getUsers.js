import { users } from "../users/index.js";

export const getUsers = () =>
  new Promise((resolve) => {
    resolve(users);
  });
