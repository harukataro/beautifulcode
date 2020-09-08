---
template: post
title: Git Remote Branchとの接続が壊れた
slug: git-remote-tracking-broken
draft: false
date: 2020-09-08T03:38:05.208Z
description: さて仕事をするかをVisual Studioを立ち上げたところ謎のPush 99がでている。なにやらLocal
  BranchとRemote Branchの接続が壊れてしまったようだ。
category: Git
tags:
  - Git
---
何もしていないのに壊れた。そう。よく聞く話です。僕も何もしていないのに今朝不幸に出会いました。

ここ数カ月仕事をしているBranchがPush 99を示しています。移動してみると、追跡ブランチがリモートに存在していません。





## 解決策

壊れてしまった参照を解決するために下記のファイルを削除しもう一度リモートブランチとローカルブランチを繋ぎなおす作業をして無事復旧しました。同様な問題に直面し、他のサイトをみても解決しない場合は、必ずソースコードを手動でバックアップしてから試してみてください。

```shell
$ rm .git/refs/remotes/origin/troubleBranch

$git branch -u origin/troubleBranch
Branch 'troubleBranch' set up to track remote branch 'troubleBranch' from 'origin'.
```





## それまでの模索と便利なコマンド群の解説

私はVisual Studioで作業をしているのですが、突然朝作業を始めるとPushの項目に99のマークがいた。Pushする内容をみると、Branchを作成した直後からほぼすべてのCommitの内容がリストされています。

Visual Studioのエラーメッセージは「現在のブランチは、リモートブランチを追跡しません 」Pushしてあらたなリモートブランチをおこしましょうという旨のメッセージがでている。そんなわけあるのか？とおもい、ブラウザーでGitHubを確認したところ該当のブランチは存在しています。昨日のコミットもみれます。他のPCからPullもできました。

どうやらこの作業PCに問題があることがわかりました。こういうときは絶対このPCから無理やりPUSHするのはやばいとGit経験から理解していましたので慎重にことをすすめることにしました。

Visual StudioのGitの機能は限定的なのでCommand Promptを起動します。

まずは状況を把握。。。

````shell
git status
On branch troubleBranch
Your branch is based on 'origin/troubleBranch', but the upstream is gone.
  (use "git branch --unset-upstream" to fixup)```
  
````

確実におかしい様子がみてとれます。とりあえずGitの提案するコマンドを打ってみようとおもいます。この万度は、リモートブランチとローカルブランチの関係をいったん削除するというコマンド

その後、改めて関係性構築のをしてみました。

```shell
$ git branch --unset-pustream

$ git branch -u origin/troubleBranch
error: the requested upstream branch 'origin/troubelBranch' does not exist
hint:
hint: If you are planning on basing your work on an upstream
hint: branch that already exists at the remote, you may need to
hint: run "git fetch" to retrieve it.
hint:
hint: If you are planning to push out a new local branch that
hint: will track its remote counterpart, you may want to use
```

全然だめです。おちつこう。ステータスをみてみようか。git branch -vv　もなかなか使いでのあるコマンドです。覚えておこう。

```shell
$ git branch -vv
* troubleBranch   abcd99gh yesterdayCommit
  master          ewfsffd1[origin/master: behind 1] Merge branch 'master' of http://xxx
```
トラブル中のブランチはローカルにあってリモートとはつながってない状態とみえます。でもこの状態でリモートブランチを再度つなげることができません。。。

とりあえずまたもやgitのアドバイスを行ってみる。

```shell
$ git fetch
error: cannot lock ref 'refs/remotes/origin/troubleBranch': unable to resolve reference 'refs/remotes/origin/troubleBranch': reference broken
From http://xxx
 ! [new branch]      troubleBranch -> origin/troubleBranch  (unable to update local ref)

```

なんとなくリモートにあることはわかってくれたけどうまくいかないと言っている。困った。困った。ここでさらにネットで何らかの解決策がないか捜査したわけです。

[github reference broken  #3838](https://github.com/desktop/desktop/issues/3838)

ここに類似の状態のエラーかたのQAがありました。Mr shiftkeyさんが回答してくれています。ふむふむ。.gitのあるファイルを削除して。。。

確かに！参照がこわれていてコマンドで修正できないならいったん亡き者にするのは理にかなっている。でも少し怖かったので、手動でフォルダーごとバックアップをしてから作業に。

どうやらremoteの情報は　.git/refs/remotes/origin にファイルとしてブランチごとに存在しているようです。

```shell
$ rm .git/refs/remotes/origin/troubleBranch

$git branch -u origin/troubleBranch
Branch 'troubleBranch' set up to track remote branch 'troubleBranch' from 'origin'.

$ git branch -vv
* troubleBranch   abcd99gh [origin/troubelBranch: behind 1]　yesterdayCommit
  master          ewfsffd1[origin/master: behind 1] Merge branch 'master' of http://xxx
```
おめでとう！優勝です！！全回復しました。その後、お試しコミットもPullも問題なくうごきました。2時間ほど冷や汗をかきました。めでたしめでたし


\##　参考ページ

https://github.com/desktop/desktop/issues/3838