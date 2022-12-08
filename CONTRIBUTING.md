# Meraki Front-end Repository

This repository contains the source code for the front-end of the __Meraki Web Application__. This project has enabled over **25,000 students** from under-served communities learn the basics of programming and spoken English through free online classes and curricula materials. 

Contributions to this project by people like you will allow us to scale quickly and help build a sustainable skill-based learning platform that can enable **1M children** from the **most under-served** communities of our society find **aspirational jobs** by the year 2025!

## Meraki App Links

Production (Deployed from the [`main`](https://github.com/navgurukul/bhanwari-devi) branch): [https://merakilearn.org](https://merakilearn.org)

Development (Deployed from the [`dev`](https://github.com/navgurukul/bhanwari-devi/tree/dev) branch): [https://bhanwari-devi.vercel.app](https://bhanwari-devi.vercel.app)

## Tech Stack

- [React](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [MUI](https://mui.com/)
- [Node.js](https://nodejs.org/)

## Installation and Setup Guide

1. Clone and Fork the `navgurukul/bhanwari-devi` repository. If you [download GitHub Desktop](https://desktop.github.com), you can refer to this [link](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) for directions on how to do this.
2. If you're using GitHub Desktop, switch to the `dev` branch. If you're using [Git Bash](https://git-scm.com/downloads), you can enter the following:
```
# first time only to alias the NG repository
git remote add upstream https://github.com/navgurukul/bhanwari-devi.git

# switches to that branch
git checkout dev
```
  **NOTE**: It's recommended that you create your own feature branch off of `dev` so you will be able to organize your commits around different issues. See Step 6 to do this.

3. Download the version of [Node.js](https://nodejs.org/) that's listed as Recommended for Most Users, which at the time of writing is 16.17.1, if you haven't already. You can check the version of Node (and see if you have it installed) by entering `node -v` in Command Prompt on a Windows machine or Terminal on a Mac. Make sure you're using version 14.0 or greater.
4. Navigate to the directory where the `package.json` file is located in the `bhanwari-devi` repository on your computer and create a new file. Copy/paste the following and then save this file as `.env`.

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
5. Now navigate to the directory where the `package.json` file is in the command-line (Command Prompt or Terminal). You can copy the path and paste it after `cd `. Then enter `npm install`. 
6. Make the desired additions/changes to files. If you're using GitHub Desktop, you'll then be able to select a new branch to commit these changes. Otherwise, you can create a new branch off of `dev` (or your currently checked out branch) with Git Bash using the following:
   ```git
      git checkout -b <your-branch-name>
   ```
7. After doing this the project is ready to run on your local machine and will look like this.

![image](https://user-images.githubusercontent.com/84696578/193329990-e134e4cf-dc44-4258-83b3-811e9ed55656.png)

8. Run `npm start` to start the development server and will start on PORT:3000
9. Once the development server is started, follow these video instructions to login to the application.


https://user-images.githubusercontent.com/84696578/193331340-47df0633-ea3b-4dca-8d98-9ff643f71daf.mp4

10. And you are good to Contribute Now.

Note: If a new branch is created after you fork the repository that you want to use, you can enter the following in Git Bash:
```
# first time only to alias the NG repository
git remote add upstream https://github.com/navgurukul/bhanwari-devi.git

# downloads the files from the branch 
git fetch upstream <branch-you-want-to-start-from>

# switches to that branch
git checkout <branch-you-want-to-start-from>
```

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
- Include the link from which you are facing the issue (Production: [https://merakilearn.org](https://merakilearn.org) or Development: [https://bhanwari-devi.vercel.app](https://bhanwari-devi.vercel.app)).
- Select the appropriate issue template (error, feature request, or documentation), and the relevant labels will automatically be added to the issue.

## Creating a new Pull Request

- Create a new pull request against the `dev` branch or the one related to the issue you're addressing, if one already exists.
- Once the pull request is created, please mention the issue number in the pull request. (Use # and the issue number. As you start typing the number, you should see the title of the issue appear.)
- The pull request will be reviewed, and suggestions will be added to improve it.
- Once the pull request is approved, it will be merged.

**Your contributions are always welcome and very much appreciated!**
