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