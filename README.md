http://nena3.xii.jp/vue-typing/

# Herokuでデプロイ
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# Dockerで動かす
## 初回
1. Dockerfileの`CMD ["npm", "run", "serve"]`をコメントアウト
1. `docker-compose up --build`を実行
1. 新しターミナルを開く
1. `docker exec -it zizityp /bin/ash`を実行
1. `npm install`を実行
1. `npm run serve`を実行
1. ビルドが終わったら http://localhost:8080 にアクセス

## 2回目以降
__一回この工程を実行したらそれ以降は以下の手順でOK__
1. Dockerfileの`CMD ["npm", "run", "serve"]`をコメントアウトを外す
1. `docker-compose up --build`を実行
1. ビルドが終わったら http://localhost:8080 にアクセス

# typing

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
