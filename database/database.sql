create database cinemaMMI;
use cinemaMMI;
CREATE TABLE persons (
  id_person int NOT NULL AUTO_INCREMENT,
  document varchar(255) NOT NULL,
  user_name varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  born date NOT NULL,
  genre ENUM ('MASCULINO', 'FEMENINO') NOT NULL,
  phone varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  PRIMARY KEY (id_person)
);

DESCRIBE persons;

CREATE TABLE movies (
  id_movie int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  movie_status int NOT NULL,
  PRIMARY KEY (id_movie)
);

DESCRIBE movies;

CREATE TABLE combos (
  id_combo int NOT NULL AUTO_INCREMENT,
  combo_description varchar(255) NOT NULL,
  price double NOT NULL,
  PRIMARY KEY (id_combo)
);

DESCRIBE combos;

CREATE TABLE rooms (
  id_room int NOT NULL AUTO_INCREMENT,
  room_name varchar(255) NOT NULL,
  capacity int NOT NULL,
  PRIMARY KEY (id_room)
);

DESCRIBE rooms;

CREATE TABLE functions (
  id_function int NOT NULL AUTO_INCREMENT,
  function_date date NOT NULL,
  function_hour time NOT NULL,
  id_room int NOT NULL,
  id_movie int NOT NULL,
  price double NOT NULL,
  PRIMARY KEY (id_function),
  FOREIGN KEY (id_room) REFERENCES rooms (id_room),
  FOREIGN KEY (id_movie) REFERENCES movies (id_movie)
);

DESCRIBE functions;

CREATE TABLE cards (
  id_card int NOT NULL AUTO_INCREMENT,
  number int NOT NULL,
  id_person int NOT NULL,
  PRIMARY KEY (id_card),
  FOREIGN KEY (id_person) REFERENCES persons (id_person)
);

DESCRIBE cards;

CREATE TABLE seats (
  id_seat int NOT NULL AUTO_INCREMENT,
  id_room int NOT NULL,
  seat_letter varchar(1) NOT NULL,
  seat_number int NOT NULL,
  seat_status boolean,
  PRIMARY KEY (id_seat),
  FOREIGN KEY (id_room) REFERENCES rooms (id_room)
);

DESCRIBE seats;

CREATE TABLE tickets (
  id_ticket int NOT NULL AUTO_INCREMENT,
  id_person int NOT NULL,
  id_function int NOT NULL,
  id_card int NOT NULL,
  id_seat int NOT NULL,
  mount int NOT NULL,
  PRIMARY KEY (id_ticket),
  FOREIGN KEY (id_person) REFERENCES persons (id_person),
  FOREIGN KEY (id_function) REFERENCES functions (id_function),
  FOREIGN KEY (id_card) REFERENCES cards (id_card),
  FOREIGN KEY (id_seat) REFERENCES seats (id_seat)
);

DESCRIBE tickets;

CREATE TABLE combos_tickets (
  id_combo int NOT NULL,
  id_ticket int NOT NULL,
  amount int NOT NULL,
  PRIMARY KEY (id_combo, id_ticket),
  FOREIGN KEY (id_combo) REFERENCES combos (id_combo),
  FOREIGN KEY (id_ticket) REFERENCES tickets (id_ticket)
);

DESCRIBE combos_tickets;

create table comments (
	id_comment int NOT NULL AUTO_INCREMENT,
	id_person int NOT NULL,
	id_movie int NOT NULL,
	date date NOT NULL,
	comment varchar(255) NOT NULL,
	PRIMARY KEY (id_comment),
	FOREIGN KEY (id_person) REFERENCES persons (id_person),
	FOREIGN KEY (id_movie) REFERENCES movies (id_movie)
);

CREATE INDEX idx_function_date_hour ON functions (function_date, function_hour);
CREATE INDEX idx_combos_description ON combos (combo_description);
CREATE INDEX idx_room_capacity ON rooms (capacity);
CREATE INDEX idx_seat_id_room ON seats (id_room);
CREATE INDEX idx_ticket_seat_id_ticket ON tickets_seats (id_ticket);
