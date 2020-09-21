# mdcollab

This is a project I made to help with doing CTFs. Previously I had probably used a combination of discord and messenger to discuss flags and share screen - however, I had always wished there was a better way to communicate and share information with my team. Thus I made my own. This project is essentially a Kanban board of tasks with links to a collaborative markdown page with support for live collaboration.


## Contents

- [Inspiration](#inspiration)
- [Frontend: React](#frontend-react)
- [Backend: codimd](#backend-codimd)
- [Backend: mongo+flask](#backend-mongo-flask)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Improvements](#improvements)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Inspiration

The day was Monday, and I was watching one of a youtube video by [liveoverflow](https://youtu.be/Tw7ucd2lKBk?t=53) where he was going through a challenge from a past CTF. However, the thing that piqued my interest the most was the collaboration tool he showcased, that was a closed-source upgraded alternative to [CTFpad](https://github.com/StratumAuhuur/CTFPad). I thought this idea had so much potential, and seeing that I had a CTF of my own at the end of the week, I decided to try my luck and implement this. This project turned out way harder than I thought it would be.

## Frontend: React

### Techstack

The frontend tech stack consists of:
- React a JavaScript framework for making web applications
- Typescript for type safety
- [`styled-components`](https://styled-components.com/) for styling
- [`material-ui`](https://material-ui.com/) as the UI Toolkit
- [`react-router-dom`](https://reactrouter.com/) for routing.

### Folder structure

The frontend code lies in the `frontend` folder, with source code fo components and the App in `frontend/src`. 

```
├── components
│   ├── Header
│   ├── Kanban
│   ├── Modal
│   ├── Pages
│   │   ├── BoardPage.tsx
│   │   ├── Board.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── Page.tsx
│   ├── SideBar
│   └── util
├── hooks
│   └── function.ts
├── theme
│   └── ThemeProvider.tsx
├── App.css
├── App.tsx
├── setupProxy.js
```

- In the `components` folder, `Pages` consists of React Components that render a single page. Everything else is a normal React Component.
- Routing is done inside `App.tsx`
- API calls to the backend are in `hooks/function.ts` or are done from within the component itself. The only exception is the GET call is inside `BoardPage.tsx`, as it needs to show data.
- Theming is in `theme/ThemeProvider.tsx`.

### Note about hosting

The frontend was served in the same server as the rest of the application with the goal of using relative api links to simplify and decouple this project from where it was hosted. However, this was not attainable before the CTF started, so I ultimately used absolute URL paths to the API and codimd server. The added benefit, and future improvement, is to host the front end from `github-pages` and have one less deployment here, as the frontend is majorly a static SPA. 

Currently, the front end is served from port `3001`.

## Backend: codimd

This is deployed via `docker-compose`. I used an existing open-source application to store the markdown files. Documentation can be found at:
- https://hackmd.io/s/codimd-docker-deployment
- https://github.com/codimd/container

I've used both ways, and currently it is using the first way.

Currently, this is running from its default port of `3000`.

## Backend: mongo flask

- The mongo database is currently deployed through the `docker-compose` file. 
- A flask application serves the API, and communicates locally with the mongo DB instance.
- This stores the state of the main Board page, so that views are synced between users of the application.

Currently, the flask server is running from port `4433`.

### Folder structure

```
.
├── backend
│   ├── __init__.py
│   ├── mongo.py
│   ├── schema.py
│   └── service.py
├── Dockerfile
├── endpoints.py
├── __init__.py
├── __main__.py
├── middleware.py
├── Pipfile
├── Pipfile.lock
└── requirements.txt
```

## API Documentation

Currently, there is no official documentation for the API, but it consists of two endpoints: 
- `/tasks` to list all tasks
- `/task/<category>/<task>` to create, modify or delete tasks.

## Usage

I tried running this on the lowest spec digital ocean 5$ machine, but there was not enough ram to build the frontend. Instead, I hosted it with a 2-core 4gb ram machine, and it worked, if you run into problems maybe consider this. All the commands below assume you are on the machine that will host the server and frontend.

1. `docker-compose up -d`
2. go into backend and run the following inside a screen:
```
screen -S backend

cd backend
pip3 install -r requirements.txt
MONGO_URL=mongodb://mongo_user:this_is_a_safe_password@0.0.0.0:27017/ FLASK_APP=api/endpoints.py FLASK_ENV=development python3 -m flask run --port 4433 --host 0.0.0.0
```
3. go into frontend, and edit src/hooks/function.ts with the public IP address of where you are hosting this through the variable **HOST**.
```
import axios from 'axios'
import {TaskData} from '../components/Kanban/TaskData'

const HOST = 'A.B.C.D'
export const CODIMD_URL = `http://${HOST}:3000`
export const BACKEND_URL = `http://${HOST}:4433`

```
4. run the following, preferably run `npm start` in a screen so the process is detached from the terminal that started it so it will continue to run even if the terminal disconnects.
```
cd frontend
npm install
npm start
```

To cleanup:

1. `docker ps` and `docker kill` the corresponding containers
2. ctrl-c the backend and frontend terminals.

## Improvements

- [ ] bootstrap and serve frontend & flask backend with the `docker-compose` file.
- [ ] add documentation for backend API
- [ ] Host frontend as a SPA, maybe through `gh-pages`.
  - [ ] Settings page to set the server you want to connect to and have mdcollab be completely statically hosted so no need to host your own frontend. ("Authenticate" with the server you are hosting the backend and codimd at)
- [ ] consolidate all APIs into `frontend/src/hooks/function.ts`
- [ ] add stateful dark mode to `frontend/src/theme/ThemeProvider.tsx`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

Here are some useful resources I used to create this app.

- https://dev.to/englishcraig/creating-an-app-with-docker-compose-django-and-create-react-app-31lf
- https://developer.okta.com/blog/2018/12/20/crud-app-with-python-flask-react
