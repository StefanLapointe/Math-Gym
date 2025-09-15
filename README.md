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

### Details

There should be two ways to practice: "endless mode" and "custom routines". Endless mode should exist for any problem type, and it should give the user an unlimited number of problems of that type, increasing in difficult once a difficulty setting is added, with 3 lives. Endless mode ends when all 3 lives are lost. The score is the number of correct answers. Custom routines consist of a list of entries of the form "N problems of type T at X difficulty" and the score is a fraction or a percentage corresponding to the proportion of answers that were correct. When a user is logged in, the high score in endless mode for each problem type is saved, and custom routines can be created, and statistics about past performance on cusstom routines might be saved in some way. When a user is logged out, some number of "demo routines" may exist, and endless mode will be available, but nothing can be saved. Account settings should be able to be used to set an account as public or private, which will determine whether one shows up on the leaderboard, and also to reate custom routines. Perhaps a user should be able to create a personal schedule that consists of custom routines that are to be completed on specific days of the week. Perhaps endless mode should involve some timing mechanism to continue increasing difficulty. Perhaps endless mode should be called marathon mode. Careful authentication for everything while logged in will be required to prevent illegitimate progress from being saved. The current state of an active training session of a registered user should be represented as an entity in a table in the database. This should be created upon request and destroyed when a new one is requested or when it ends. When logged out users request problems they will have to specify the type since they don't have an active training session in the database. When a logged in user requests a problem I'm not sure what to do or how it should work. But the intended way for a non-hacked client to work is that it will receive a problem based on the state of the active session. It should probably omit problem specification fields from the request object. Perhaps if they are passed they should be ignored, that seems simple. Then when a logged out user provides an answer they have to include some extra information and when a logged in user provides an answer they just give the answer and the backend knows what the question is thanks to the active session state in the database. The database responds with all of the game state upon receiving an answer request. The frontend updates itself according to the game state. Some display logic for endless vs. routine modes may be included in frontend, perhaps using routing.

I need to redesign the DTOs and the API. There needs to be a way to request problem types for endless mode and to request routines for routine mode. There needs to be a way to request a training session. (Perhaps a resume button will be included on the home page, along with a way to request the ongoing session, if it exists). Probably simpler to begin with not to include that, that can come later. A way of asking for the next problem based either on session ID or on specific details is needed. A way of submitting an answer either based on session ID or on specific details is needed. Some sort of game summary request is probably NOT needed.

First I should modify the API so that it treats logged out users as specififed above. Then it will be easier to add the authenticated functionality. When I do so I will need an account creation mechanic and a login mechanic. I will need to learn a log of new stuff for account-related functionality.

## Development

To run this project on your own computer, you need Java 21 and Node 20.

The backend can be run on http://localhost:8080 with the `bootRun` Gradle task.

The frontend can be run on https://localhost:4200 with `ng serve` if you have Angular CLI installed, or with `npm start` otherwise.

Note that the frontend runs over HTTPS. It has been configured this way so that Secure cookies work in development. In order for HTTPS to work, you need to install cert, run `mkcert -install`, and then run `mkcert localhost` inside of the `frontend` directory. Alternatively, you can create an SSL certificate named `localhost.pem` and an SSL key named `localhost-key.pem` inside of the `frontend` directory by whatever means you like, however mkcert is nice because it doesn't require any configuration and installs a CA on your computer to sign the certificate so that your browser doesn't show you a warning.

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
