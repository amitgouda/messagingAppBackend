const loaders = require("./loaders");
const express = require("express");
const { port } = require("./config");

async function startServer() {
  const app = express();

  await loaders(app);

  app.listen(port || 8000, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Your server is ready at port ${port}`);
  });
}

startServer();
