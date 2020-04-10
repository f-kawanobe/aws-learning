from bottle import Bottle, response


app = Bottle()


@app.get('/')
def get_index():
    return 'Hello World!'


@app.get('/hello/<name>')
def get_hello(name):
    return 'Hello %s!' % name


@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'