## Bhanwari Devi

Bhanwari Devi is an inspiring human being for us. She has faught like hell for her rights and social injustice. We have decided to give her name to this project.  Read more about her [here](https://medium.com/@dalithistorynow/dalit-history-month-2019-celebrating-bhanwari-devi-c4bd47d7126e).


## Let's code and build something beautiful together
*We welcome everyone. 🤗*
![Working Together](https://www.netclipart.com/pp/f/239-2392873_children-different-race.png)


## Development Ethos
- *It's OK to break stuff on development. Take the ownership and send the fix.*
- *Help other people while reviewing the PR. and Be respectful if somebody needs to improve something on their code. The goal is to work together and have some fun.*
- *If you can, use a ton of emojis while reviewing the PR or replying to comments in the PR. 😉*
- *Don't shy away from sending a PR, we are more than happy to help you out in the process.*

## Code Strucutre
- *The philosophy of the code strucutre is keeping things as small as they can be. We love Minions. Who doesn't :P. Keeping functions small, components small, and files small. Basically keepings everything as small as they can be.*


### Let's see the file structure now. 
### The file structure looks something like this.
    ├── src                     # Source files
        ├──asset                # assets that belongs commonly in all components.
        ├──components           # Components and their child components. 
           ├──Course            # Course component and it's child components
              ├──index.js
              ├──styles.scss
              ├──constants.js
              ├──CreateCourse   #Course realted child component
                 ├──CourseForm  
                 ├──index.js
                 ├──styles.scss
              ├──CourseList
              ├──redux          # all the redux and api related things to Course, we will do under redux directory.
                ├──action.js    # We will define redux actions here
                ├──api.js       # All the course related APIs(axios requests) will happen here
                ├──reducer.js   # All the course related state management will happen here
                ├──saga.js      # All the middlewares for redux state management or api calls we will put here
                ├──util.js      # Mapper functions or any utility function for data manipulation
           ├──common            # All the common components which might be used anywhere in the app.
              ├──Notification
                 ├──index.js
                 ├──styles.scss
              ├──Spinner
                 ├──index.js
                 ├──styles.scss
          ├──pages              # root level containers for each page(Individual component wrapper for different url rotue)
            ├──CourseList       # these are basically wrappers, they should't me more than 30-40 lines.
               ├──index.js
               ├──styles.scss
          ├──routing           # Creating public and private routes for different pages.
          ├──services          # Tools and utilities for date, time, string and numbmers
          ├──sass              # app color css reference and mixins.
    ├──docs                    # Some documentation about code and other things.
    ├──.env.development        # development environment variables.
    ├──package.json
    ├──package-lock.json
    └── README.md

### Please don't get confused and run away. We know the above structure was a bit long. But You have to agree that It was detailed, and if look closely it's actually simple and not that complex.:P
### ![Gif](https://media.giphy.com/media/UB2GxvYsswbBu/giphy.gif) <br/>
<br/><br/>
For example, we have component called `Course`. All the api, redux, redux-saga, and constant which are directly related with courses should stay inside this component directory. So anyone works with course related stuff, they always stay inside the `course` main component. Basically in the below file strucuture. </br>
```
 ├──components           
    ├──Course            
      ├──index.js
      ├──styles.scss
      ├──constants.js
      ├──ChildComponent
      ├──CourseList
      ├──redux          
        ├──action.js    
        ├──api.js       
        ├──reducer.js   
        ├──saga.js      
        ├──util.js
      ├──AnotherChildComponent
```

Note: Global constants will go in global `src/constant.js` file.

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
For state related things, we create and manage state in `src/components/componentName/redux/reducer.js`. The code looks like this. 

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
        error: action.error, // keeping reference of the error, When API call fails.
        data: null,
      }

    default:
      return state
  }
}

```

### Create API functions

To create API calss in the backend, we create API calls here. Mostly we do with `axios` in `src/components/componentName/redux/api.js`. The API call looks like this.

```
import axios from 'axios'
import { METHODS, HeaderFactory } from '../../../services/api'

/**
 * gets user data from the server.
 *
 * @param {opts} 
 * @param {object} opts
 * @returns {Promise}
 */
export const getUserData = (opts, tokens) => {
  return axios({
    url: `${process.env.REACT_APP_MERAKI_URL}/users/${opts.userId}`,
    method: METHODS.GET,
    headers: HeaderFactory(tokens),
    data: {
      "idToken": opts.idToken,
      "mode": "web",
    }
  })
}
```

### Redux middlewars(aka redux-saga) 
Middlewares are so useful, when we talk about handling async/api calls. We put saga middlewares in `src/components/componentName/redux/saga.js` file.
It makes handling redux state easy and intutive. In start it might look a bit cumbersome or long. But after creating two or three api calls, you will get a hang of it. This is how we handle getting user data in through redux saga middleware. 

```
import { takeLatest, put, call } from 'redux-saga/effects'

import { types, actions } from './action'
import { authorizeRequest, httpStatuses } from '../../../services/auth'
import { getUserData } from './api'

/**
 * This handles gets user data from the server
 * @param {object} data user information
 * @param {object} data.userId user id which will be used to get user information
*/
function* handleGetUserData({ data }) {
  const res = yield call( authorizeRequest,getUserData, data)
  if(httpStatuses.SUCCESS.includes(res.status)) {
    // if the api call was succesful, let's change the status according // to that. also setting `loading` as false. 
    yield put(actions.getUserResolved(res.data))
  } else {
    // if the api call wasn't successful, let's set the error in redux /// for refernce.also setting `loading` as false. 
    yield put(actions.getUserRejected(res))
  } 
}

export default function* () {
  // This action `types.GET_USER_INTENT` is also handled in the redux
  // it sets `loading` as true. so we can show some loader when api call
  // is happening.
  yield takeLatest(types.GET_USER_INTENT, handleGetUserData)
}

```

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
