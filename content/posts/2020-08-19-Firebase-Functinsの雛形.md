---
template: post
slug: firebase-functions-template
draft: false
socialImage: /media/image-2.jpg
title: Firebase Functions の雛形
date: 2020-07-19T02:16:12.190Z
description: Firebase Functionsの拡張を考慮した雛形の提供。3つ以上のFunctionsをFirebaseと連携して使う場合などに便利
category: firebase
tags:
  - firebase
---



FirebaseでよくFunctionsを活用してバックグラウンドの作業を遂行させています。ここでは私が最近つかっている雛形を記録しておきます。私の次回の作業にもこれからFirebaseを活用される方の参考にもなるかと思います。


##Firebase Functionsの雛形

私が現在使用している雛形は下記。TypeScriptの使用を前提。Nodeでもほぼ変わらずにつかえるはずです。構造としては`index.ts`はインデックスとしての役目のみ与え、実際のコード本体は別ファイルにおいていきます。

`index.ts`は、 `/functions/src` ディレクトリーに置いています。ここで整理が行いやすいようにそれぞれの関数はさらにサブディレクトリー`funcs`を用意してそのディレクトリーに配置しています。

また、共用で使う関数を別途ファイルを用意してそれぞれのfunctionから呼び出せるようにしています。その場合の表記も忘れないように追記しておきます。

```index.ts
import admin = require('firebase-admin');
admin.initializeApp();

const functions = {
  function1: './funcs/function1',
  function2: './funcs/function2',
};

const loadFunctions = (funcs:any) => {
  for (const name in funcs) {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === name) {
      exports[name] = require(funcs[name]);
    }
  }
};
loadFunctions(functions);
```

```funcs/function1.ts
import * as functions from 'firebase-functions';
import * as util from './util'

module.exports = functions
    .runWith({timeoutSeconds: 300, memory: '1GB'})
    .pubsub.topic('fetch')
    .onPublish(async (data:any) => {
    
        console.log("dummy function1");
        util.util_func();
})
```


```funcs/util.ts
import admin = require('firebase-admin');
import * as puppeteer from 'puppeteer';
import fetch from 'node-fetch';

const fireStore = admin.firestore();

export async function util_func(){
    console.log("dummy util");
}

```

あたらしいfunctionsを追加したときは、index.tsにて　functionsに一行追加するだけで終了することができます。あとはDeployすればOK.

私はPubSubを多用するため`pubsub.topic('')`でトリガー名を指定しています。上記の例では `fetch`というトリガーで動作するようにしています。

ちなみに runWith()では下記のコンディション設定が可能です

TimeoutSeconds タイムアウトの設定（秒単位)　最大値は**540**
memory  メモリーサイズの指定はstringで５種類　**128MB, 256MB, 512MB, 1GB, 2GB**

最新のfunctionsではスクレイピング動作で結構チャカチャカ動作を行っているため比較的緩めの設定をしています。多くの場合はこれよりも低い設定で行うことを推奨します。


## デプロイ
上記の表記方法で作成された firebase のfunctionであれば下記のコマンドでデプロイ可能です

```
firebase deploy --only functions
```
一つのfunctionのみのデプロイは

```
firebase deploy --only functions:function1
```
とコロンのあとにファンクション名を追加すればOKです。

久しぶりのデプロイのときはデフォルトのプロジェクトが変更されている恐れがありますので下記で一度設定の確認もしてみましょう。

```
firebase projects:list
```
変更は下記のコマンドで行えます

```
firebase use project-name
```


##ローカルでのデバック
functionのデバックはローカルで行うのが楽です。下記の方法では一度はデプロイをする必要があるので一度デプロイしてから下記のコマンドにて動作確認を行ってください。console.logの結果もその場で見られますのでデバックしやすいかと思います。

```
 firebase functions:shell
```
これでshellが起動します。> プロンプトに続いて function()と打ち実行が可能です。最初の数文字を打つと候補を出してくれるので `TAB` を押してから `()`を押して`Enter`で実行できます。

終了するときは `Ctl+C`を数度押すと終了できます。




##参照
下記の記事を参考にさせていただきました。本当にありがとうございます。

- [Firebase Functionsを関数ごとにファイル分割 with TypeScript](https://qiita.com/nekomimi-daimao/items/eea046dca2ab669a7fa9)
- [Firebase Functionsで関数ごとにファイルを分割し高速化とメンテナンス性向上も目指す](https://uyamazak.hatenablog.com/entry/2018/10/22/113000)
- [Firebase CLI リファレンス](https://firebase.google.com/docs/cli)
- [関数のデプロイとランタイム オプションを管理する](https://firebase.google.com/docs/functions/manage-functions)
- [firebase SDK reference](https://firebase.google.com/docs/reference/js/firebase)