import { users } from "../users/index.js";

export const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    const user = users.findIndex((item) => item.id === id);

    if (user === -1) {
      reject();
    } else {
      users.splice(user, 1);
      resolve();
    }
  });
