# Bhanwari Devi
<img src="src/asset/bhanwari-devi.jpg" width="300"/>

Bhanwari Devi is an oppressed-caste woman who dared to fight against the feudal, casteist and patriarchal structures of rural Rajasthan. She started as a social worker as part of the government-run Women’s Development Project. In 1992, she became involved in specific campaigns against child marriage. She counselled women on family planning, girl child education, against female foeticide, dowry, and child marriage. Already, as a result of her activism, she and her family were subjected to constant threats and intimidation by the dominant caste men in the village.

Once she intervened to stop the marriage of a nine-month-old infant from a dominant caste family. This enraged the dominant caste men in the village. Despite knowing the consequences that were likely, she dared to continue to defy them and stand for what was right. The same year, in an act of retaliation, she was gang-raped and her husband beat-up while working on the field.

In her subsequent pursuit for justice, every step along the way she faced intense hurdles. At the police station, at the primary health care centre, and the judiciary. Read more about her [here](https://medium.com/@dalithistorynow/dalit-history-month-2019-celebrating-bhanwari-devi-c4bd47d7126e).

## Let's code and build something beautiful together
We welcome everyone. 🤗

<img src="src/asset/welcome.jpg" width="500"/>

## Getting Started and Contribution Guidelines

Please refer to our [Contribution Guide](CONTRIBUTING.md).

## Development Ethos
- *It's OK to break stuff on development. Take the ownership and send the fix.*
- *Help other people while reviewing the PR. and Be respectful if somebody needs to improve something on their code. The goal is to work together and have some fun.*
- *If you can, use a ton of emojis while reviewing the PR or replying to comments in the PR. 😉*
- *Don't shy away from sending a PR, we are more than happy to help you out in the process.*

## Code Structure
- *The philosophy of the code strucutre is keeping things as small as they can be. Keeping functions small, components small, and files small. Basically keeping everything as small as they can be. Like Minions, We love Minions. Who doesn't .*


### Let's see the file structure now. 
### The file structure looks something like this.
```
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
    ├── README.md

  ```

### Please don't get confuse and run away. We know the above structure was a bit long. But You have to agree that It was detailed, and if you look closely it's actually simple.:P
### ![Gif](https://media.giphy.com/media/UB2GxvYsswbBu/giphy.gif) <br/>
<br/><br/>
For example, we have component directory called `Course`. All the api, redux, redux-saga, and constant which are directly related with course entity will go inside `Course` component directory. So if anyone works with course related stuff, We want them to always stay inside the `Course` directory. Basically in the below file strucuture. </br>
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
<img src='src/asset/3idiots.jpg' width="450" />

### Tech Stack 
- React
- Redux (if you are new to redux, you can learn a bit about it [here](https://redux.js.org/introduction/core-concepts). )
- Redux-saga (we love redux-saga, Don't know about Redux-saga, don't worrry. You can get to know a bit about it [here](https://flaviocopes.com/redux-saga/).)

Note: We can walk you through how we use redux and redux-saga. Please get in touch, we can give you short intro to redux and redux-saga. 


### How to do an API call and manage state
#### We will Redux and Redux-Saga to do the API call and handle their response. It makes components life easy and keeps them small and less complex. 
- *The whole point of using redux is to handle application state mangagement in much easier way. New to redux   [Learn here](https://redux.js.org/introduction/core-concepts)* 
- *By using redux-saga we move away the complexity of doing a api call and handing the response in a specific file(i.e `saga.js` ) away from the UI logic. New to redux, [Start from here to learn it](https://flaviocopes.com/redux-saga/)*

#### There are four files/concept that we need to update or change to do an API call.
 - Actions (aka `action.js`)
 - Redux State(aka `reduceer.js`)
 - API calls with axios(aka `api.js`)[ note: not applicable when doing something with local storage.]
 - Redux middlewares(aka `saga.js`)

TODO: add a visual image how the above things interact with each other.

You can think of this flow, when you are implementing a API call.:-> <br/> <br/>
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;`Create actions` </br>
### &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8595;

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Create redux state` </br>
### &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8595;

&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;`Create the API function`</br>
### &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8595;

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`Create middlewares(saga)`</br> </br>

### Create redux actions

Actions are a way to tell redux what state to update on what event. Basically they have a structure, Something like below.👇

```

 { type: 'INCREASE_COUNT', data: 5}

This above object will passed to redux through some function/API(aka Disptacher), 
and the intuitive behaviour of this `action` should be that it increments `counter` variable in redux by 5.

 ```
 When we do a API call, there are generally three kind of actions that we deal with. 
 - *What to do when we call the API endpoint.*
 - *What to do when we get a successful response from the API endpoint.*
 - *What to do when we get a unsuccessful response from the API endpoint.*
We define actions to corresponding main component redux directory. The file path looks something like this `src/components/componentName/redux/action.js` file. Let's take an example of getting user information. and How we can define actions for getting user's information. 
the actions should look like this.👇


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

### Create redux state(aka reducer) 
For state related things( keeping API rensponse data and error references), we create and manage state in `src/components/componentName/redux/reducer.js`. The code looks like this. 👇

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

To get data from server, we create API calls here. Mostly we do with `axios` library. The file path to create APIs looks like this `src/components/componentName/redux/api.js`. The API call looks like this. 👇

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
    headers: HeaderFactory(tokens)
  })
}
```

### Redux middlewars(aka redux-saga) 
Middlewares are so useful, when we talk about handling async/api calls. We put saga middlewares in `src/components/componentName/redux/saga.js` file.
It makes handling redux state easy and intutive. In start it might look a bit cumbersome or long. But after creating two or three API calls, you will get a hang of it. This is how we handle getting user data through redux saga middleware. 

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
  const res = yield call(authorizeRequest, getUserData, data)
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
  // it sets `loading` as true. so we can show some loader when the API call
  // is happening.
  yield takeLatest(types.GET_USER_INTENT, handleGetUserData)
}

```

### How we do Styling/CSS
Note: Soon, We will add our way of styling css here.
![CSS MEME](https://i.imgur.com/YkuovuP.png)

### In case of doubt

If you still have some doubt or suggestions, about how things works in this project. Please feel free to contact [Vikash](https://github.com/vikash-eatgeek), [Saquib](https://github.com/pysaquib), [Komal](https://github.com/komalahire) or [Abhishek](https://github.com/abhishekgupta92). We are more than happy to get on a call and make things more clear to you. afterall, you are trying to build things with us.


### Environment variables
- *You need a file called `.env.development` to start running the project locally and develop. Please get in touch with us. If you are interested in helping us.*


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

**Happy coding :)** 
