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
    Serial_Number NOT NULL
    ISBN varchar(25) NOT NULL UNIQUE,
    Title varchar(100) NOT NULL,
    Total_Copies NUMERIC[5],
    Available NUMERIC[5]
  )
  `,
  schema3: `
    create table if not exists library_log(
    ISBN varchar(25) NOT NULL,
    Title varchar(100) NOT NULL,
    State varchar(10) not null,
    User_name varchar(20),
    Borrow_Time real,
    Return_Time real
  )
  `,
};
