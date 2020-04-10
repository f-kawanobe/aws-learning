import json
from bottle import Bottle, request, response
import boto3
from boto3.dynamodb.conditions import Key
from misc import DecimalEncoder


app = Bottle()


@app.get('/item')
def get_fruit_index():
    res = boto3.resource('dynamodb').Table('items').scan()
    return json.loads(json.dumps(res, cls=DecimalEncoder))


@app.post('/item')
def post_fruit():
    sequence = boto3.resource('dynamodb').Table('sequences').update_item(
        Key={'table': 'items'}, UpdateExpression='ADD seq :incr', ExpressionAttributeValues={':incr': 1}, ReturnValues='UPDATED_NEW')
    item = {
        'id': int(sequence['Attributes']['seq']),
        'name': request.forms.get('name'),
        'type': request.forms.get('type'),
        'price': int(request.forms.get('price'))
    }
    res = boto3.resource('dynamodb').Table('items').put_item(Item=item, ReturnValues='NONE')
    return json.loads(json.dumps(res, cls=DecimalEncoder))


@app.get('/item/<id:int>')
def get_fruit_detail(id):
    res = boto3.resource('dynamodb').Table('items').get_item(Key={'id': id})
    return json.loads(json.dumps(res, cls=DecimalEncoder))


@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'