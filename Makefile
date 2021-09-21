dev:
	docker-compose up

db:
	docker-compose up -d postgres

build:
	docker build -t football_app .

run-built:
	docker run -it --network="host" football_app

prod: build run-built