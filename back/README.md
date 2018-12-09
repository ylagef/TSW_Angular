# Are u free API-REST guide:

## Starting the api:

`$ npm i`
`$ nodemon`

> It will start servering the API REST on localhost:3000/

## Available consults:

### Users:

`GET localhost:3000/api/v1/users` - List all users

`GET localhost:3000/api/v1/users/:id` - List user by id

`POST localhost:3000/api/v1/users/register` - Create new user

`POST localhost:3000/api/v1/users/login` - Login user and get jwt

`PUT localhost:3000/api/v1/users` - Update user

### Polls:

`GET localhost:3000/api/v1/polls` - List all polls

`GET localhost:3000/api/v1/polls/:url` - List poll by url

`POST localhost:3000/api/v1/polls/` - Create new poll

`DELETE localhost:3000/api/v1/poll/:id` - Delete poll by id

`PUT localhost:3000/api/v1/poll/:id` - Update poll by id

### Gaps:

`GET localhost:3000/api/v1/gaps` - List all gaps

`GET localhost:3000/api/v1/gaps/:id` - List gap by id

`GET localhost:3000/api/v1/gaps/poll/:id` - List gap of poll by id

`POST localhost:3000/api/v1/gaps/` - Create new gap

`DELETE localhost:3000/api/v1/gap/:id` - Delete gap by id

`PUT localhost:3000/api/v1/gap/:id` - Update gap by id

### Assignations:

`GET localhost:3000/api/v1/assignations` - List all assignations

`GET localhost:3000/api/v1/assignations/:id` - List assignation by id

`GET localhost:3000/api/v1/assignations/user/:id` - List assignation by user id

`GET localhost:3000/api/v1/assignations/:gap_id/:user_id` - List assignation by gap id and user id

`POST localhost:3000/api/v1/assignations/` - Create new assignation

`DELETE localhost:3000/api/v1/assignation/:id` - Delete assignation by id

`DELETE localhost:3000/api/v1/assignation/:gap_id/:user_id` - Delete assignation by gap id and user id