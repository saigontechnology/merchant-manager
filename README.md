# Merchant Manager

## Prerequisite:
Your machine must already installed:

* NodeJS
* Yarn

## Techs and libs:
Developers must be familiar with:

* `react`
* `redux`
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)
* React Router v4
* `redux-saga`
* `styled-components`
* `jest`
* `eslint`
* `prettier` (your code will be formated on every commit)

## Commands:

#### Run at first time clone project:

* `yarn install`: Run at first time clone this project or when any module missing.
* `yarn json-server`: Start mock json server.
* `yarn start`: Start project at development mode.

#### Build

* `yarn build`: Build for production

#### Test

* `yarn test`: Run tests on watch mode.

## Project structure:

The main idea of this is to make things high cohesive.

* `/src`
  * `index.js`
  * `App.js`: Single app root component.
  * `AppRoutes.js`: App Route configuration.
  * `/constants`
  * `/redux`: All common setup for Redux (reducers, store, middlewares)
  * `/helpers`: Helpers/Utility functions that would be used among modules
    * `FetchHelper.js`: A wrapper for Fetch API, see `src/helpers/fetchHelper.js` for more information.
  * /components: contains React components, which are reused among modules. Building /components is like building Bootstrap or Material UI components, they are the view foundation of the application. Everything in here should have documentation and be well tested..
  * `/modules`: contains modules, each module represents a feature, everything (component, action, reducer, saga, ...) that closely relates to each other, should be kept in a module. And when a module becomes fat, it should be separated into smaller ones
    * `/module1`: A module may relate to a feature. It contains many components, pages, actions, reducers, services, ... which are highly relate to each other.
      * `index.js`: All module items which are needed to be used from outside need to be export from here. From the outside, avoid to import module item directly.
      * `/action`: Redux actions
      * `/component`: React components, could be separated into 2 directories: containers and presenters if nessessary.
      * `/reducer`: Redux reducers
      * `/...`: More directories if nessessary.
    * `/module2`
    * `/...`

## IDE

* Recommended: Visual Studio Code, Webstorm, ...
* Recommended extensions for Visual Studio Code:
  * Babel: https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring
  * Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
  * ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
  * Path-autocomplete: https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete