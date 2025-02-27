

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
  context text,
  video varchar(1000)
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

insert into project (name, url, image, tech, context, video)
values
  ("Casse Croute", "https://github.com/WildCodeSchool-2024-09/JS-Nantes-CSS117-P3_Casse-Croute", "https://picsum.photos/id/237/200/300 ", "React, Express, CSS, MySQL", "This project incorporates a MySQL database, and the creation of secured accounts, with hashed passwords to a single page application where logged-in users can contribute recipes to a community based website.

Casse-croûters can create and edit recipes which can also be governed by an administrator. Each recipe also includes the possibility to create and submit ingredients that are incorporated into the database for use by the community. This project incorporates a full CRUD/BREAD-style set of actions, and could be adapted to a wide range of community based websites, or for commercial purposes.

This project was realised in a group setting with 3 other budding developers, in an agile work environment. Our workflow consisted of both peer-reviewed and overseeing developer-reviewed pull requests, and daily and weekly reviews and check-ins.", "Cassecrouteedit(1).mp4"),
  ("WeaRther Forecast", "https://github.com/WildCodeSchool-2024-09/JS-Nantes-P2-WeartherForcast", "https://fastly.picsum.photos/id/297/200/200.jpg?hmac=elahxndleNOPlIfCfcZuJFmS-MkvvkXnQozwsyqF-FU", "React", "Another project realised in a group of four, with developers learning the caveats of fetching from an established API (in this case, OpenWeatherMap). This application incorporates fetched data with user preferences to display personalised clothing recommendations that account for both the temperature, humidity and activities envisioned for the day.", "WearTheRForecastCompressed.mp4"),
  ("NeoDev", "https://github.com/naiiipan44/Neo-Dev-Projet-1", "https://pics", "HTML, JavaScript, CSS", "The first project of what would be many - this is a simple, showcase site. A pseudo-prototype-proof-of-concept developed within a group of four beginning developers. This project served as an opportunity to begin familiarizing ourselves with Git and employing our newly acquired JavaScript DOM manipulation.", "Neodevcompressed (2).mp4");

insert into message (user_name, email, message)
values
  ("Janet", "cannit@janet.com", "Love your shoes, love your hair, love your work."); 
