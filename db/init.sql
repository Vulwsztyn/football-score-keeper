\connect postgres

CREATE TABLE test_table (
	id serial PRIMARY KEY,
	name VARCHAR UNIQUE NOT NULL
);

insert into test_table(name) values ('test');
insert into test_table(name) values ('test2');
