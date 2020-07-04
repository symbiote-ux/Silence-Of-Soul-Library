drop table if exists books;
create table books(
  ISBN VARCHAR(25) not null unique,
  Title VARCHAR(50) not null,
  Category VARCHAR(30) DEFAULT 'unknown',
  Author VARCHAR(30) DEFAULT 'unknown'
);

insert into books values 
  ('A1','The_One_Thing','Motivational','keller'),
  ('A2','Black_Island','Comic','tintin');

select * from books;

drop table if  exists books_copies;
create table books_copies (
  ISBN VARCHAR(25) not null UNIQUE,
  Serial_No NUMERIC(5) not null UNIQUE,
  Is_Available NUMERIC(1)
);

insert into books_copies values 
('A1',00001,1),
('A2',00002,1);

SELECT * from books_copies;

drop table if exists library_log;

create table library_log (
  Serial_No NUMERIC(5) not null unique,
  Action VARCHAR(10) not null,
  User_Name VARCHAR(30) not null
);

insert into library_log values 
(1,'borrowed','Saurabh'),
(2,'returned','Drishya');

select * from library_log;

