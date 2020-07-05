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
    const schema = `select * from book_copies where Is_Available = 1;`;
    return this.database.all(schema, callback);
  }
  removeBook(table, args) {
    const schema = `delete from ${table} where ISBN = '${args}';`;
    this.database.run(schema, (err) => {
      if (err) console.log(err);
    });
  }
  borrowBook(args) {
    const schema = `update book_copies set Is_Available = 0 where ${args[0]} = '${args[1]}' AND ${args[2]} = '${args[3]}';`;
    this.database.run(schema, (err) => {
      if (err) console.log(err);
    });
    const values = [
      args[1],
      args[3],
      'borrow',
      args[4],
      new Date().toLocaleString(),
      null,
    ];
    this.insertInTable('library_log', values);
  }
  returnBook(args) {
    const schema1 = `update book_copies set Is_Available = 1 where ISBN = '${args}';`;
    this.database.run(schema1, (err) => {
      if (err) console.log(err);
    });
    const schema = `update library_log set 'State' = 'return','Return_Time' = '${new Date().toLocaleString()}' where ISBN = '${args}';`;
    this.database.run(schema, (err) => {
      if (err) console.log(err);
    });
  }
}

module.exports = { Database };
