

create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null
);

create table project (
  id int primary key auto_increment not null,
  name varchar(255) not null,
  url varchar(1000) not null,
  image varchar(1000),
  tech varchar(255),
  context text
);

create table message (
  id int primary key auto_increment not null,
  user_name varchar(255) not null,
  email varchar(255) not null,
  message text
);

insert into user (id, email, password)
values
  (1, "jdoe@mail.com", "123456");

insert into project (name, url, image, tech, context)
values
  ("Project 1", "www.google.com", "https://picsum.photos/id/237/200/300", "html", "this was a very difficult project"),
  ("Project 2", "https://argon2.online/", "https://fastly.picsum.photos/id/297/200/200.jpg?hmac=elahxndleNOPlIfCfcZuJFmS-MkvvkXnQozwsyqF-FU", "React", "this was an easier project");

 insert into message (user_name, email, message)
values
  ("Janet", "cannit@janet.com", "Love your shoes, love your hair, love your work."); 
