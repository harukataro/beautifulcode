---
template: post
title: Python 辞書型配列を配列化したデータでKEYを用いてソートする方法
slug: python-dict-array-sort
draft: false
date: 2019-09-04T05:35:33.104Z
description: Pythonでよく見かける辞書を配列化したデータの取扱チップス
category: Python
tags:
  - Python
---

Python で、同形式の複数セットのデータを操作しているとよく遭遇するのが２次元的なデータの扱いではないでしょうか？Python で使いやすい方法として、Key を使った連想配列の配列を構成して運用しています。

##想定しているデータ列

元のデータが CSV やエクエルで下記のような 2 次元構造になっていることがよくあると思います。

```
名前, 国語, 算数, 理科, 社会
太郎, 20, 30, 40, 20
二郎, 40, 50, 70, 75
紀子, 90, 90, 60, 90
```

この形式データを配列を用いて弄ぶ時に僕がよく用いる格納法として Key を用いてデータをラベル付けし、キー付きの辞書配列を作ります。その配列を配列にします。

```python
test = [{'namae':'taro', 'kokugo': 20, 'Sansu': 30, 'Rika': 40, 'syakai': 20},
        {'namae':'jiro', 'kokugo': 40, 'sansu': 50, 'rika':70, 'syakai': 75},
        {'namae':'noriko', 'kokugo': 90, 'sansu': 90, 'rika': 60, 'shakai': 90}]
```

##ソートに使用するコマンド
このデータの中でサクッとある KEY を持ったデーターの値を基準にしてそーとをかけたくなることはありませんでしょうか？そういった場合に使う方法です。

sorted と itemgetter を組み合わせて使います。

実際の使い方をみてみましょう。

```python
from operator import itemgetter

test = [{'namae':'taro', 'kokugo': 20, 'Sansu': 30, 'Rika': 40, 'syakai': 20},\
        {'namae':'jiro', 'kokugo': 40, 'sansu': 50, 'rika':70, 'syakai': 75},\
        {'namae':'noriko', 'kokugo': 90, 'sansu': 90, 'rika': 60, 'shakai': 90}]


test_kokugo_best = sorted(test, key=itemgetter('kokugo'), reverse=True)

print(test_kokugo_best)

# [{'namae': 'noriko', 'kokugo': 90, 'sansu': 90, 'rika': 60, 'shakai': 90}, \
# {'namae': 'jiro', 'kokugo': 40, 'sansu': 50, 'rika': 70, 'syakai': 75},\
# {'namae': 'taro', 'kokugo': 20, 'Sansu': 30, 'Rika': 40, 'syakai': 20}]
```

ソートを行なっているコマンドはこちら

```python
**test_kokugo_best = sorted(test, key=itemgetter('kokugo'), reverse=True)**
```

test を構成する辞書型配列の KEY kokugo の値を比較してソートをかけます。itemgetter コマンドが、わかりやすいコマンド構成を可能にしています。

３つ目の reverse = True は降順（大きいものから並べる）にするために追加しています。昇順にするときは省略可能です。

結果は元の配列に変更を加えませんので結果を新しい変数に入力してお使いください。itemgetter を使えるようにするために最初にライブラリを用意してください。

**from operator import itemgetter**

上記のソースコードはそのまま使えます
