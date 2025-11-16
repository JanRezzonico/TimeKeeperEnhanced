# RESTful API Routes

Requests are authentication-protected unless otherwise noted.

Requests are also auhtentication-based, meaning that instead of providing explicitly in the URL which user you are acting on behalf of, the server infers this from the provided authentication token.
For example, to get the information of the authenticated user, you would send a `GET` request to `/user`, not `/user/{id}`, because the user id is inferred from the authentication token's payload.

The API follows standard RESTful and idempotent principles.

For authentication, JWT tokens are used. These tokens should be provided in the `Authorization` header of each request. The JWT should always hold the user's id in its payload.

Any request to a route that requires authentication without a valid JWT token will result in a `401 Unauthorized` response.

Any request to an id'd resource that does not belong to the authenticated user will result in a `403 Forbidden` response. Potentially a `404 Not Found` response would be great to conceal the existence of the resource, but since the data here is not particularly sensitive, `403 Forbidden` is better for its clarity.

## User Routes

For the `user` resource, the following routes are available:

`GET /user` - Retrieve the information of the authenticated user.

`POST /user` - `NOT AUTHENTICATED` - Create a new user and return a jwt.

`POST /user/login` - `NOT AUTHENTICATED` - Authenticate a user and return a jwt.

`POST /user/logout` - `NOT AUTHENTICATED` - Logout the authenticated user.

`PATCH /user` - Update the information of the authenticated user.

`DELETE /user` - Delete the authenticated user.

## Session Routes

All operations on sessions are performed on behalf of the authenticated user.

For the `session` resource, the following routes are available:

`GET /session` - `PAGINATED` - Retrieve all sessions of the authenticated user.

`GET /session/{id}` - Retrieve a specific session by its ID.

`POST /session` - Create a new session.

`PATCH /session/{id}` - Update a specific session by its ID.

`DELETE /session/{id}` - Delete a specific session by its ID.

## Exception Routes

Again, all operations on exceptions are performed on behalf of the authenticated user.

For the `exception` resource, the following routes are available:

`GET /exception` - `PAGINATED` - Retrieve all exceptions of the authenticated user.

`GET /exception/{id}` - Retrieve a specific exception by its ID.

`POST /exception` - Create a new exception.

`PATCH /exception/{id}` - Update a specific exception by its ID.

`DELETE /exception/{id}` - Delete a specific exception by its ID.

## Statistics Routes

This is a virtual read-only resource that provides aggregated data about the user's sessions and exceptions.

For the `statistics` resource, the following routes are available:
