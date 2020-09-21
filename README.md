# mlcollab

This is a quick project I made to help with doing CTFs. It is essentially a Kanban board of tasks with links to a collaborative markdown page with support for live collaboration.

# usage

1. `docker-compose up -d`
2. go into backend and run the following:
```
cd backend
MONGO_URL=mongodb://mongo_user:this_is_a_safe_password@0.0.0.0:27017/ FLASK_APP=$PWD/http/api/endpoints.py FLASK_ENV=development pipenv run python -m flask run --port 4433 --host 0.0.0.0
```
3. go into frontend, and edit src/hooks/function.ts with the public IP address of where you are hosting this through the variable **HOST**.
```
import axios from 'axios'
import {TaskData} from '../components/Kanban/TaskData'

const HOST = 'A.B.C.D'
export const CODIMD_URL = `http://${HOST}:3000`
export const BACKEND_URL = `http://${HOST}:4433`

```
4. run the following
```
cd frontend
npm start
```

To cleanup
1. `docker ps` and `docker kill` the corresponding containers
2. ctrl-c the backend and frontend terminals.
