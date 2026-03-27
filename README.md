# Math-Gym

Math-Gym ([math-gym.stefanlapointe.com](https://math-gym.stefanlapointe.com)) is a website for doing math practice problems.

## Current features

- Arithmetic problems
- Endless mode
- Routine mode

## Planned features

- New problem types:
  - Algebra
  - Calculus
  - Number theory
  - Graph theory
- Accounts:
  - Permanent progress
  - Custom routines

## Development

To run this project on your own computer, you need Java 21 and Node 20.

The backend can be run on http://localhost:8080 with the `bootRun` Gradle task.

More specifically, you need to run `./gradlew bootRun --args='--spring.profiles.active=dev'` after creating an `application-dev.properties` file in the same directory as `application.properties` and `application-prod.properties` that configures `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`, and, if needed, `spring.jpa.hibernate.ddl-auto` (for example by setting it to `update` so that you don't have to manually create the tables). This application expects to connect to a MySQL database, but migration to MariaDB is likely in the future. I recommend creating a compose.yaml file in the root directory to run a containerized database.

The frontend can be run on https://localhost:4200 with `ng serve` if you have Angular CLI installed, or with `npm start` otherwise.

Note that the frontend runs over HTTPS. It has been configured this way so that Secure cookies work in development. In order for HTTPS to work, you need to install `mkcert`, then run `mkcert -install`, and then run `mkcert localhost` inside of the `frontend` directory. Alternatively, you can create an SSL certificate named `localhost.pem` and an SSL key named `localhost-key.pem` inside of the `frontend` directory by whatever means you like, however mkcert is nice because it doesn't require any configuration and installs a CA on your computer to sign the certificate so that your browser doesn't show you a warning.

## Design

### Tech stack

- The frontend is Angular and the backend is Dockerized Spring Boot.
- The frontend and backend are both deployed to my Oracle Cloud VM instance using GitHub Actions.
- NGINX acts as the web server for the frontend and a reverse proxy for the backend.

### Backend architecture

#### Problem API

- Problem generation responses include a seed that can be used to re-generate the problem, which is to be included in problem correction requests. This allows the math problem API to simultaneously keep answer correction on the server side, avoid having any state related to active problems, and avoid persisting any data related to specific problems.
- `ProblemService` uses dependency injection to obtain a map of all `ProblemHandler` implementations. This means that all you have to do to add a new problem type is create the class and annotate it with `@Component("problem type goes here")`. Nothing else needs to be modified.
- Classes ending in `Fact` are used to avoid code duplication for dual problem types, such as `AdditionSubtractionFact`, which is used by both `AdditionProblemHandler` and `SubtractionProblemHandler`.

# Security

- Session cookies and CSRF token cookies are used for the synchronizer token pattern in order to make the application resistant to CSRF attacks.
- The session cookies are HttpOnly, which provides defense in depth in case of a XSS attack that might try to steal a user's credentials.
- All cookies are Secure, so they can never be sent over an unencrypted connection.
