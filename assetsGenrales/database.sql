--PK=	Primary Key
--NN=	Not Null
--FK=	Foraign Key
--R= 	Referencia
--AI=	Auto Incremental
--NAI=	No AutoIncremental
--D= 	Default
--DC=	Dato Compuesto

--persona
--id:int NN AI PK
--documento:varchar NN
--usuario:varchar NN
--password:varchar NN
--correo_electronico:varchar NN
--domicilio:varchar NN
--nacimiento:date NN
--id_genero_persona:enum R:('MASCULINO','FEMENINO')


--pelicula
--id:int NN PK NAI
--titulo:varchar NN

--funcion
--id:int AI NN PK
--fecha:date NN
--hora:time NN
--id_sala:int NN FK R:salas(id)
--id_pelicula:int NN FK R:pelicula(id)
--precio:double NN

--entradas
--id:int AI NN PK
--doc_usuario:varchar NN FK R:persona(id)
--id_funcion:int NN FK R:funcion(id)

--combos
--id:int AI NN PK
--descripcion:varchar NN
--precio:double NN

--combos_entrada
--id_combo:int AI NN PK FK R:combos(id)
--id_entrad:int AI NN PK FK R:entradas(id)
--cantidad:int NN D(1)

--salas
--id:int AI NN PK
--nombre:varchar NN

--butacas
--id:int PK AI
--id_sala:int NN FK R:salas(id)
--letra:varchar NN DC
--numero:int NN DC

--entrada_butacas
--id_entrada:int NN PK FK R:entradas(id)
--id_butaca:int NN PK FK R:butaca(id)



CREATE TABLE persona (
  id_persona int NOT NULL AUTO_INCREMENT,
  documento varchar(255) NOT NULL,
  nombre varchar(255) NOT NULL,
  apellido varchar(255) NOT NULL,
  fecha_nacimiento date NOT NULL,
  genero ENUM ('MASCULINO', 'FEMENINO') NOT NULL,
  PRIMARY KEY (id_persona)
);

CREATE TABLE pelicula (
  id_pelicula int NOT NULL AUTO_INCREMENT,
  titulo varchar(255) NOT NULL,
  PRIMARY KEY (id_pelicula)
);

CREATE TABLE combo (
  id_combo int NOT NULL AUTO_INCREMENT,
  descripcion varchar(255) NOT NULL,
  precio double NOT NULL,
  PRIMARY KEY (id_combo)
);

CREATE TABLE sala (
  id_sala int NOT NULL AUTO_INCREMENT,
  nombre varchar(255) NOT NULL,
  capacidad int NOT NULL,
  PRIMARY KEY (id_sala)
);


CREATE TABLE funcion (
  id_funcion int NOT NULL AUTO_INCREMENT,
  fecha date NOT NULL,
  hora time NOT NULL,
  id_sala int NOT NULL,
  id_pelicula int NOT NULL,
  precio double NOT NULL,
  PRIMARY KEY (id_funcion),
  FOREIGN KEY (id_sala) REFERENCES sala (id_sala),
  FOREIGN KEY (id_pelicula) REFERENCES pelicula (id_pelicula)
);

CREATE TABLE entrada (
  id_entrada int NOT NULL AUTO_INCREMENT,
  id_usuario int NOT NULL,
  id_funcion int NOT NULL,
  PRIMARY KEY (id_entrada),
  FOREIGN KEY (id_usuario) REFERENCES persona (id_persona),
  FOREIGN KEY (id_funcion) REFERENCES funcion (id_funcion)
);

CREATE TABLE combos_entrada (
  id_combo int NOT NULL,
  id_entrada int NOT NULL,
  cantidad int NOT NULL,
  PRIMARY KEY (id_combo, id_entrada),
  FOREIGN KEY (id_combo) REFERENCES combo (id_combo),
  FOREIGN KEY (id_entrada) REFERENCES entrada (id_entrada)
);


CREATE TABLE butaca (
  id int NOT NULL AUTO_INCREMENT,
  id_sala int NOT NULL,
  letra varchar(1) NOT NULL,
  numero int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_sala) REFERENCES sala (id_sala)
);

CREATE TABLE entrada_butaca (
  id_entrada int NOT NULL,
  id_butaca int NOT NULL,
  PRIMARY KEY (id_entrada, id_butaca),
  FOREIGN KEY (id_entrada) REFERENCES entrada (id_entrada),
  FOREIGN KEY (id_butaca) REFERENCES butaca (id)
);

CREATE INDEX idx_funcion_fecha_hora ON funcion (fecha, hora);
CREATE INDEX idx_combo_descripcion ON combo (descripcion);
CREATE INDEX idx_sala_capacidad ON sala (capacidad);
CREATE INDEX idx_butaca_id_sala ON butaca (id_sala);
CREATE INDEX idx_entrada_butaca_id_entrada ON entrada_butaca (id_entrada);
---------------------------------------------------------------------------------------------------------------------------
--PROCEDURES
---------------------------------------------------------------------------------------------------------------------------
--AGREGAR BUTACAS
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE agregar_butaca(
  IN letra CHAR(1),
  IN numero INT,
  IN id_sala INT
)
BEGIN

  -- Verificar que la letra sea válida
  IF letra NOT IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z') THEN
    RAISE EXCEPTION 'La letra debe ser una de las siguientes: A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z';
  END IF;

  -- Verificar que el número sea válido
  IF numero < 1 OR numero > 100 THEN
    RAISE EXCEPTION 'El número debe ser un número entre 1 y 100';
  END IF;

  -- Verificar que la sala exista
  SELECT *
  FROM sala
  WHERE id_sala = id_sala;

  -- Crear la butaca
  INSERT INTO butaca (id_sala, letra, numero)
  VALUES (id_sala, letra, numero);

  -- Actualizar la cantidad de butacas de la sala
  UPDATE sala
  SET capacidad = (SELECT COUNT(*)
                 FROM butaca
                 WHERE id_sala = id_sala)
  WHERE id_sala = id_sala;

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--Agregar SALAS y butacas
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE crear_salas()
BEGIN

  -- Crear las salas
  FOR i IN 1..4
  LOOP
    INSERT INTO sala (nombre)
    VALUES (CONCAT('Sala ', i));
  END LOOP;

  -- Crear las butacas de las salas
  FOR i IN 1..4
  LOOP
    FOR letra IN 'A'..'K'
    LOOP
      FOR numero IN 1..15
      LOOP
        CALL agregar_butaca(letra, numero, i);
      END LOOP;
    END LOOP;
  END LOOP;

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--Consultar butacas
---------------------------------------------------------------------------------------------------------------------------
DELIMITER //
CREATE FUNCTION butacas_por_funcion(
  IN id_funcion INT
)
BEGIN

  -- Verificar que la función exista
  SELECT *
  FROM funcion
  WHERE id = id_funcion;

  -- Devolver la información de las butacas
  SELECT
    butaca.id,
    butaca.letra || butaca.numero AS codigo,
    CASE
      WHEN COUNT(*) > 0 THEN 'Reservado'
      ELSE 'Libre'
    END AS estado
  FROM butaca
  INNER JOIN entrada_butaca
    ON butaca.id = entrada_butaca.id_butaca
  WHERE entrada_butaca.id_funcion = id_funcion
  GROUP BY butaca.id;

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--Compra de entradas
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE comprar_butaca(
  IN id_funcion INT,
  IN id_butaca INT,
  IN id_usuario INT
)
BEGIN

  -- Verificar que la función exista
  SELECT *
  FROM funcion
  WHERE id = id_funcion;

  -- Verificar que la butaca exista
  SELECT *
  FROM butaca
  WHERE id = id_butaca;

  -- Verificar que la butaca no esté reservada
  SELECT COUNT(*)
  FROM entrada_butaca
  WHERE id_butaca = id_butaca
  AND id_funcion = id_funcion;

  -- Agregar la entrada a la tabla `entrada_butaca`
  INSERT INTO entrada_butaca (id_funcion, id_butaca, id_usuario)
  VALUES (id_funcion, id_butaca, id_usuario);

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--Compra de combos
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE comprar_combo(
  IN id_entrada INT,
  IN id_combo INT,
  IN cantidad INT
)
BEGIN

  -- Verificar que la entrada exista
  SELECT *
  FROM entrada
  WHERE id = id_entrada;

  -- Verificar que el combo exista
  SELECT *
  FROM combo
  WHERE id = id_combo;

  -- Verificar que la entrada no haya comprado el mismo combo
  SELECT COUNT(*)
  FROM compra_combo
  WHERE id_entrada = id_entrada
  AND id_combo = id_combo;

  -- Si la entrada no ha comprado el combo, agregar una nueva compra
  IF COUNT(*) = 0 THEN
    INSERT INTO compra_combo (id_entrada, id_combo, cantidad)
    VALUES (id_entrada, id_combo, cantidad);

  -- Si la entrada ya ha comprado el combo, actualizar la cantidad
  ELSE
    UPDATE compra_combo
    SET cantidad = cantidad + cantidad
    WHERE id_entrada = id_entrada
    AND id_combo = id_combo;
  END IF;
END
//
DELIMITER;

---------------------------------------------------------------------------------------------------------------------------
--creacion de funcion
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE crear_funcion(
  IN fecha DATE,
  IN hora TIME,
  IN sala VARCHAR(10),
  IN pelicula VARCHAR(50),
  IN precio DECIMAL(10,2)
)
AS
BEGIN

  -- Verificar que la fecha sea válida
  IF fecha < CURRENT_DATE THEN
    RAISE EXCEPTION 'La fecha debe ser posterior a la fecha actual';
  END IF;

  -- Verificar que la hora sea válida
  IF hora < '00:00:00' OR hora > '23:59:59' THEN
    RAISE EXCEPTION 'La hora debe ser válida';
  END IF;

  -- Verificar que la sala exista
  SELECT *
  FROM sala
  WHERE sala = sala;

  -- Verificar que la película exista
  SELECT *
  FROM pelicula
  WHERE titulo = pelicula;

  -- Verificar que no haya otra función en la sala a la misma hora y el mismo día
  SELECT COUNT(*)
  FROM funcion
  WHERE fecha = fecha
  AND hora = hora
  AND sala = sala;

  IF COUNT(*) > 0 THEN
    RAISE EXCEPTION 'Ya existe una función programada para esta fecha, hora y sala';
  END IF;

  -- Verificar que, si es la misma sala pero distinta hora, que haya un margen de 3 horas entre las demás películas
  IF sala = sala THEN
    SELECT *
    FROM funcion
    WHERE fecha = fecha
    AND sala = sala
    AND hora < hora;

    IF COUNT(*) > 0 THEN
      IF hora - hora < '03:00:00' THEN
        RAISE EXCEPTION 'No hay suficiente tiempo entre funciones';
      END IF;
    END IF;
  END IF;

  -- Crear la función
  INSERT INTO funcion (fecha, hora, sala, pelicula, precio)
  VALUES (fecha, hora, sala, pelicula, precio);

END
//
DELIMITER;

---------------------------------------------------------------------------------------------------------------------------
--creacion de peliculas
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE crear_pelicula(
  IN id INT,
  IN titulo VARCHAR(50)
)
AS
BEGIN

  -- Verificar que el id sea válido
  IF id <= 0 THEN
    RAISE EXCEPTION 'El id debe ser mayor que 0';
  END IF;

  -- Verificar que el título sea válido
  IF titulo IS NULL OR titulo = '' THEN
    RAISE EXCEPTION 'El título debe ser válido';
  END IF;

  -- Verificar que la película no exista
  SELECT COUNT(*)
  FROM pelicula
  WHERE id = id;

  IF COUNT(*) > 0 THEN
    RAISE EXCEPTION 'La película ya existe';
  END IF;

  -- Crear la película
  INSERT INTO pelicula (id, titulo)
  VALUES (id, titulo);

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--creacion de usuarios
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE PROCEDURE crear_persona(
  IN documento VARCHAR(255),
  IN nombre VARCHAR(255),
  IN apellido VARCHAR(255),
  IN fecha_nacimiento DATE,
  IN genero ENUM ('MASCULINO', 'FEMENINO')
)
AS
BEGIN

  -- Verificar que el documento sea válido
  IF documento IS NULL OR documento = '' THEN
    RAISE EXCEPTION 'El documento debe ser válido';
  END IF;

  -- Verificar que el nombre sea válido
  IF nombre IS NULL OR nombre = '' THEN
    RAISE EXCEPTION 'El nombre debe ser válido';
  END IF;

  -- Verificar que el apellido sea válido
  IF apellido IS NULL OR apellido = '' THEN
    RAISE EXCEPTION 'El apellido debe ser válido';
  END IF;

  -- Verificar que la fecha de nacimiento sea válida
  IF fecha_nacimiento IS NULL OR fecha_nacimiento < '1900-01-01' THEN
    RAISE EXCEPTION 'La fecha de nacimiento debe ser válida';
  END IF;

  -- Verificar que el género sea válido
  IF genero IS NULL OR genero NOT IN ('MASCULINO', 'FEMENINO') THEN
    RAISE EXCEPTION 'El género debe ser válido';
  END IF;

  -- Crear la persona
  INSERT INTO persona (documento, nombre, apellido, fecha_nacimiento, genero)
  VALUES (documento, nombre, apellido, fecha_nacimiento, genero);

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--calcular edad de usuario
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE FUNCTION calcular_edad(
  IN id_persona INT
)
RETURNS INT
AS
BEGIN

  -- Obtener la fecha de nacimiento de la persona
  SELECT fecha_nacimiento
  FROM persona
  WHERE id_persona = id_persona;

  -- Calcular la edad
  RETURN YEAR(CURRENT_DATE) - YEAR(fecha_nacimiento);

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--ingresos
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE FUNCTION calcular_ingresos(
  IN fecha_inicio DATE,
  IN fecha_fin DATE
)
RETURNS DECIMAL(10,2)
AS
BEGIN

  -- Variables
  DECLARE precio_entradas DECIMAL(10,2) DEFAULT 0;
  DECLARE precio_combos DECIMAL(10,2) DEFAULT 0;
  DECLARE numero_entradas INT DEFAULT 0;
  DECLARE numero_combos INT DEFAULT 0;
  DECLARE precio_entrada_promedio DECIMAL(10,2) DEFAULT 0;
  DECLARE precio_combo_promedio DECIMAL(10,2) DEFAULT 0;

  -- Obtener el precio de las entradas vendidas
  SELECT SUM(precio_funcion * numero_butacas) INTO precio_entradas
  FROM venta_entrada
  WHERE fecha BETWEEN fecha_inicio AND fecha_fin;

  -- Obtener el número de entradas vendidas
  SELECT COUNT(*) INTO numero_entradas
  FROM venta_entrada
  WHERE fecha BETWEEN fecha_inicio AND fecha_fin;

  -- Obtener el precio de los combos vendidos
  SELECT SUM(precio_combo) INTO precio_combos
  FROM venta_combo
  WHERE fecha BETWEEN fecha_inicio AND fecha_fin;

  -- Obtener el número de combos vendidos
  SELECT COUNT(*) INTO numero_combos
  FROM venta_combo
  WHERE fecha BETWEEN fecha_inicio AND fecha_fin;

  -- Calcular el precio promedio de las entradas
  IF numero_entradas > 0 THEN
    precio_entrada_promedio = precio_entradas / numero_entradas;
  END IF;

  -- Calcular el precio promedio de los combos
  IF numero_combos > 0 THEN
    precio_combo_promedio = precio_combos / numero_combos;
  END IF;

  -- Devolver el total de ingresos
  RETURN precio_entradas + precio_combos;

END
//
DELIMITER;
---------------------------------------------------------------------------------------------------------------------------
--mostrar ventas
---------------------------------------------------------------------------------------------------------------------------
DELIMITER//
CREATE FUNCTION mostrar_ventas(
)
RETURNS TABLE(
  id_venta INT,
  id_usuario INT,
  id_funcion INT,
  fecha DATE,
  numero_butacas INT,
  precio_entradas DECIMAL(10,2),
  precio_combos DECIMAL(10,2)
)
AS
BEGIN

  -- Variables
  DECLARE ventas_entradas TABLE(
    id_venta INT,
    id_usuario INT,
    id_funcion INT,
    fecha DATE,
    numero_butacas INT,
    precio_entradas DECIMAL(10,2)
  );
  DECLARE ventas_combos TABLE(
    id_venta INT,
    id_funcion INT,
    fecha DATE,
    precio_combos DECIMAL(10,2)
  );

  -- Obtener las ventas de entradas
  SELECT
    id_venta,
    id_usuario,
    id_funcion,
    fecha,
    SUM(numero_butacas) AS numero_butacas,
    SUM(precio_funcion * numero_butacas) AS precio_entradas
  INTO ventas_entradas
  FROM venta_entrada
  GROUP BY id_venta, id_usuario, id_funcion, fecha;

  -- Obtener las ventas de combos
  SELECT
    id_venta,
    id_funcion,
    fecha,
    SUM(precio_combo) AS precio_combos
  INTO ventas_combos
  FROM venta_combo
  GROUP BY id_venta, id_funcion, fecha;

  -- Combinar las ventas de entradas y combos
  SELECT
    ventas_entradas.id_venta,
    ventas_entradas.id_usuario,
    ventas_entradas.id_funcion,
    ventas_entradas.fecha,
    ventas_entradas.numero_butacas,
    ventas_entradas.precio_entradas + ventas_combos.precio_combos AS precio_total
  FROM ventas_entradas
  LEFT JOIN ventas_combos
  ON ventas_entradas.id_venta = ventas_combos.id_venta
  AND ventas_entradas.fecha = ventas_combos.fecha
  AND ventas_entradas.id_funcion = ventas_combos.id_funcion;

END
//
DELIMITER;