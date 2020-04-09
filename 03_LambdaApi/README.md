[TOP](../README.md)

# 03_LambdaApi

apiに使うlambda関数をWSGIインターフェースで実装する  
WSGIのライブラリとしてbottleを使う  
bottleで実装することで素のLambdaよりも規模の大きいAPIを開発しやすくなる

![Untitled Diagram](https://user-images.githubusercontent.com/43918772/78861820-c21fa100-7a70-11ea-87c7-e669b3a48f5e.png)

## デプロイ手順

### template.yamlに従ってビルドする
```
sam build
```

.aws-sam/build/ ディレクトリが作られます

### sam packageでパッケージ化する
```
cd .aws-sam/build/
sam package --s3-bucket sam-temporary --output-template-file out.yaml
```

.aws-sam/build/out.yaml が出力されているはずです。

### sam deployでデプロイする
```
sam deploy \
  --template-file out.yaml \
  --capabilities CAPABILITY_IAM \
  --stack-name aws-learning-03 \
  --region ap-northeast-1
```

結果が以下の様に出力される
```
---------------------------------------------------------------------------------------------   
Outputs
---------------------------------------------------------------------------------------------   
Key                 SampleApi
Description         API Gateway endpoint URL for Prod stage
Value               [APIのURL]
--------------------------------------------------------------------------------------------- 
```
※この出力は、template.yamlの **Outputs** によるものです

## 動作検証

APIのURLにアクセスするとlambda関数の実行結果が得られる

**[APIのURL]/** にアクセスすると **Hello, World!** が表示される

```python
@app.get('/')
def get_index():
    return 'Hello World!'
```

![api1](https://user-images.githubusercontent.com/43918772/78861859-df546f80-7a70-11ea-9f67-dd9c5a06d329.png)

**[APIのURL]/hello/○○** にアクセスすると **Hello, ○○!** が表示される

```python
@app.get('/hello/<name>')
def get_hello(name):
    return 'Hello %s!' % name
```

![api2](https://user-images.githubusercontent.com/43918772/78861881-eb403180-7a70-11ea-85fd-37058a409381.png)


## 片付け

### CloudFormationのスタックを削除する
```
aws cloudformation delete-stack --stack-name aws-learning-03 --region ap-northeast-1
```