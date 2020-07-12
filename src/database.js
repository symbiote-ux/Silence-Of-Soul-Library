const getUpdateLogQuery = (args, state) =>
  `update library_log set State = '${state}',Return_Time = '${new Date().toLocaleString()}' where serial_number = '${args}';`;

const getUpdateBookCopiesQuery = (args, status) =>
  `update book_copies set is_Available = ${status} Where serial_num = '${args}';`;

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
  async insertInCopies(tableName, values) {
    let insertQuery = `insert into ${tableName} (ISBN, is_Available, Title)  values (`;
    insertQuery += values.map((e) => `'${e}'`).join(',');
    insertQuery += ');';
    await this.sql.runQuery(insertQuery);
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
    const query = `select * from book_copies where is_Available == 1 group by ISBN;`;
    return await this.sql.getAll(query);
  }
  async removeBook(table, args) {
    const query = `delete from ${table} where ISBN = '${args}';`;
    await this.sql.runQuery(query);
  }
  async borrowBook(args) {
    const { Serial_Num, ISBN, User_name, Title } = args;
    const query = getUpdateBookCopiesQuery(Serial_Num, '0');
    await this.sql.runQuery(query);
    const values = [
      Serial_Num,
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
    query = getUpdateBookCopiesQuery(args, 1);
    await this.sql.runQuery(query);
  }
}
module.exports = { Database };
