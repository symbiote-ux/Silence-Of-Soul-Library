const vorpal = require('vorpal')();
const { bookDetails, borrowerDetails } = require('./prompt');

const start = function (library) {
  vorpal.command('addBook').action(async function (argument, callback) {
    const result = await this.prompt(bookDetails);
    await library.addBook(result);
    callback();
  });
  vorpal
    .command('show [table]')
    .autocomplete(['books', 'library_log', 'book_copies'])
    .action(async function (args, callback) {
      try {
        const rows = await library.show(args);
        console.table(rows);
        callback();
      } catch (msg) {
        this.log(msg);
        callback();
      }
    });
  vorpal
    .command('search [attr...]')
    .autocomplete(['ISBN', 'Category'])
    .action(async function (args, callback) {
      try {
        const rows = await library.search(args.attr);
        console.table(rows);
        callback();
      } catch (msg) {
        this.log(msg);
        callback();
      }
    });
  vorpal.command('showAvailable').action(async function (args, callback) {
    try {
      const rows = await library.showAvailable();
      console.table(rows);
      callback();
    } catch (err) {
      this.log(msg);
      callback();
    }
  });
  vorpal.command('removeBook <ISBN>').action(async function (args, callback) {
    try {
      await library.removeBook(args.ISBN);
      callback();
    } catch (err) {
      this.log(err);
      callback();
    }
  });
  vorpal.command('borrow_book').action(async function (args, callback) {
    const result = await this.prompt(borrowerDetails);
    await library.borrow_book(result);
    callback();
  });
  vorpal.command('return_book <ISBN>').action(async function (args, callback) {
    try {
      await library.return_book(args.ISBN);
      callback();
    } catch (err) {
      this.log(err);
      callback();
    }
  });
  vorpal.delimiter('Silence Of Soul Library $').show();
};
module.exports = { start };
