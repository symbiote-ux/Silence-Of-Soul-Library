module.exports = {
  schema1: `
  create table if not exists books (
    ISBN varchar(25) NOT NULL UNIQUE,
    Title varchar(100) Not Null,
    Category varchar(50) default 'unknown',
    Author varchar(50) default 'unknown'  );`,
  schema2: `
  create table if not exists book_copies (
    ISBN varchar(25) NOT NULL UNIQUE,
    Title varchar(100) Not Null,
    Is_Available numeric(1)
  )`,
  schema3: `
  create table if not exists library_log(
    ISBN varchar(25) NOT NULL UNIQUE,
    Title varchar(100) Not Null,
    State varchar(10) not null,
    User_Name varchar(20),
    Borrow_Time real,
    Return_Time real
  )`,
};
