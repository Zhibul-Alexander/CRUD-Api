import { users } from "../users/index.js";

export const getUserId = (id) =>
  new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject();
    }
  });
