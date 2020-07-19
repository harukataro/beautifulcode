---
template: post
slug: functins-makes-easy-programming
title: (初心者向け)関数を使うとプログラミングが楽になる
date: 2019-12-30
description: 関数という概念は楽をするためにある。未来の自分ががんばればいい
category: basic
---

# （初心者向け）関数を使うとプログラミングが楽になる

昨晩、プログラミングをしていてふと思ったことを書こうと思う。

**プログラムの概念に関数というものがあります。**関数を使わなくてもプログラミングは可能なのですが、規模が大きくなるとどうしても関数を使った方が効率化ができバグの発生を抑えられる効果があります。

昨晩のこと...

### 面倒な機能を作る必要に直面...

ブログサービスの依頼者の 2019 年の記事全部をチェックし結果を出すプログラムを作っていました。

こちらが完成したもの
https://alis.to/haruka/articles/3bNnmrBWAAQJ

表示する内容は下記

**いいねをもらった回数
投げ銭をもらった回数
一番多くコメントをしてくれた人を抽出
一番投げ銭をしてくれた人を抽出する
**
これを決めた時に**憂鬱**になりました。めちゃんこ面倒や...

```python
    for client, article_ids in client_article_ids.items():

       #このあたりにその機能を作らなきゃいけない

       client_statics[client] = {
           'article_num': len(article_ids),
           'like_num': like_num,
           'tip_num': tip_num,
           'tip_top_user': tip_top_user,
           'comment_num': comment_num,
           'comment_top_user': comment_top_user,
           'image_url': image_url
       }
```

**でこういう時は未来の自分に仕事を適切に振るのです**

今の自分は面倒なことから逃げられます

まず欲しいデータの入れ物を作ります

```python
for client, article_ids in client_article_ids.items():

    like_num = ''
    tip_num = ''
    tip_top_user = ''
    comment_num = ''
    comment_top_user = ''

    client_statics[client] = {
        'like_num': like_num,
        'tip_num': tip_num,
        'tip_top_user': tip_top_user,
        'comment_num': comment_num,
        'comment_top_user': comment_top_user,
    }
```

でね。

ここで未来の自分に仕事を割り振ります。これが関数の醍醐味。**get\_**を追加して、最後に ()を追加し、計算に必要そうな情報を書き込んであげるだけ。**簡単なお仕事 w**

```python
for client, article_ids in client_article_ids.items():

    like_num = get_like_num(article_ids)
    tip_num = get_tip_num(article_ids)
    tip_top_user = tip_top_user(article_ids)
    comment_num = get_comment_num(article_ids)
    comment_top_user = get_comment_top_user(article_ids)

    client_statics[client] = {
        'like_num': like_num,
        'tip_num': tip_num,
        'tip_top_user': tip_top_user,
        'comment_num': comment_num,
        'comment_top_user': comment_top_user,
    }
```

未来の自分

さらに未来の自分にやってもらうために関数の定義を空っぽの状態で作ります。

Python では使う前に関数を定義する必要があるので使う前のところで　**def 関数名(もらうデータ）:** という形式で定義して、計算結果を return で返します

```python
def get_like_num(article_ids):
    return 0
```

さらにさらに未来の自分

全体像は忘れてこの関数のことに集中します。あら不思議。面倒な気持ちが少し和らぎます

```python
def get_like_num(article_ids):
   like_total = 0
   for article_id in article_ids:
       url = f'https://alis.to/api/articles/{article_id}/likes'
       data = json.loads(requests.get(url).text)
       like_total += int(data["count"])
   return like_total
```

**できた！！**

これで Python のメインのところに正常にいいねの合計が戻ります。関数を使うと未来の自分に仕事を割振れます。仕事を分解して集中できますので仕事が捗りますよ。

**とまあ、未来の自分にどんどん仕事を割り振るのに役に立つのが関数というお話でした。**

じゃね。
