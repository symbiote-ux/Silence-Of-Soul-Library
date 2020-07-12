const Sqlite = require('sqlite3');
const { schema1, schema2, schema3 } = require('./schema');

class Sql {
  constructor(db) {
    this.db = db;
  }
  static async start(path) {
    const db = new Sqlite.Database(path);
    const sql = new Sql(db);
    await sql.runQuery(schema1);
    await sql.runQuery(schema2);
    await sql.runQuery(schema3);
    return sql;
  }
  runQuery(query) {
    return new Promise((resolve, reject) => {
      this.db.run(query, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  getAll(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
  get(query) {
    return new Promise((resolve, reject) => {
      this.db.get(query, (err, row) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }
}
module.exports = { Sql };
