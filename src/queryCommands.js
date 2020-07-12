const vorpal = require('vorpal')();
const { bookDetails, borrowerDetails } = require('./prompt');

const displayTable = (rows, msg) => {
  if (rows.length == 0) {
    console.log(msg);
    return;
  }
  console.table(rows);
};

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
        displayTable(rows, 'Table is empty');
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
        displayTable(rows, 'Not found');
        callback();
      } catch (msg) {
        this.log(msg);
        callback();
      }
    });
  vorpal.command('showAvailable').action(async function (args, callback) {
    try {
      const rows = await library.showAvailable();
      displayTable(rows, 'No book available');
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
  vorpal
    .command('return_book <serial_num>')
    .action(async function (args, callback) {
      try {
        await library.return_book(args.serial_num);
        callback();
      } catch (err) {
        this.log(err);
        callback();
      }
    });
  vorpal.delimiter('Silence Of Soul Library $').show();
};
module.exports = { start };
