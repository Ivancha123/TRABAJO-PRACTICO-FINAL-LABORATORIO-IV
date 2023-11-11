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

CREATE TABLE tickets (
  id_ticket int NOT NULL AUTO_INCREMENT,
  id_person int NOT NULL,
  id_function int NOT NULL,
  id_transaction int NOT NULL,
  PRIMARY KEY (id_ticket),
  FOREIGN KEY (id_person) REFERENCES persons (id_person),
  FOREIGN KEY (id_function) REFERENCES functions (id_function),
  FOREIGN KEY (id_transaction) REFERENCES transactions (id_transaction)
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


CREATE TABLE seats (
  id_seat int NOT NULL AUTO_INCREMENT,
  id_room int NOT NULL,
  seat_letter varchar(1) NOT NULL,
  seat_number int NOT NULL,
  PRIMARY KEY (id_seat),
  FOREIGN KEY (id_room) REFERENCES rooms (id_room)
);

DESCRIBE seats;

CREATE TABLE tickets_seats (
  id_ticket int NOT NULL,
  id_seat int NOT NULL,
  PRIMARY KEY (id_ticket, id_seat),
  FOREIGN KEY (id_ticket) REFERENCES tickets (id_ticket),
  FOREIGN KEY (id_seat) REFERENCES seats (id_seat)
);

DESCRIBE tickets_seats;

CREATE TABLE cards (
  id_card int NOT NULL,
  number int NOT NULL,
  PRIMARY KEY (id_card)
);

DESCRIBE cards;

CREATE TABLE transactions (
  id_transaction int NOT NULL,
  id_card int NOT NULL,
  mount int NOT NULL,
  PRIMARY KEY (id_transaction),
  FOREIGN KEY (id_card) REFERENCES cards (id_card)
);

DESCRIBE transactions;

CREATE INDEX idx_function_date_hour ON functions (function_date, function_hour);
CREATE INDEX idx_combos_description ON combos (combo_description);
CREATE INDEX idx_room_capacity ON rooms (capacity);
CREATE INDEX idx_seat_id_room ON seats (id_room);
CREATE INDEX idx_ticket_seat_id_ticket ON tickets_seats (id_ticket);

-- -------------------------------------------------------------------------------------------------------------------------
-- PROCEDURES
-- -------------------------------------------------------------------------------------------------------------------------
-- CREATE SEATS
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE create_seat(
  IN p_seat_letter CHAR(1),
  IN p_seat_number INT,
  IN p_id_room INT
)
BEGIN
  -- Verificar que la seat_letter sea válida
  IF p_seat_letter NOT IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z') THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT ='The letter must be: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z';
  END IF;
  -- Verificar que el número sea válido
  IF p_seat_number < 1 OR seat_number > 100 THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'The number must be between 1 y 100';
  END IF;
  -- Verificar que la room exista
  SELECT *
  FROM rooms r
  WHERE r.id_room = p_id_room;
  -- Crear la seat
  INSERT INTO seat (id_room, seat_letter, seat_number)
  VALUES (p_id_room, p_seat_letter, p_seat_number);
  -- Actualizar la amount de seats de la room
  UPDATE room r
  SET capacity = (SELECT COUNT(*)
                 FROM seat s
                 WHERE s.id_room = p_id_room)
  WHERE r.id_room = p_id_room;
END
//
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- Compra de tickets
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE buy_seat(
  IN p_id_function INT,
  IN p_id_seat INT,
  IN p_id_person INT
)
BEGIN

  -- Verificar que la función exista
  SELECT *
  FROM functions f
  WHERE f.id_function = p_id_function;

  -- Verificar que la seat exista
  SELECT *
  FROM seats s
  WHERE s.id_seat = p_id_seat;

  -- Verificar que la seat no esté reservada
  SELECT COUNT(*)
  FROM tickets_seats ts
  WHERE ts.id_seat = p_id_seat
  AND ts.id_function = p_id_function;

  -- Agregar la ticket a la tabla `ticket_seat`
  INSERT INTO tickets_seats (id_function, id_seat, id_person)
  VALUES (p_id_function, p_id_seat, p_id_person);

END
//
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- Compra de combos
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE buy_combos(
  IN p_id_ticket INT,
  IN p_id_combo INT,
  IN p_amount INT
)
BEGIN

  -- Verificar que la ticket exista
  SELECT *
  FROM tickets t
  WHERE t.id_ticket = p_id_ticket;

  -- Verificar que el combo exista
  SELECT *
  FROM combos c
  WHERE c.id_combo = p_id_combo;

  -- Verificar que la ticket no haya comprado el mismo combo
  SELECT COUNT(*)
  FROM combos_tickets ct
  WHERE ct.id_ticket = p_id_ticket
  AND ct.id_combo = p_id_combo;

  -- Si la ticket no ha comprado el combo, agregar una nueva compra
  IF COUNT(*) = 0 THEN
    INSERT INTO combos_tickets (id_ticket, id_combo, amount)
    VALUES (p_id_ticket, p_id_combo, p_amount);

  -- Si la ticket ya ha comprado el combo, actualizar la amount
  ELSE
    UPDATE combos_tickets ct
    SET ct.amount = ct.amount + p_amount
    WHERE ct.id_ticket = p_id_ticket
    AND ct.id_combo = p_id_combo;
  END IF;
END
//
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- creacion de persons
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE create_person(
  IN document VARCHAR(255),
  IN user_name VARCHAR(255),
  IN lastname VARCHAR(255),
  IN function_date_born DATE,
  IN genre ENUM ('MASCULINO', 'FEMENINO')
)
BEGIN

  -- Verificar que el document sea válido
  IF document IS NULL OR document = '' THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'El document debe ser válido';
  END IF;

  -- Verificar que el user_name sea válido
  IF user_name IS NULL OR user_name = '' THEN
   SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT ='El user_name debe ser válido';
  END IF;

  -- Verificar que el lastname sea válido
  IF lastname IS NULL OR lastname = '' THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'El lastname debe ser válido';
  END IF;

  -- Verificar que la function_date de born sea válida
  IF function_date_born IS NULL OR function_date_born < '1900-01-01' THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'La function_date de born debe ser válida';
  END IF;

  -- Verificar que el género sea válido
  IF genre IS NULL OR genre NOT IN ('MASCULINO', 'FEMENINO') THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'El género debe ser válido';
  END IF;

  -- Crear la persona
  INSERT INTO persona (document, user_name, lastname, function_date_born, genre)
  VALUES (document, user_name, lastname, function_date_born, genre);

END
//
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- Agregar rooms y seats
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER // 
CREATE PROCEDURE create_rooms() wholeblock :BEGIN 
-- Crear las rooms
SET @i = 1;
room_loop: 
	LOOP 
		IF @i > 4 THEN 
			LEAVE room_loop; 
		END IF;
		SET @user_name = CONCAT('room ', @i);
		INSERT INTO room (id_room, user_name) VALUES (@i, @user_name);
		SET @i = @i + 1;
	ITERATE room_loop;
	END LOOP;
SET @room = 1;
seat_loop_room: 
	LOOP 
		IF @room > 4 THEN 
			LEAVE seat_loop_room;
		END IF;
		SET @seat_letter = 'A';
		seat_loop_seat_letter :
			LOOP 
				IF @seat_letter > 'K' THEN 
					LEAVE seat_loop_seat_letter;
				END IF;
				-- CODIGO LETTRA
				SET @seat_number = 1;
				seat_loop_seat_number: 
					LOOP 
						IF @seat_number > 15 THEN 
							LEAVE seat_loop_seat_number;
						END IF;
						-- CODIGO seat_number
						INSERT INTO seat(id_room, seat_letter, seat_number) VALUES (@room, @seat_letter, @seat_number);
						SET @seat_number = @seat_number + 1;
					ITERATE seat_loop_seat_number;
					END LOOP;
			SET @seat_letter = @seat_letter + 1;
            ITERATE seat_loop_seat_letter;
			END LOOP;
		SET @room = @room + 1;
	ITERATE seat_loop_room;
    END LOOP;
END // 
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- creacion de movies
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE create_movie(
  IN p_id_movie INT,
  IN p_title VARCHAR(50)
)
BEGIN

  -- Verificar que el id sea válido
  IF p_id_movie <= 0 THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'El id debe ser mayor que 0';
  END IF;

  -- Verificar que el título sea válido
  IF p_title IS NULL OR title = '' THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'El título debe ser válido';
  END IF;

  -- Verificar que la película no exista
  SELECT COUNT(*)
  FROM movie m
  WHERE m.id = p_id;

  IF COUNT(*) > 0 THEN
    SIGNAL SQLSTATE '42S22' SET MESSAGE_TEXT = 'La película ya existe';
  END IF;

  -- create la película
  INSERT INTO movie (id, title)
  VALUES (p_id_movie, p_title);

END
//
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- Consultar seats
-- -------------------------------------------------------------------------------------------------------------------------
-- Si La seat está reservada devuelve false. En caso contrario, si la seat está disponible devuelve true.
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE seats_per_function( p_id_function INT, p_id_seat INT, OUT p_exit BOOLEAN)
BEGIN
  -- Verificar que la función exista
  SELECT * FROM functions f WHERE f.id_function = p_id_function;
  
  -- Verificar que la seat exista
  SELECT * FROM seats s WHERE s.id_se = id_seat;
  
  -- Devuelve estado de la seat en esa function
  SET p_exit = EXISTS(SELECT * FROM ticket_seat eb WHERE eb.id_ticket = (SELECT e.id FROM ticket e WHERE e.id_function = id_function) AND eb.id_seat = id_seat);
  
END
//
DELIMITER ;

-- -------------------------------------------------------------------------------------------------------------------------
-- calculate age de person
-- -------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE calculate_age( id_person INT, OUT age INT)

  -- Obtener la function_date de born de la persona
  SET @function_date_born = (SELECT function_date_born
  FROM persona p
  WHERE p.id_persona = id_person);

  -- calculate la age
	SET age = YEAR(CURRENT_DATE) - YEAR(@function_date_born);
END
//
DELIMITER ;