## Bhanwari Devi

Bhanwari Devi is an inspiring human being for us. She has faught like hell for her rights and social injustice. We have decided to give her name to this project.  Read more about her [here](https://medium.com/@dalithistorynow/dalit-history-month-2019-celebrating-bhanwari-devi-c4bd47d7126e).

## Motivation

It's okay to break stuff on dev. Even it's ok to break stuff on production( if the reviewer is not able to catch the bug.:P) Kudos to you. We believe same time we should be able to send a fix as soon as we can. Or send it before even someone figures out the bug(probably testing your feature, and catching it before anyone else). Everything aside, Just don't shy away in sending a PR. We all are learning and trying to do better here. 

## Let's code together and build something beautiful
<img src='https://www.netclipart.com/pp/f/239-2392873_children-different-race.png'>


## Code Strucutre
The philosophy of the code strucutre is keeping things as small as they can be. We love Minions. Who doesn't. Keeping functions small, components small, and files small. And also you should be able to work under component directory. What we mean by that, you should't go out of the corresponding main component to do anythings unless you are making some utility function or css which might be useful through out the app. It's like if you have some work in the village then you should find everything in that village, which helps you to do complete the work. And you don't need to visit the complex city area to get your work done. All tools should be available near the work area(redux actions, state, api calls and constant file). let's face it, it's tiring and a bit complex when we have to travel far away directories. Here we want that root component contains everything realted with that component and you should stay inside that component as much as you can and you don't need to worry about what's happening in other parts of the application.( less conflict when working in parallel with other developers) 
<br/>
For example, we have component called `Course` all the api, redux, redux-saga, and constant should stay inside this component directory. So if someone wants to build a feature in the course section or course related feature, he/she/they don't need to go outside this componenent directory. and their cognitive load doesn't need to worry about other parts of the application. We have a `redux` folder in root components which takes care of the component related api calls, redux state, and redux-saga handlers. 
<br/>
Note: if you are using some constant that might be needed in other components(i.e. url paths), then you have to put that kind of information in the src/constant.js file. And if some utility function which is related with common ideas(i.e time, date, string related functions), we should also put them into root `service` section. 

- Containers/page
  - The main container of every page(basically a different url route.)
  
- Component(It could be root component which has all the child component which belongs to this component. i.e see `Course` component)
  - redux(Root level component will have all the redux realted things of this component.)
  -Child1Component
  -Child2Component
  -..otherChildComponents
  - constant.js( Constants which are related with this component or to child component)
  - index.js
  - styles.scss

## Understanding few parts of the code base
<img src='https://learningandcreativity.com/wp-content/uploads/2013/10/3-Idiots-movie-still-2.jpg'>

### How to do an API call and manage state
 The whole point of using redux and redux saga is that we can have a structure around managing the state of the application. If you are not new to redux and redux saga, Don't be afraid, it's not that complex. Sure, there is so much information about out there on redux and redux saga. But you just need to have a basic idea to use it. or we are here to help you if you don't understand something. We will walk you thought it, or we can also help you to create your first api call through redux and redux saga. Just ask one of us, and we are more than happy to help you. 

 So let's learn something about how we use redux and redux-saga in our code. There are basically 4 things.
 - Actions
 - Redux State
 - Redux middlewars(aka redux-saga)
 - API calls

TODO: add a visual image how the above things interact with each other.

So if you want to do a API call, the idea would be :-> <br/> <br/>
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;`Create actions` </br>
### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8595;
&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Create redux state` </br>
### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8595;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;`Create the API function`</br>
### &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8595;
&nbsp; &nbsp; &nbsp; &nbsp;`Create middlewares(saga)`</br> </br>

### Create actions
Actions is just a fancy of saying and hadling API request, What kind of action(redux action) we should dispatch on `when we call the api`, `what to do on successful api call`, and `what action to dispatch when api fails or it's not a successful operation`
To do a API call, first we define `actions`. And we define it in the `src/components/componentName/redux/action.js` file. Let's take an example of getting user information. and How we can define actions for that. 
the actions would look like something below. 

```
export const types = {
  GET_USER_INTENT: 'GET_USER_INTENT',
  GET_USER_INTENT_RESOLVED: 'GET_USER_INTENT_RESOLVED',
  GET_USER_INTENT_REJECTED: 'GET_USER_INTENT_REJECTED',
}

export const actions = {
  getUser(data) {
    return {
      type: types.GET_USER_INTENT,
      data,
    }
  },
  getUserResolved(data) {
    return {
      type: types.GET_USER_INTENT_RESOLVED,
      data,
    }
  },
  getUserRejected(error) {
    return {
      type: types.GET_USER_INTENT_REJECTED,
      error,
    }
  },
}

```

### Create redux state 
For state related things, we create and manage staete in `src/components/componentName/redux/reducer.js`. The code looks like this. 

```
import { types } from './action'

const initialState = {
  loading: false,
  error: false,
  data: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_INTENT:
      return {
        ...state,
        loading: true,
        error: false,
        data: null,
      }
    case types.GET_USER_INTENT_RESOLVED:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.data, // mapped user data.
      }

    case types.GET_USER_INTENT_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error, // keeping reference of the error.
        data: null,
      }

    default:
      return state
  }
}

```

### Create the API function

### Redux middlewars(aka redux-saga) 
Middlewares are so useful, when we talk about handling async/api calls. 
It makes handling redux state easy and intutive. In start it might look a bit cumbersome or long. But after creating two or three api calls, you will get a hang of it.

### In case of doubt

If you still have some doubt or suggestions, about how things works in this repo. Please feel free to contact Vikash, Saquib or Komal. We are more than happy to get on a call and make things more clear to you. afterall, you are trying to build things together with us.

## Scripts that makes our day-to-day life easy.

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
