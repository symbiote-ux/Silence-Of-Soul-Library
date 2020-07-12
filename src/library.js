class Library {
  constructor(db) {
    this.db = db;
  }
  async addBook(data) {
    const { ISBN, Title, Author, Category, num_of_copy } = data;
    const values = [ISBN, 1, Title];
    for (let i = 0; i < num_of_copy; i++) {
      await this.db.insertInCopies('book_copies', values);
    }
    const bookInfo = [ISBN, Title, Category, Author];
    await this.db.insertInTable('books', bookInfo);
  }
  async show({ table }) {
    try {
      const result = await this.db.selectAll(table);
      return result;
    } catch (err) {}
  }
  async search(args) {
    try {
      return await this.db.searchBy('Books', args);
    } catch (err) {}
  }
  async showAvailable() {
    try {
      return await this.db.showAvailable();
    } catch (err) {}
  }
  async removeBook(args) {
    await this.db.removeBook('books', args);
    await this.db.removeBook('book_copies', args);
  }
  async borrow_book(args) {
    await this.db.borrowBook(args);
  }

  async return_book(args) {
    await this.db.returnBook(args);
  }
}
module.exports = { Library };
