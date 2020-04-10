[TOP](../README.md)

# 04_LambdaDynamoApi

Lambda関数経由でDynamoDBを操作する  
S3にデプロイしたウェブサイトからAPI Gatewayを通してLambda関数を実行する

![Untitled Diagram](https://user-images.githubusercontent.com/43918772/78975286-c15d3c80-7b4e-11ea-95bc-addc1227ac04.png)

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
  --stack-name aws-learning-04 \
  --region ap-northeast-1
```

結果が以下の様に出力される
```
---------------------------------------------------------------------------------------------   
Outputs
---------------------------------------------------------------------------------------------   
Key                 S3
Description         BucketName
Value               [S3バケット名]

Key                 WebSite
Description         WebSite URL
Value               [S3ウェブサイトのURL]

Key                 SampleApi
Description         API Gateway endpoint URL for Prod stage
Value               [APIのURL]
--------------------------------------------------------------------------------------------- 
```
※この出力は、template.yamlの **Outputs** によるものです

### 作成したリソースを元にユーザープール情報を設定する

Outputs の内容を元に /frontend/js/api.js を書き換えます

```javascript
const api = "[APIのURL]";
```

### S3バケットにウェブサイトのコンテンツをアップロードする
```
cd ../../
aws s3 sync ./frontend s3://[S3のバケット名] --acl public-read
```

## 動作検証

### S3ウェブサイトのURLにアクセス

![l04_1](https://user-images.githubusercontent.com/43918772/78974419-e486ec80-7b4c-11ea-8933-197917bfcc70.png)

テーブルにアイテムが登録されていないためヘッダのみ表示

### 追加画面に遷移してアイテムを追加

![l04_3](https://user-images.githubusercontent.com/43918772/78974526-20ba4d00-7b4d-11ea-8c12-7d900218bae2.png)

Name, Price を記入して登録する  
登録完了すると自動的に一覧画面に遷移する

### 一覧画面を再び表示

![l04_4](https://user-images.githubusercontent.com/43918772/78974585-49424700-7b4d-11ea-85be-d33ac5330dfd.png)

先ほど登録したアイテムが表示されている

## 片付け

### S3バケットの中身を空にする

S3のバケットが空にならないとバケットの削除が行えないため、以下のコマンドでバケットを空にします

```
aws s3 rb s3://[S3のバケット名] --force
```

### CloudFormationのスタックを削除する
```
aws cloudformation delete-stack --stack-name aws-learning-04 --region ap-northeast-1
```