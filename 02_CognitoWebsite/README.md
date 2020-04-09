[TOP](../README.md)

# 02_CognitoWebsite

Cognitoによるサインアップとサインインを実装する

![architecture](https://user-images.githubusercontent.com/43918772/78852987-bcb65c80-7a58-11ea-8022-50399f8e7f93.png)

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
  --stack-name aws-learning-02 \
  --region ap-northeast-1
```

結果が以下の様に出力される
```
---------------------------------------------------------------------------------------------   
Outputs
---------------------------------------------------------------------------------------------   
Key                 S3
Description         BucketName
Value               [S3のバケット名]

Key                 UserPool
Description         UserPoolId
Value               [ユーザープールID]

Key                 WebSite
Description         WebSite URL
Value               [S3ウェブサイトのURL]

Key                 UserPoolClient
Description         ClientId
Value               [アプリクライアントID]
---------------------------------------------------------------------------------------------   

```
※この出力は、template.yamlの **Outputs** によるものです

### 作成したリソースを元にユーザープール情報を設定する

Outputs の内容を元に /src/js/userpool.js を書き換えます

```javascript
const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  UserPoolId: [ユーザープールID],
  ClientId: [アプリクライアントID]
});
```

### S3バケットにウェブサイトのコンテンツをアップロードする
```
cd ../../
aws s3 sync ./src s3://[S3のバケット名] --acl public-read
```

## 動作検証

index、signin、signup、registerの4画面から成ります。

### index

![index](https://user-images.githubusercontent.com/43918772/78851695-68f64400-7a55-11ea-8e73-f52594af03b8.png)

cognitoのユーザー情報が表示されます  
signinしていない場合は自動的にsignup画面に進みます

### signin

![signin](https://user-images.githubusercontent.com/43918772/78851756-993de280-7a55-11ea-8fc5-c53032fe925b.png)

siginを行います  
登録を行っていない場合は右下のリンクからsignup画面に進んで登録します

### signup

![signup](https://user-images.githubusercontent.com/43918772/78851900-f20d7b00-7a55-11ea-81c7-41bebaf562a2.png)

ユーザーの登録を行います  
登録完了後、自動的にverify画面に進みます  
登録したメールアドレスに確認コードが届きます

### verify

![verify](https://user-images.githubusercontent.com/43918772/78851982-2da84500-7a56-11ea-80a9-533399cc7922.png)

メールで届いた確認コードを入力します  
完了後、自動的にsignin画面に進みます

### 登録情報の確認

![cognito](https://user-images.githubusercontent.com/43918772/78852381-233a7b00-7a57-11ea-90d2-899f7c0f354e.png)

AWS Console の Cognito を確認すると登録したユーザーが確認できます

## 型付け

### S3バケットの中身を空にする

S3のバケットが空にならないとバケットの削除が行えないため、以下のコマンドでバケットを空にします

```
aws s3 rb s3://[S3のバケット名] --force
```

### CloudFormationのスタックを削除する
```
aws cloudformation delete-stack --stack-name aws-learning-02 --region ap-northeast-1
```

