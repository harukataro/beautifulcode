---
template: post
title: Juliaの始め方
slug: julia-hello-world
draft: false
date: 2020-08-04
description: 数学を美しく紡ぎ出すJuliaを使ってみよう
category: Julia
tags:
  - Julia
socialImage: /media/Julia-social.png
---

![Julia-social](/media/Julia-social.png)

## Julia とは

まだまだマイナーなのでほとんどの方はしらないのでは無いでしょうか？

Julia は最近開発されたプログラミング言語である。狙っている椅子は Python の占めている手軽に組めるデスクトップでの研究などに向けた使用用途である。

Python の弱点の一つとして実行速度の遅さがある。この点に対して Julia は手当をしている。

## インストール方法

###　インストーラを使用する方法

インストーラーがあります。サクッとやるのであれば下記のご本家のページから入手してインストールしましょう。簡単です。

[Julia 公式ページ](https://julialang.org/)

### brew を使用する方法

MAC の brew 派の方はもちろん brew でいけます

```bash
$ brew cask install julia
~$ Julia --version
julia version 1.5.0
```

上記のように brew して動作確認してバージョンでれば OK です。

### Visual Studio Code にプラグインを追加

vs Code の拡張機能検索にて Julia と検索しましょう。そうすると Julia チーム謹製の Julia プラグインが手に入ります

![julia-vscode](/media/julia-vscode.png)

## ライブラリーのインストール方法

では簡単につかってみましょう。グラフくらい書かせてみたいのでライブラリをいれてみましょう。コマンドプロンプトで Julia と打ちます。ネットを見てみると昔と最近ではインストール方法が変わったみたいです。今回採用した version 1.5 では下記の方法でインストールが可能です。

```bash
$ Julia
julia>
```

すると対話機能(REPL)が立ち上がります

ここで　　**]**　 （四角カッコの後ろ側）を入力しましょう

```bash
(@v1.5) pkg>
```

するとパッケージ操作画面になります

ここで

```
(@v1.5) pkg> add Plots
```

と入力しましょう。するとインストールを開始します。

## グラフを描いてみる

さて数学ラブな人々の好きなグラフといえば Sin 波ですね。異論は認めますということで描写するプログラムを描いてみましょう。

```julia
using Plots

f(x) = sin(x)
xs = range(1, 3.14 * 2; length=30)
fs = f.(xs)
plot(xs, fs)
savefig("plots.png")
```

こちらのプログラムを実行すると plots.png にグラフが保存されます。結果はこちら

![plots](/media/plots.png)

素敵じゃないですか！これで数学ラブな人の Hello World がスタートできましたね。

ではまた会いましょう

## 参考ページ

[X 分で学ぶ Julia りんごがでている](http://bicycle1885.hatenablog.com/entry/2014/12/01/050522)

[Julia を始める](https://hshindo.github.io/julia-doc-ja-v0.6/manual/getting-started.html)

[Julia という速くて書きやすい言語をちょっとだけ覗いてみたんだが、なにやらワクワクするものがあったので報告しようと思う](https://qiita.com/sadayuki-matsuno/items/fc5e9ec3894a4b7bfbfb)

[Julia でラマヌジャンの数式を味わう](https://www.flywheel.jp/blog/ramanujan-formulas-in-julia/)

[Julia By Example](https://juliabyexample.helpmanual.io/)
