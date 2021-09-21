To run development environment: `docker-compose up` or `make dev`.

If you really want to just use `docker build .` you might want to consider running a database with `docker-compose up postgres` or `make db`, since the app will not work without it. I strongly recommend using `docker-compose up`.

To create a "production" build run `make prod`.