\connect postgres
CREATE TABLE test_table (
	id serial PRIMARY KEY,
	text VARCHAR ( 50 ) UNIQUE NOT NULL,
	number INTEGER NOT NULL
);

insert into test_table(text,number) values ('test_string_78012803', 2137);
