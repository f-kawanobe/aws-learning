[TOP](../README.md)

# 01_SimpleWebsite

S3バケットを作成し、ウェブサイトを公開する

![architecture](https://user-images.githubusercontent.com/43918772/78848948-24b37580-7a4e-11ea-94b5-b4695f092c18.png)

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
  --stack-name aws-learning-01 \
  --region ap-northeast-1
```

結果が以下の様に出力される
```
---------------------------------------------------------------------------------------------   
Outputs
---------------------------------------------------------------------------------------------   
Key                 S3Bucket
Description         BucketName
Value               [S3のバケット名]

Key                 S3WebSite
Description         WebSite URL
Value               [S3ウェブサイトのURL]                                     
--------------------------------------------------------------------------------------------- 
```
※この出力は、template.yamlの **Outputs** によるものです

### S3バケットにウェブサイトのコンテンツをアップロードする
```
cd ../../
aws s3 sync ./src s3://[S3のバケット名] --acl public-read
```

## 動作検証

ウェブサイトのURLにアクセスするとアップロードしたhtmlが表示される。

![index](https://user-images.githubusercontent.com/43918772/78847914-292a5f00-7a4b-11ea-9fac-9bc227e70e0c.png)

## 型付け

### S3バケットの中身を空にする

S3のバケットが空にならないとバケットの削除が行えないため、以下のコマンドでバケットを空にします

```
aws s3 rb s3://[S3のバケット名] --force
```

### CloudFormationのスタックを削除する
```
aws cloudformation delete-stack --stack-name aws-learning-01 --region ap-northeast-1
```