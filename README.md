## Bhanwari Devi

Bhanwari Devi is an inspiring human being for us. She has faught like hell for her rights and social injustice. We have decided to give her name to this project.  Read more about her [here](https://medium.com/@dalithistorynow/dalit-history-month-2019-celebrating-bhanwari-devi-c4bd47d7126e).

## Motivation

It's okay to break stuff on dev. Even it's ok to break stuff on production( if the reviewer is not able to catch the bug.:P) Kudos to you. We believe same time we should be able to send a fix as soon as we can. Or send it before even someone figures out the bug(probably testing your feature, and catching it before anyone else). Everything aside, Just don't shy away in sending a PR. We all are learning and trying to do better here. 


## Code Strucutre
The philosophy of the code strucutre is that if you have some work in the village then you should find everything in that village which helps you to do complete the work. And you don't need to visit the complex city life to get your work done. let's face it, it's tiring and a bit complex. Here we want that root component contains everything and you should stay inside that component as much as you can and you don't need to worry about what's happening in other part of application. 

For example, we have component called `Course` all the api, redux, redux-saga, and constant should stay inside this component directory. So if someone wants to build a feature in the course section or course related feature, he/she/they don't need to go outside this componenent directory. and their cognitive load doesn't need to worry about other parts of the application. We have a `redux` folder in root components which takes care of the component related api calls, redux state, and redux-saga handlers. 

Note: if you are using some constant that might be needed in other components(i.e. url paths), then you have to put that kind of information in the src/constant.js file. And if some utility function which is related with common ideas(i.e time, date, string related functions), we should also put them into root `service` section. 

- Containers/page
  - The main container of every page(basically a different url route.)
  
- Component(It could be root component which has all the child component which belongs to this component. i.e see `Course` component)
  - redux(Root level component will have all the redux realted things of this component.)
  -Child1Component
  -Child2Component
  - constant.js( Constants which are related with this component and child component)
  - index.js
  - styles.scss

## How to do an API call and manage state
 The whole point of using redux and redux saga is that we can have a structure around managing the state of the application. Sorry if you are not new to redux and redux saga. it's not that complex. Sure there is so much information about these things on the internet. But you just need to have a basic idea to use it. or we are here to help you if you don't understand something. We will walk you thought it, or we can also help you to create your first api call through redux and redux saga. Just ask one of us, and we are more than happy to help you. 

 So let's learn something about how we use redux and redux-saga in our code. There are basically 4 things.
 - Actions
 - Redux State
 - Redux middlewars(aka redux-saga)
 - API calls
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

To run production build in the local environment please run following code after `npm run build`. [Note: Make sure you have all the production environment variable in `.env.production` file.]
```
 npm install -g serve
 serve -s build
```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
