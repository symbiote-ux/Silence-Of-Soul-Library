module.exports = {
  schema1: `
  create table if not exists books (
    ISBN varchar(25) NOT NULL UNIQUE,
    Title varchar(100) Not Null,
    Category varchar(50) default 'unknown',
    Author varchar(50) default 'unknown'  );
  `,
  schema2: `
    create table if not exists book_copies (
    serial_num integer Primary key autoincrement,
    ISBN varchar(25) NOT NULL,
    Title varchar(100) NOT NULL,
    is_Available integer[1]
  )
  `,
  schema3: `
    create table if not exists library_log(
    serial_number Integer,
    ISBN varchar(25) NOT NULL,
    Title varchar(100) NOT NULL,
    State varchar(10) not null,
    User_name varchar(20),
    Borrow_Time real,
    Return_Time real
  )
  `,
};
