# Math-Gym

As of writing this, this is a work-in-progress project that is meant to eventually exist as a full-stack application on mathgym.stefanlapointe.com where you can practice math problems.

## Current features

- API for generating and evaluating arithmetic problems.

## Planned features

- Frontend
- Algebra problems
- Calculus problems
- Account creation
- Progress tracking

## Design

The backend responds to requests with ProblemController, which is annotated with @RestController.

Problem controller delegates problem generation and evaluation to ProblemService, which is annotated with @Service.

Service has access to every implementation of ProblemHandler via dependency injection. Each implementation of ProblemHandler is able to generate and evaluate a specific type of math problem. For example, AdditionProblemHandler knows how to generate and evaluate addition problems.

Every problem has a specific seed which can be used to determinstically regenerate the problem. This is done to allow the client to request for a solution to be evaluated without having to send back the whole problem and without the server having to be stateful or make use of persistence.

Classes with names ending in "Fact" exist to help implementations of ProblemHandler to avoid code repetition. For example, AdditionProblemHandler uses the class AdditionSubtractio fact to pseudorandomly generate a representation of an equation of the form `operand1 + operand2 == sum` from a seed. This means that the logic for generating such an equation does not have to be duplicated between AdditionProblemHandler's generation and evaluation methods. Furthermore, an equation of the form `operand1 + operand2 = sum` can be rearranged into the form `sum - operand2 = operand1`, and so SubtractionProblemHandler is also able to make use of the AdditionSubtractionFact class, hence the name.
