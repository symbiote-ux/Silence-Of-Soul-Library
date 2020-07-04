const { Database } = require('./database');
const { schema1, schema2, schema3 } = require('./schema');

class Library {
  constructor(path) {
    this.db = new Database(path);
  }
  static init(path) {
    const library = new Library(path);
    library.db.createTable(schema1);
    library.db.createTable(schema2);
    library.db.createTable(schema3);
    return library;
  }
  addBook(bookInfo) {
    return new Promise((resolve, reject) => {
      const isbn = bookInfo[0];
      const isAvailable = 1;
      const values = [isbn, isAvailable];
      resolve(
        this.db.insertInTable('book_copies', values),
        this.db.insertInTable('books', bookInfo)
      );
    });
  }
  show({ table }) {
    return new Promise((resolve, reject) =>
      this.db.selectAll(table, (err, rows) => {
        if (!err) resolve(rows);
      })
    );
  }
  search(args) {
    return new Promise((resolve, reject) => {
      this.db.searchBy(args, (err, rows) => {
        if (!err) resolve(rows);
      });
    });
  }
  showAvailable() {
    return new Promise((resolve, reject) => {
      this.db.showAvailable((err, rows) => {
        if (!err) resolve(rows);
      });
    });
  }
  removeBook(args) {
    return new Promise((resolve, reject) => {
      resolve(
        this.db.removeBook('books', args),
        this.db.removeBook('book_copies', args)
      );
    });
  }
}

module.exports = { Library };
