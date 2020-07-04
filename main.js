const { Library } = require('./src/library');
const { start } = require('./src/management');

const main = () => {
  const library = Library.init('./database/library.db');
  start(library);
};

main();
