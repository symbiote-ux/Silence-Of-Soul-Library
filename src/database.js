const getUpdateLogQuery = (args, state) =>
  `update library_log set State = '${state}',Return_Time = '${new Date().toLocaleString()}' where ISBN = '${args}';`;
const getUpdateBookCopiesQuery = (
  args,
  operation
) => `update book_copies set Available =
(Select sum(Available) from book_copies where ISBN = '${args}')  ${operation} 1 where ISBN = '${args}';`;


class Database {
  constructor(sql) {
    this.sql = sql;
  }
  async insertInTable(table, values) {
    let query = `insert into ${table} values (`;
    query += values.map((e) => `'${e}'`).join(',');
    query += ');';
    await this.sql.runQuery(query);
  }
  async selectAll(tableName) {
    const query = `select * from ${tableName};`;
    return await this.sql.getAll(query);
  }
  async searchBy(table, args) {
    const query = `select * from ${table} where ${args[0]} = '${args[1]}';`;
    return await this.sql.getAll(query);
  }
  async showAvailable() {
    const query = `select * from book_copies where Available > 0;`;
    return await this.sql.getAll(query);
  }
  async removeBook(table, args) {
    const query = `delete from ${table} where ISBN = '${args}';`;
    await this.sql.runQuery(query);
  }
  async borrowBook(args) {
    const { ISBN, User_name, Title } = args;
    const query = getUpdateBookCopiesQuery(ISBN, '-');
    await this.sql.runQuery(query);
    const values = [
      ISBN,
      Title,
      'borrow',
      User_name,
      new Date().toLocaleString(),
      null,
    ];
    await this.insertInTable('library_log', values);
  }
  async returnBook(args) {
    let query = getUpdateLogQuery(args, 'return');
    await this.sql.runQuery(query);
    query = getUpdateBookCopiesQuery(args, '+');
    await this.sql.runQuery(query);
  }
}

module.exports = { Database };
