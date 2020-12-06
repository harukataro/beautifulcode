---
template: post
title: Pythonのフォルダー運用
slug: compact-python-distribution
draft: false
date: 2020-12-06T13:10:00
description: Pythonで作ったプログラムを他のWindowsPCへ環境構築を強いずに運用するための施策
category: Python
tags:
  - Python
---


# モチベーション

Pythonで開発したデスクトップ用ツールの安定した配布方法についての検討。DXが進んでいない環境に対する一つの小さい対応方法。限定事項としてはPythonのしっかりした環境を用意するなどの手間をユーザーにかけない安定した方法の模索。メンテナンス性とトラブルの最小化を考察した



## 経緯

PythonスクリプトのEXE化も検討したが、できる環境と何度やってもうまく行かない環境があり、今後のメンテナンスに不安を感じた。せっかくのスクリプト言語のメリットが活かせない。EXEであれば、エクセルVBAや.NETでのバイナリー開発の方がいい。



## 結論

PythonのEnbeddable環境にてPythonの環境と実行ファイルを一つのフォルダにまとめて運用する。フォルダーごとコピーすればすぐに運用開始ができる。Pythonのスクリプト実行なので変更も容易である。



## 環境構築

以下Windows環境で行うこととする。バージョンはWinows10で確認している



1. このサイト（[https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)）より、Download Windows x86-64 embeddable zip fileを見つけダウンロードし解凍
   
2. pipのインストールファイルの入手。このサイト（[https://bootstrap.pypa.io/get-pip.py](https://bootstrap.pypa.io/get-pip.py)）にいき、上記のフォルダーにコピペなどでファイルを作成
   
3. pipをインストール

  ```bash
.\python get-pip.py
  ```

4. Pathの変更

  Python38.ph内のimport siteの前の#を消す

  ```Python
python38.zip
.

Uncomment to run site.main() automatically
import site
  ```


5. current.pthという名前でファイルを作り、下記を記載し保存

  ```python
import sys; sys.path.append('')
  ```

6. 必要なライブラリーの追加(以下とある例）numpy—1.19.3は１．1.19.4のバグ回避の施策です。新しいバージョンがでたら削除してもいいかと


  ```bash
.\python -m pip install numpy==1.19.3 pandas openpyxl pywin32
  ```


7. bat fileの作成

  実行したいpythonの名前が　task.pyであれば下記の様に記載した　task.batを作成

```bash
.\python task.py
```

8. 実行 

   task.batをダブルクリックでよい。ショートカットもこれにつければよい。

   

  以上



## 参照サイト

https://bamch0h.hatenablog.com/entry/2019/09/29/162601

https://qiita.com/mm_sys/items/1fd3a50a930dac3db299

https://hokatsu.sakura.ne.jp/machine-learning/read-excel-with-python-embeddable/

https://qiita.com/pocket_kyoto/items/80a1ac0e46819d90737f



