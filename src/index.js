import http from "http";
import { validate } from "uuid";

import { API, REQUEST_METHODS, REQUEST_ERRORS } from "./constants/index.js";
import {
  getData,
  getUsers,
  createNewUsers,
  validateUser,
  getUserId,
  updateUser,
  deleteUser,
} from "./utils/index.js";

export const getDataUsers = async (_, res) => {
  try {
    const users = await getUsers();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: REQUEST_ERRORS.BAD_REQUEST }));
  }
};

export const create = async (req, res) => {
  const body = await getData(req);
  const { username, age, hobbies } = JSON.parse(body);

  if (username || age || hobbies) {
    const arrayUser = { username, age, hobbies };

    if (!validateUser(arrayUser)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: REQUEST_ERRORS.INVALID }));
    } else {
      const newUser = await createNewUsers(arrayUser);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: REQUEST_ERRORS.INVALID }));
  }
};

export const getId = async (req, res, id) => {
  try {
    const user = await getUserId(id);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } catch {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: REQUEST_ERRORS.USER_NOT_FOUND }));
  }
};

export const update = async (req, res, id) => {
  const body = await getData(req);
  const { username, age, hobbies } = JSON.parse(body);

  if (username || age || hobbies) {
    const arrayUser = { username, age, hobbies };

    if (!validateUser(arrayUser)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: REQUEST_ERRORS.INVALID }));
    } else {
      const newUser = await updateUser(arrayUser, id);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: REQUEST_ERRORS.INVALID }));
  }
};

export const deleteId = async (_, res, id) => {
  try {
    await deleteUser(id);
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
  } catch {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: REQUEST_ERRORS.USER_NOT_FOUND }));
  }
};

export const start = () => {
  const server = http.createServer(async (req, res) => {
    try {
      const id = req.url.split("/")[3];
      if (req.url === API) {
        switch (req.method) {
          case REQUEST_METHODS.GET:
            await getDataUsers(req, res);
            break;
          case REQUEST_METHODS.POST:
            await create(req, res);
            break;
          default:
            break;
        }
      } else if (id) {
        if (validate(id)) {
          switch (req.method) {
            case REQUEST_METHODS.GET:
              await getId(req, res, id);
              break;
            case REQUEST_METHODS.PUT:
              await update(req, res, id);
              break;
            case REQUEST_METHODS.DELETE:
              await deleteId(req, res, id);
              break;
          }
        }
      }
    } catch {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: REQUEST_ERRORS.SERVER }));
    }
  });

  const PORT = 3300;

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
