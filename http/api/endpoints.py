from .middleware import login_required
from flask import Flask, json, g, request
from backend.service import Service as Backend
from backend.schema import TaskSchema
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/tasks", methods=["GET"])
@login_required
def index():
    return json_response(Backend().find_all_tasks())


@app.route("/tasks", methods=["POST"])
@login_required
def create():
    data = TaskSchema().load(json.loads(request.data))

    print(data)
    if "errors" in data:
        return json_response({'error': data.errors}, 422)

    task = Backend().create_task_for(data)
    return json_response(task)

@app.route("/task/<string:category>/<string:task>", methods=["GET"])
@login_required
def show(category, task):
    kudo = Backend().find_specific_task(task,category)

    if kudo:
        return json_response(kudo)
    else:
        return json_response({'error': 'kudo not found'}, 404)


@app.route("/task/<string:category>/<string:task>", methods=["PUT"])
@login_required
def update(category, task):
    current_task = TaskSchema().load(json.loads(request.data))
    
    if "errors" in current_task:
        return json_response({'error': current_task.errors}, 422)

    backend = Backend()
    if backend.update_task_with(category, task, current_task):
        return json_response(current_task)
    else:
        return json_response({'error': 'kudo not found'}, 404)

  
@app.route("/task/<string:category>/<string:task>", methods=["DELETE"])
@login_required
def delete(category, task):
    backend = Backend()
    if backend.delete_task_for(category, task):
        return json_response({})
    else:
        return json_response({'error': 'kudo not found'}, 404)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})