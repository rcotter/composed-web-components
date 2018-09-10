# Composed Web Components Playground
Web components are served from microservices and composed 
together in a shell app for playing around with.

Dumb components simply render and so are served up from a public folder.

Smart components contain sensitive logic and so are served from secured routes.

## Running
1. `yarn start` the app and two microservices.
1. `yarn open` the shell app.

## Playing
### Unauthenticate a smart component
Open the shell app and edit the token of a smart component to see what happens when web component cannot be retrieved.


## TODO
* POC cache busting.
* HTTP/2?
* Passing attributes
* skatejs?