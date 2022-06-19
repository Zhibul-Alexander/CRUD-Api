import { config } from "dotenv";
import { resolve } from "path";
import { cwd } from "process";
import { createServer } from "http";
import { API, REQUEST_METHODS, REQUEST_ERRORS } from "./constants/index";
import { users } from "./users/index";


config({ path: resolve(cwd(), ".env") });

const getDataUsers = async (res) => {
  try {
    const dataUsers = () => await new Promise(resolve => {
      resolve(users);
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dataUsers));
  } 
    catch {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: REQUEST_ERRORS.BAD_REQUEST }));
  }
};

const server = createServer((req, res) => {
  if (req.url === API) {
    switch (req.method) {
      case REQUEST_METHODS.GET: {
        getDataUsers(req, res);
      }
      case REQUEST_METHODS.POST: {
        console.log("create");
      }
    }
  }
});

const { PORT } = process.env;

server.listen(PORT, () => console.log(`Listening port ${PORT}`));



