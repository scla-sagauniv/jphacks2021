# tatakimaru
## /getnews
ニュースAPIをたたく  
### request
method: GET
- pageSize: ニューズの数
- category: ニュースのカテゴリ
### response
- [ここを参照](https://newsapi.org/docs/endpoints/top-headlines)
---
## /postgoo
### request
method: GET
- sent: 平仮名化する文字列
### response
- [ここを参照](https://labs.goo.ne.jp/api/jp/hiragana-translation/)
---
## /postfurigana
### request
method: GET
- sent: ルビ振りする文字列
### response
- [ここを参照](https://developer.yahoo.co.jp/webapi/jlp/furigana/v2/furigana.html)