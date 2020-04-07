CREATE DATABASE project2;

CREATE TABLE person
(
	id SERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(200) NOT NULL,
	password VARCHAR(200) NOT NULL,
	name VARCHAR(200) NOT NULL,
	gender VARCHAR(20),
	birthdate DATE,
	phone VARCHAR(20),
	email VARCHAR(100),
	role VARCHAR(200),
	picture VARCHAR(200),
	date_added DATE
);


INSERT INTO person (username, password, name, gender, birthdate, phone, email, role, picture, date_added)
VALUES
('menamorado', 'pass1', 'Marvin Enamorado', 'Male', '1982-01-03', '504-9686-0301', 'marvin@gmail.com',
'nutritionist', 'profile.jpg', NOW());


CREATE TABLE patient
(
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INT NULL,
	name VARCHAR(200),
	gender VARCHAR(20),
	birthdate DATE,
	phone VARCHAR(20),
	email VARCHAR(100),
	occupation VARCHAR(200),
	date_added DATE
)

INSERT INTO patient (user_id, name, gender, birthdate, phone, email, occupation, date_added)
VALUES
(1, 'Manuel Medina', 'Male', '1950-05-01', '504-9898-3636', 'medina@hotmail.com', 'Carpenter', NOW());
INSERT INTO patient (user_id, name, gender, birthdate, phone, email, occupation, date_added)
VALUES
(1, 'Roberto Hernandez', 'Male', '1980-08-12', '504-9898-8751', 'rhernandez@outlook.com', 'Electrical Engineer', NOW());
INSERT INTO patient (user_id, name, gender, birthdate, phone, email, occupation, date_added)
VALUES
(1, 'Patty Young', 'Female', '1978-10-10', '504-9896-3506', 'pyounga@hotmail.com', 'Marketing Manager', NOW());