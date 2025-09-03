# Math-Gym

Math-Gym ([math-gym.stefanlapointe.com](https://math-gym.stefanlapointe.com)) is a website for doing math practice problems.

## Current features

- Arithmetic problems

## Planned features

- New problem types:
  - Algebra
  - Calculus
  - Number theory
  - Graph theory
- Accounts:
  - Permanent progress
  - Custom practice routines

## Design

### Tech stack

- The frontend is Angular and the backend is Dockerized Spring Boot.
- The frontend and backend are both deployed to my Oracle Cloud VM instance using GitHub Actions.
- NGINX acts as the web server for the frontend and a reverse proxy for the backend.

### Backend architecture

- Problem generation responses include a seed that can be used to re-generate the problem, which is to be included in problem correction requests. This allows the math problem API to simultaneously keep answer correction on the server side, avoid having any state related to active problems, and avoid persisting any data related to specific problems.
- `ProblemService` uses dependency injection to obtain a map of all `ProblemHandler` implementations. This means that all you have to do to add a new problem type is create the class and annotate it with `@Component("problem type goes here")`. Nothing else needs to be modified.
- Classes ending in `Fact` are used to avoid code duplication for dual problem types, such as `AdditionSubtractionFact`, which is used by both `AdditionProblemHandler` and `SubtractionProblemHandler`.
