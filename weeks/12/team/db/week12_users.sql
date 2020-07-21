create table users
(
	id serial not null
		constraint users_pk
			primary key,
	username varchar(80) not null,
	password varchar(80) not null
);

INSERT INTO users (id, username, password) VALUES 
(1, 'admin', 'password1'),
(2, 'user2', 'password2');