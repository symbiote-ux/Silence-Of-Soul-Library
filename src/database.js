const Sqlite = require('sqlite3');

class Database {
  constructor(path) {
    this.database = new Sqlite.Database(path);
  }
  createTable(schema) {
    this.database.run(schema, (err) => err && console.log('Creation Err', err));
  }
  insertInTable(table, values) {
    const schema = `insert into ${table} values (`;
    const valueAsStrings = values.map((e) => `'${e}'`).join(',');
    this.database.run(schema.concat(valueAsStrings, ');'), (err) => {
      if (err) console.log(err);
    });
  }
  selectAll(tableName, callback) {
    const schema = `select * from ${tableName};`;
    return this.database.all(schema, callback);
  }
  searchBy(args, callback) {
    const schema = `select * from books where ${args[0]} = '${args[1]}';`;
    return this.database.all(schema, callback);
  }
  showAvailable(callback) {
    const schema = `select * from book_copies where is_available = 1;`;
    return this.database.all(schema, callback);
  }
  removeBook(table, args) {
    const schema = `delete from ${table} where ISBN = '${args}';`;
    this.database.run(schema, (err) => {
      if (err) console.log(err);
    });
  }
}

module.exports = { Database };
