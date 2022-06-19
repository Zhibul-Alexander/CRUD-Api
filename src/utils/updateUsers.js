import { users } from "../users/index.js";

export const updateUser = (id, newUser) =>
  new Promise((resolve, reject) => {
    const user = users.findIndex((item) => item.id === id);

    if (user === -1) {
      reject();
    } else {
      users[user] = { id, ...newUser };
      resolve(users[user]);
    }
  });
