module.exports = {
  schema1: `
  create table if not exists books (
    ISBN varchar(25) NOT NULL UNIQUE,
    Title varchar(100) Not Null,
    Category varchar(50) default 'unknown',
    author varchar(50) default 'unknown'  );`,
  schema2: `
  create table if not exists book_copies (
    ISBN varchar(25) NOT NULL UNIQUE,
    is_available numeric(1)
  )`,
  schema3: `
  create table if not exists library_log(
    Serial_no numeric(10) not null,
    Action varchar(10) not null,
    User_name varchar(20)
  )`,
};
