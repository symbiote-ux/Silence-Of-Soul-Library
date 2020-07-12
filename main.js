const { Database } = require('./src/database');
const { Library } = require('./src/library');
const { start } = require('./src/queryCommands');
const { Sql } = require('./src/sql');

const main = async () => {
  const path = './database/library.db';
  const sql = await Sql.start(path);
  const db = new Database(sql);
  const library = new Library(db);
  start(library);
};

main();
