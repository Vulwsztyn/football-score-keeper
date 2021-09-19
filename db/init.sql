\connect postgres

CREATE TABLE player (
    id serial PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE team (
    id serial PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE game (
    id serial PRIMARY KEY
);

CREATE TABLE team_player (
    team_id INTEGER references team(id) NOT NULL,
    player_id INTEGER references player(id) NOT NULL,
    UNIQUE (team_id, player_id)
);

CREATE TABLE team_game (
    id serial PRIMARY KEY,
    team_id INTEGER references team(id) NOT NULL,
    game_id INTEGER references game(id) NOT NULL,
    score int NOT NULL,
    UNIQUE (team_id, game_id)
);

insert into player(name) values ('Gandalf') returning id;
insert into player(name) values ('Aragorn') returning id;
insert into player(name) values ('Kaladin') returning id;
insert into player(name) values ('Roland') returning id;
insert into player(name) values ('Jake') returning id;
insert into player(name) values ('Kelsier') returning id;

insert into team(name) values ('Fellowship') returning id;
insert into team(name) values ('Bridgemen') returning id;
insert into team(name) values ('Ka-tet') returning id;
insert into team(name) values ('Mistborn') returning id;

insert into team_player(team_id, player_id) SELECT (select id from team where name='Fellowship'), (select id from player where name='Gandalf');
insert into team_player(team_id, player_id) SELECT (select id from team where name='Fellowship'), (select id from player where name='Aragorn');
insert into team_player(team_id, player_id) SELECT (select id from team where name='Bridgemen'), (select id from player where name='Kaladin');
insert into team_player(team_id, player_id) SELECT (select id from team where name='Ka-tet'), (select id from player where name='Roland');
insert into team_player(team_id, player_id) SELECT (select id from team where name='Ka-tet'), (select id from player where name='Jake');
insert into team_player(team_id, player_id) SELECT (select id from team where name='Mistborn'), (select id from player where name='Kelsier');

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Fellowship'), 3;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Mistborn'), 5;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Fellowship'), 4;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Bridgemen'), 7;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Fellowship'), 9;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Ka-tet'), 2;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Bridgemen'), 8;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Mistborn'), 5;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Ka-tet'), 5;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Mistborn'), 4;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Bridgemen'), 1;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Ka-tet'), 3;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Fellowship'), 9;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Mistborn'), 9;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Fellowship'), 4;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Bridgemen'), 4;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Fellowship'), 8;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Ka-tet'), 7;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Bridgemen'), 1;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Mistborn'), 5;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Ka-tet'), 5;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Mistborn'), 6;
END $$;

DO $$
DECLARE game_id integer;
BEGIN
  INSERT INTO game(id) values(DEFAULT) returning id into game_id;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Bridgemen'), 6;
  insert into team_game(game_id,team_id,score) SELECT game_id,(select id from team where name='Ka-tet'), 9;
END $$;
