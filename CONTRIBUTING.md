> # Meraki Frontend Repository

This repository contains the source code for the Meraki Frontend. The Meraki Frontend is a web application that allows users to learn python , spoken english and other things.

The Deployed Links For Meraki.

[Meraki Production ]("https://merakilearn.org")

[Meraki Development ]("https://bhanwari-devi.vercel.app")

> ### Tech Stack

- React
- Redux
- [MUI](https://mui.com/)
- nodeJs (V14)

> # Installation and Setup Guide

1. Fork the repository
2. Create a Clone of the repository
3. Make sure you have nodejs installed on your system with Version 14
4. Run `npm install` to install all the dependencies .
5. create a new .env file in root and add this code to it.

   ```.env
    REACT_APP_GOOGLE_CLIENT_ID = ''
    REACT_APP_MERAKI_URL = 'https://dev-api.merakilearn.org'
    REACT_APP_CHANAKYA_BASE_URL = 'https://join.navgurukul.org/api/'
    REACT_APP_ADMISSIONS_URL = 'https://admissions.navgurukul.org/'
    REACT_APP_API_KEY = ''
    REACT_APP_authDomain = ''
    REACT_APP_projectId = ''
    REACT_APP_storageBucket =''
    REACT_APP_messagingSenderId = ''
    REACT_APP_appId = ''
   ```

6. Execute This command
   ```git
      git checkout -b <your-branch-name>
   ```
7. After doing this the project is ready to run on your local machine and will look like this.

![image](https://user-images.githubusercontent.com/84696578/193329990-e134e4cf-dc44-4258-83b3-811e9ed55656.png)

8. Run `npm start` to start the development server and will start on PORT:3000
9. once The development server is started follow these video Instructions to LOGIN to the application.


https://user-images.githubusercontent.com/84696578/193331340-47df0633-ea3b-4dca-8d98-9ff643f71daf.mp4


10. And you are good to Contribute Now.

> # Contributing Guidelines

## Before you start contributing, please follow the below guidelines:

- Take a look at the existing [issues](https://github.com/navgurukul/bhanwari-devi/issues) to see if any one of them addresses a bug you're encountering or a feature you'd like to see added. If so, you can give it a thumbs up to let us know that it's important. If you don't see anything similar, you can create your own issue. If you'd like to work on an unassigned issue, let us know and wait for it to be assigned to you after which you can start working on it.
- Create a new branch for every issue you are working on.
- Create a pull request which will be promptly reviewed and suggestions would be added to improve it.
- Create pull request against the `dev` branch or the one related to the issue you're addressing, if one already exists.

## Filing a new Issue

- Before creating a new issue make sure that the issue is not already present in the issues section.
- Please describe the issue in detail and also mention the steps necessary to reproduce the issue.
- Attach screenshots if relevant and possible.
- Include stack traces for any errors you encounter. (Check the developer console, expand error messages, and copy paste the lines you see.)
- Include the link from which you are facing the issue (Production: https://www.merakilearn.org or Development).
- Select the appropriate issue template (error, feature request, or documentation), and the relevant labels will automatically be added to the issue.

## Creating a new Pull Request

- Create a new pull request against the `dev` branch or the one related to the issue you're addressing, if one already exists.
- Once the pull request is created, please mention the issue number in the pull request. (Use # and the issue number. As you start typing the number, you should see the title of the issue appear.)
- The pull request will be reviewed, and suggestions will be added to improve it.
- Once the pull request is approved, it will be merged.

> # Your contributions are always welcome and very much appreciated.
