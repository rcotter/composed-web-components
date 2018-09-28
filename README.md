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
* Import lit-html directly in components as per https://jakearchibald.com/2017/es-modules-in-browsers/
* Minimal state updates. Could just be a plain JSON. Or Redux. On the update() handler.
* POC cache busting
* HTTP/2?
* Passing attributes