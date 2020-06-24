create table person
(
	id serial not null
		constraint person_pk
			primary key,
	first_name varchar(30) not null,
	last_name varchar(30) not null,
	birth_date timestamp not null
);

INSERT INTO person (id, first_name, last_name, birth_date) VALUES 
(1, 'John', 'Smith', '2000-01-01 00:00:00'),
(2, 'Jane', 'Smith', '2001-01-01 00:00:00'),
(3, 'Jim', 'Smith', '2019-01-01 00:00:00'),
(4, 'Jenny', 'Smith','2020-01-01 00:00:00'),
(5, 'George', 'Smith', '1950-01-01 00:00:00'),
(6, 'Ruth', 'Young', '1951-01-01 00:00:00');