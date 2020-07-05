const vorpal = require('vorpal')();

const start = function (library) {
  vorpal
    .command('addBook [attributes...]')
    .action(function (argument, callback) {
      library.addBook(argument.attributes).then(() => {
        callback();
      });
    });
  vorpal.command('show [table]').action(function (args, callback) {
    library
      .show(args)
      .then((rows) => {
        console.table(rows);
        callback();
      })
      .catch((msg) => {
        this.log(msg);
        callback();
      });
  });
  vorpal.command('search [attr...]').action(function (args, callback) {
    library
      .search(args.attr)
      .then((rows) => {
        console.table(rows);
        callback();
      })
      .catch((msg) => {
        this.log(msg);
        callback();
      });
  });
  vorpal.command('showAvailable [table]').action(function (args, callback) {
    library
      .showAvailable()
      .then((rows) => {
        console.table(rows);
        callback();
      })
      .catch((msg) => {
        this.log(msg);
        callback();
      });
  });
  vorpal.command('removeBook [attr]').action(function (args, callback) {
    library
      .removeBook(args.attr)
      .then(() => {
        callback();
      })
      .catch((msg) => {
        this.log(msg);
        callback();
      });
  });
  vorpal.command('borrowBook [attr...]').action(function (args, callback) {
    library
      .borrowBook(args.attr)
      .then(() => {
        callback();
      })
      .catch((msg) => {
        this.log(msg);
        callback();
      });
  });
  vorpal.command('returnBook [attr]').action(function (args, callback) {
    library
      .returnBook(args.attr)
      .then(() => {
        callback();
      })
      .catch((msg) => {
        this.log(msg);
        callback();
      });
  });
  vorpal.delimiter('Silence Of Soul Library $').show();
};

module.exports = { start };
