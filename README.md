# mlcollab

This is a quick project I made to help with doing CTFs. It is essentially a Kanban board of tasks with links to a collaborative markdown page with support for live collaboration.

# usage

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

To cleanup
1. `docker ps` and `docker kill` the corresponding containers
2. ctrl-c the backend and frontend terminals.
