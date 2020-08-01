---
template: post
slug: gitignore-issue
title: .gitignoreが効かない場合の対処
date: 2020-05-12
tags:
  - Git
category: Git
---

.gitignore に指定してるはずのフォルダーが毎回トラック対象となり GitHub にアップロードされてしまうことがあります。再度、.gitignore を書き換えても効果がありません。こういうときの原因は、一度トラック対象としてしまったので対象外にできないということが発生しています。

##Git CLI での対応方法

対象から外してあげましょう

`git rm --cached -r .vs`

git rm は --cached をつけないとファイル自体を消してしまうのでしっかり注意して使いましょう。このコマンドを使うと .vs を対象から外したことになります。
