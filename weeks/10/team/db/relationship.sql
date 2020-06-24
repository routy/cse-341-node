create table relationship
(
	parent_id int not null
		constraint relationship_person_id_fk
			references person
				on update cascade on delete cascade,
	child_id int not null
		constraint relationship_person_id_fk_2
			references person
				on update cascade on delete cascade
);

create unique index relationship_parent_id_child_id_uindex
	on relationship (parent_id, child_id);

INSERT INTO relationship (parent_id, child_id) VALUES (1,3), (1,4), (2,3), (2,4), (5,1), (6,1);
