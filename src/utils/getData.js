export const getData = (req) =>
  new Promise((res, rej) => {
    try {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk.toString();
      });

      req.on("end", () => {
        res(data);
      });
    } catch (error) {
      rej(error);
    }
  });
