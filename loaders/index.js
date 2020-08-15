const expressLoader = require('./expressLoader');
const dataBaseLoader = require('./databaseLoader');

const loader = async (expressApp) => {
  await dataBaseLoader.init();
  console.log('MongoDB Initialized');
  await expressLoader(expressApp);
  console.log('Server Initialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
};

module.exports = loader;
