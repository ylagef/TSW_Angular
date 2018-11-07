# Are u free API-REST guide:

## Starting the api:

`$ cd api-rest`
`$ npm install`
`$ npm start`

> It will start servering the API REST on localhost:3000/

## Available consults:

### Users:

`GET localhost:3000/api/v1/users` - List all users

`GET localhost:3000/api/v1/users/:id` - List user by id

`POST localhost:3000/api/v1/users/` - Create new user

`DELETE localhost:3000/api/v1/users/:id` - Delete user by id

`*PUT localhost:3000/api/v1/users/:id` - Update user by id

### Polls:

`GET localhost:3000/api/v1/polls` - List all polls

`GET localhost:3000/api/v1/polls/:id` - List poll by id

`POST localhost:3000/api/v1/polls/` - Create new poll

`DELETE localhost:3000/api/v1/poll/:id` - Delete poll by id

`*PUT localhost:3000/api/v1/poll/:id` - Update poll by id

### Gaps:

`GET localhost:3000/api/v1/gaps` - List all gaps

`GET localhost:3000/api/v1/gaps/:id` - List gap by id

`POST localhost:3000/api/v1/gaps/` - Create new gap

`DELETE localhost:3000/api/v1/gap/:id` - Delete gap by id

`*PUT localhost:3000/api/v1/gap/:id` - Update gap by id

### Assignations:

`GET localhost:3000/api/v1/assignations` - List all assignations

`GET localhost:3000/api/v1/assignations/:id` - List assignation by id

`POST localhost:3000/api/v1/assignations/` - Create new assignation

`DELETE localhost:3000/api/v1/assignation/:id` - Delete assignation by id

`*PUT localhost:3000/api/v1/assignation/:id` - Update assignation by id