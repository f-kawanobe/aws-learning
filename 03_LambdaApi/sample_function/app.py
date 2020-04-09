from bottle import Bottle


app = Bottle()


@app.get('/')
def get_index():
    return 'Hello World!'


@app.get('/hello/<name>')
def get_hello(name):
    return 'Hello %s!' % name